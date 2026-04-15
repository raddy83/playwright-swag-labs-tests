import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';

type Fixtures = {
  loginPage: LoginPage;
  productsPage: ProductsPage;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await use(loginPage);
  },

  productsPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    const productsPage = new ProductsPage(page);
    await use(productsPage);
  },
});

export { expect } from '@playwright/test';