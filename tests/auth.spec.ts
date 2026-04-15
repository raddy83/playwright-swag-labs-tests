import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Authentication', () => {

  test('successful login', async ({ page }) => {
    const login = new LoginPage(page);

    await login.goto();
    await login.login('standard_user', 'secret_sauce');

    await expect(page).toHaveURL(/inventory/);
  });

  test('locked user should see error', async ({ page }) => {
    const login = new LoginPage(page);

    await login.goto();
    await login.login('locked_out_user', 'secret_sauce');

    await login.assertErrorVisible();
  });

  test('session persists after reload', async ({ page }) => {
    const login = new LoginPage(page);

    await login.goto();
    await login.login('standard_user', 'secret_sauce');

    await page.reload();

    await expect(page).toHaveURL(/inventory/);
  });

});