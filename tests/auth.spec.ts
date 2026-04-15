import { test, expect } from '../fixtures/testFixtures';

test.describe('Authentication', () => {

  test('successful login', async ({ loginPage, page }) => {
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory/);
  });

  test('locked user should see error', async ({ loginPage }) => {
    await loginPage.login('locked_out_user', 'secret_sauce');
    await loginPage.assertErrorVisible();
  });

  test('session persists after reload', async ({ loginPage, page }) => {
    await loginPage.login('standard_user', 'secret_sauce');
    await page.reload();
    await expect(page).toHaveURL(/inventory/);
  });

});