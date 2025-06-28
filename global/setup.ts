import fs from 'fs';
import path from 'path';
import { loadEnv } from '../utils/loadEnv';

const envName = process.env.TEST_ENV || 'local';
loadEnv(envName); // ✅ Load BEFORE any config.ts uses process.env

async function setup() {
  const runId = `run_${new Date().toISOString().replace(/[-:.TZ]/g, '')}`;
  const contextFile = path.join(__dirname, 'test-run-context.json');

  const context = {
    testRunId: runId,
    startTime: new Date().toISOString(),
    environment: envName,
    project: 'e2e-playwright-typescript-framework',
    status: 'in-progress'
  };

  fs.writeFileSync(contextFile, JSON.stringify(context, null, 2));
}

export default setup;
