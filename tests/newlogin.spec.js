import { test } from '@playwright/test';
import { LoginPage } from './login.po.js';


test.beforeEach(async ({ page }) => {
  await page.goto('/');
});


test.describe('Valid login tests', () => {
  test( 'Login with valid username and password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login('testdata'.validUser.username, 'testdata.validUser.password');
    await loginPage.verifyInValidLogin();
  });
});

test ('Login using valid username and password', async ({ page }) => {
  const login = new LoginPage(page);
  await login.login('testdata.validUser.username', 'testdata.validUser.password');
  await login.verifyInValidLogin();
});
