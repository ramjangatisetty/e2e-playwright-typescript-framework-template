import { test as base, expect, type Page, type TestInfo } from '@playwright/test';
import { logger } from '../utils/logger';

base.beforeEach(async ({ page }, testInfo) => {
  logger.info(`🚀 Starting test: ${testInfo.title}`);
  logger.info(`🔖 Tags: ${testInfo.annotations.map(a => a.type).join(', ') || 'None'}`);
});

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
