import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('#checkout');
  }

  async removeItem(name: string) {
    await this.page
      .locator('.cart_item')
      .filter({ hasText: name })
      .locator('button')
      .click();
  }

  async getCartItems(): Promise<string[]> {
    return await this.page.locator('.inventory_item_name').allTextContents();
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}