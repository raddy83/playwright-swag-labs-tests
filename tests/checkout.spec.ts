import { test, expect } from '../fixtures/testFixtures';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('Checkout Flow', () => {

  test('complete checkout process', async ({ productsPage, page }) => {
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page);

    await productsPage.addItemByName('Sauce Labs Backpack');
    await productsPage.openCart();

    await cart.checkout();

    await checkout.fillForm('John', 'Doe', '12345');
    await checkout.finish();

    await expect(checkout.successMessage).toHaveText(/Thank you for your order/i);
  });

});