import { test, expect } from '../setup';
import { LoginPage } from '../../pages/LoginPage'
import { HomePage } from '../../pages/HomePage'


test.describe.parallel('@smoke', () => {
  
  test('Valid Login 1', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  await loginPage.goto();
  await loginPage.login("standard_user", "secret_sauce");
  await homePage.verifyLoginIsSuccessful();

  
  });

  test('Valid Login 2', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  await loginPage.goto();
  await loginPage.login("standard_user", "secret_sauce");
  await homePage.verifyProductExists("Sauce Labs Backpack");
  
  });

})


