import { test, expect } from '../setup';
import { LoginPage } from '../../pages/LoginPage'


test.describe('@smoke', () => {
  test('Valid Login 1', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login("standard_user", "secret_sauce")
  });

  test('Valid Login 2', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login("standard_user", "secret_sauce")
  });

})


