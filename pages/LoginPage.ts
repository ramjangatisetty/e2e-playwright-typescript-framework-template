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

    async login(userName: string, password: string) {
        await this.enterText(this.txtUserName, userName);
        await this.enterText(this.txtPassword, password);
        await this.clickElement(this.btnLogin);
    }

    

}