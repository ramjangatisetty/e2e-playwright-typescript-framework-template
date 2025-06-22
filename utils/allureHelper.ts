import { allure } from 'allure-playwright';
import { logger } from './logger';

type AllureStatus = 'passed' | 'failed' | 'broken' | 'skipped' | 'info' | 'warning';

export class AllureHelper {
  static async stepCheck(
    message: string,
    status: AllureStatus = 'info',
    shouldStop = false
  ): Promise<void> {
    await allure.step(`[${status.toUpperCase()}] ${message}`, async () => {
      logger.info(`[${status.toUpperCase()}] ${message}`);
      if (['failed', 'broken'].includes(status) && shouldStop) {
        throw new Error(`❌ Test stopped: ${message}`);
      }
    });
  }
}
