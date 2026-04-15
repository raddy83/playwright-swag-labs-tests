import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';

test.describe('Products and Cart', () => {

  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('standard_user', 'secret_sauce');
  });

  test('sort products Z-A', async ({ page }) => {
    const products = new ProductsPage(page);

    await products.sortBy('za');

    const names = await products.getItemNames();

    expect(names[0]).toBe('Test.allTheThings() T-Shirt (Red)');
  });

  test('add single product to cart', async ({ page }) => {
    const products = new ProductsPage(page);

    await products.addFirstItemToCart();

    await expect(products.cartBadge).toHaveText('1');
  });

  test('add multiple products and verify cart', async ({ page }) => {
    const products = new ProductsPage(page);
    const cart = new CartPage(page);

    await products.addItemByName('Sauce Labs Backpack');
    await products.addItemByName('Sauce Labs Bike Light');

    await products.openCart();

    const items = await cart.getCartItems();

    expect(items).toContain('Sauce Labs Backpack');
    expect(items).toContain('Sauce Labs Bike Light');
  });

  test('remove product from cart', async ({ page }) => {
    const products = new ProductsPage(page);
    const cart = new CartPage(page);

    await products.addItemByName('Sauce Labs Backpack');
    await products.openCart();

    await cart.removeItem('Sauce Labs Backpack');

    await expect(cart.cartItems).toHaveCount(0);
  });

});