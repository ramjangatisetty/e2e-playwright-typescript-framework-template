import {Page, Locator} from '@playwright/test'
import { BasePage } from '../pages/BasePage'
import { AllureHelper } from '../utils/allureHelper';
import { config } from '../utils/config';

export class LoginPage extends BasePage {

    protected readonly page: Page;
    

    private get txtUserName(): Locator {
        return this.page.getByRole('textbox', {name : 'Username'});
    }

    private get txtPassword(): Locator {
        return this.page.getByRole('textbox', {name:'Password'});
    }

    private get btnLogin() : Locator {
        return this.page.getByRole('button',{name : 'Login'});
    }

    async goto() {
        await this.page.goto(config.url)
    }

    constructor(page: Page) {
        super();
        this.page = page;
    }

    async login(userName: string, password: string) {
        const response = await this.enterText(this.txtUserName, userName);
        await this.enterText(this.txtPassword, password);
        await this.clickElement(this.btnLogin);
    }

    

}