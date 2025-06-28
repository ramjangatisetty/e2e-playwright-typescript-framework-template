import fs from 'fs';
import path from 'path';
import os from 'os';
import { execSync } from 'child_process';

const contextFile = path.join(__dirname, 'test-run-context.json');
const testResultsFile = path.join(process.cwd(), 'playwright-report/test-results.json');
const enrichedOutputFile = path.join(process.cwd(), 'playwright-report/enriched-test-results.json');

function getPlaywrightVersion(): string {
  try {
    const output = execSync('npx playwright --version').toString();
    const match = output.match(/(\d+\.\d+\.\d+)/);
    return match ? match[1] : 'unknown';
  } catch {
    return 'unknown';
  }
}

function extractSpecs(suite: any): any[] {
  const nestedSuites = suite.suites || [];
  const specs = suite.specs || [];
  return specs.concat(...nestedSuites.flatMap(extractSpecs));
}

async function teardown() {
  if (!fs.existsSync(contextFile)) {
    console.warn('⚠️ No test-run-context.json found.');
    return;
  }

  const context = JSON.parse(fs.readFileSync(contextFile, 'utf-8'));
  const endTime = new Date().toISOString();

  let tests: any[] = [];
  let status = 'unknown';
  let summary = { totalTests: 0, passed: 0, failed: 0, skipped: 0, flaky: 0 };

  if (fs.existsSync(testResultsFile)) {
    const raw = fs.readFileSync(testResultsFile, 'utf-8');
    const parsed = JSON.parse(raw);
    const allSpecs = parsed.suites.flatMap(extractSpecs);

    tests = allSpecs.map((spec: any) => {
      const test = spec.tests[0];
      const result = test?.results?.[0] || {};

      return {
        id: test?.testId || spec.id,
        title: spec.title,
        status: result.status,
        duration: (result.duration || 0) / 1000,
        retryCount: result.retry || 0,
        tags: test?.annotations?.map((a: any) => a.type) || [],
        failureDetails: result.errors?.length ? {
          message: result.errors[0]?.message || '',
          stackTrace: result.errors[0]?.stack || '',
          screenshotOnFailure: `screenshots/${spec.id}_failure.png`
        } : null,
        rootCause: result.status === 'failed' ? 'Needs analysis' : null,
        fixProvided: result.status === 'failed' ? 'TBD' : null,
        errorType: result.errors?.[0]?.name || null,
        screenshotPath: `screenshots/${spec.id}.png`,
        tracePath: `trace/${spec.id}.zip`,
        videoPath: `videos/${spec.id}.webm`,
        history: {
          runs: 1,
          passes: result.status === 'passed' ? 1 : 0,
          failures: result.status === 'failed' ? 1 : 0,
          flakyCount: result.status === 'flaky' ? 1 : 0,
          lastFailed: result.status === 'failed' ? new Date().toISOString() : null
        }
      };
    });

    summary = {
      totalTests: tests.length,
      passed: tests.filter(t => t.status === 'passed').length,
      failed: tests.filter(t => t.status === 'failed').length,
      skipped: tests.filter(t => t.status === 'skipped').length,
      flaky: tests.filter(t => t.status === 'flaky').length
    };

    status = summary.failed > 0 ? 'failed' : 'passed';
  }

  const enriched = {
    ...context,
    branch: process.env.GITHUB_REF?.replace('refs/heads/', '') || 'local',
    commitSHA: process.env.GITHUB_SHA || 'unknown',
    triggeredBy: process.env.GITHUB_ACTOR || 'local',
    endTime,
    status,
    os: process.env.RUNNER_OS || os.platform(),
    nodeVersion: process.version,
    playwrightVersion: getPlaywrightVersion(),
    durationSeconds: (new Date(endTime).getTime() - new Date(context.startTime).getTime()) / 1000,
    browser: {
      name: 'chromium',
      version: getPlaywrightVersion()
    },
    summary,
    tests
  };
  fs.mkdirSync(path.dirname(enrichedOutputFile), { recursive: true });
  fs.writeFileSync(enrichedOutputFile, JSON.stringify(enriched, null, 2));
  console.log(`✅ Enriched test result written to: ${enrichedOutputFile}`);
}

export default teardown;
