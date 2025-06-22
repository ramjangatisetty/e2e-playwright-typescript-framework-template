import { Locator } from '@playwright/test';
import { logger } from '../utils/logger'; // adjust path based on your project
import { expect } from '@playwright/test';

export class BasePage {
    /**
     * Waits for an element with retry and timeout support.
     */
    async waitForElement(
        locator: Locator,
        timeout: number = 5000,
        maxRetries: number = 3,
        delayBetweenRetries: number = 1000
    ): Promise<void> {
        let attempt = 0;
        while (attempt < maxRetries) {
            try {
                logger.info(`Attempt ${attempt + 1}: Waiting for element → ${locator.toString()}`);
                await locator.waitFor({ timeout });
                logger.info(`Element is ready: ${locator.toString()}`);
                return;
            } catch (error) {
                logger.warn(`Attempt ${attempt + 1} failed: ${(error as Error).message}`);
                attempt++;
                if (attempt < maxRetries) {
                    await new Promise(res => setTimeout(res, delayBetweenRetries));
                } else {
                    logger.error(`Element not found after ${maxRetries} retries: ${locator.toString()}`);
                    throw new Error(`Failed to locate element after ${maxRetries} retries: ${locator.toString()}`);
                }
            }
        }
    }

    async clickElement(locator: Locator, wait: boolean = true): Promise<void> {
        if (wait) await this.waitForElement(locator);
        await locator.click();
        logger.info(`Clicked on element: ${locator.toString()}`);
    }

    async enterText(locator: Locator, value: string, wait: boolean = true): Promise<void> {
        if (wait) await this.waitForElement(locator);
        await locator.fill(value);
        logger.info(`Filled input ${locator.toString()} with value: ${value}`);
    }

    async typeText(locator: Locator, value: string, wait: boolean = true): Promise<void> {
        if (wait) await this.waitForElement(locator);
        await locator.type(value);
        logger.info(`Typed into ${locator.toString()} with value: ${value}`);
    }

    async selectDropdown(locator: Locator, value: string, wait: boolean = true): Promise<void> {
        if (wait) await this.waitForElement(locator);
        await locator.selectOption(value);
        logger.info(`Selected dropdown value '${value}' on ${locator.toString()}`);
    }

    async getElementText(locator: Locator, wait: boolean = true): Promise<string> {
        if (wait) await this.waitForElement(locator);
        const text = await locator.textContent();
        logger.info(`Extracted text from ${locator.toString()}: ${text}`);
        return text || '';
    }

    async isElementVisible(locator: Locator): Promise<boolean> {
        try {
            return await locator.isVisible();
        } catch {
            return false;
        }
    }
}
