/**
 * Custom Playwright test setup.
 * 
 * This file exports a customized `test` and `expect` for use in all test files.
 * It wraps Playwright's base test to add common hooks, logging, and shared fixtures.
 * 
 * Usage:
 *   Import `test` and `expect` from this file in your test specs using a relative path:
 *     import { test, expect } from '../setup';
 * 
 * Why not use a path alias?
 *   Playwright and Node.js do not resolve TypeScript path aliases at runtime by default.
 *   Using relative imports ensures compatibility in all environments.
 * 
 * Contributors:
 *   - Add shared hooks, fixtures, or logging here to apply them across all tests.
 *   - Do not import `@playwright/test` directly in your test files—use this setup instead.
 */

import { test as base, expect } from '@playwright/test';
import { logger } from '../utils/logger';

// Example: Add a global afterEach hook for logging
base.afterEach(async ({ page }, testInfo) => {
  const status = testInfo.status?.toUpperCase();
  const duration = `${testInfo.duration}ms`;

  if (testInfo.status !== testInfo.expectedStatus) {
    logger.warn(`❌ Test failed: ${testInfo.title}`);
  } else {
    logger.info(`✅ Test passed: ${testInfo.title}`);
  }

  logger.info(`📊 Status: ${status} | Duration: ${duration}`);
});

export const test = base;
export { expect };