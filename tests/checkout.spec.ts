import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('Checkout Flow', () => {

  test('complete checkout process', async ({ page }) => {
    const login = new LoginPage(page);
    const products = new ProductsPage(page);
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page);

    await login.goto();
    await login.login('standard_user', 'secret_sauce');

    await products.addItemByName('Sauce Labs Backpack');

    await products.openCart();

    await cart.checkout();

    await checkout.fillForm('John', 'Doe', '12345');

    await checkout.finish();

    await expect(checkout.successMessage).toHaveText(/Thank you for your order/i);  
  });

});