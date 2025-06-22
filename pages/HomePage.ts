import { Page, Locator } from '@playwright/test'
import { BasePage } from '../pages/BasePage'
import { AllureHelper } from '../utils/allureHelper'

export class HomePage extends BasePage{

    protected readonly page: Page;

    private txtProductLink(productName: string) :Locator {
        return this.page.locator(`text="${productName}"`)
    }


    constructor(page: Page) {
        super();
        this.page = page;
    }

    async verifyLoginIsSuccessful() {
        const currentUrl = this.page.url();
        if(currentUrl.includes('inventory')) {
             AllureHelper.stepCheck("Login is Successful")
        } else {
            AllureHelper.stepCheck("Login is unsuccssful", 'failed', true)
        }
        
    }

    async verifyProductExists(productName: string) {
        const isAvailable = await this.isElementVisible(this.txtProductLink(`${productName}`));
        if (isAvailable) {
            AllureHelper.stepCheck("Product With the Name Exists")
        } else {
            AllureHelper.stepCheck("Product with the Name Does not Exist", 'failed', true)
        }
    }

}