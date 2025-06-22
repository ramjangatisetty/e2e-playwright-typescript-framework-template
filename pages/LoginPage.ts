import {Page, Locator} from '@playwright/test'
import { BasePage } from '../pages/BasePage'
import { AllureHelper } from '../utils/allureHelper';

export class LoginPage extends BasePage {

    protected readonly page: Page;
    

    private get txtUserName(): Locator {
        return this.page.locator('#user-name');
    }

    private get txtPassword(): Locator {
        return this.page.locator('#password');
    }

    private get btnLogin() : Locator {
        return this.page.locator('#login-button');
    }

    async goto() {
        await this.page.goto("https://saucedemo.com/")
    }

    constructor(page: Page) {
        super();
        this.page = page;
    }

    async login(username: string, password: string) {
        await this.txtUserName.fill(username);
        await this.txtPassword.fill(password);
        const enabled = await this.btnLogin.isEnabled();
        if (enabled){
            await AllureHelper.stepCheck(`Login Button is Enabled`);
        } else {
            await AllureHelper.stepCheck('Login Button is not Enabled', 'passed', true)
        }
        await this.btnLogin.click();
    }

    

}