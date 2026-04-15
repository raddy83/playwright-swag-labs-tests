import { test, expect } from '../fixtures/testFixtures';
import { CartPage } from '../pages/CartPage';

test.describe('Products and Cart', () => {

  test('sort products Z-A', async ({ productsPage }) => {
    await productsPage.sortBy('za');

    const names = await productsPage.getItemNames();

    expect(names[0]).toBe('Test.allTheThings() T-Shirt (Red)');
  });

  test('add single product to cart', async ({ productsPage }) => {
    await productsPage.addFirstItemToCart();
    await expect(productsPage.cartBadge).toHaveText('1');
  });

  test('add multiple products and verify cart', async ({ productsPage, page }) => {
    const cart = new CartPage(page);

    await productsPage.addItemByName('Sauce Labs Backpack');
    await productsPage.addItemByName('Sauce Labs Bike Light');

    await productsPage.openCart();

    const items = await cart.getCartItems();

    expect(items).toContain('Sauce Labs Backpack');
    expect(items).toContain('Sauce Labs Bike Light');
  });

  test('remove product from cart', async ({ productsPage, page }) => {
    const cart = new CartPage(page);

    await productsPage.addItemByName('Sauce Labs Backpack');
    await productsPage.openCart();

    await cart.removeItem('Sauce Labs Backpack');

    await expect(cart.cartItems).toHaveCount(0);
  });

});