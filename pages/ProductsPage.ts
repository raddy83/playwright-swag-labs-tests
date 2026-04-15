import { Page, Locator } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly inventoryItems: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;
  readonly sortDropdown: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryItems = page.locator('.inventory_item');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartLink = page.locator('.shopping_cart_link');
    this.sortDropdown = page.locator('.product_sort_container');
  }

  async addFirstItemToCart() {
    await this.page.locator('.inventory_item button').first().click();
  }

  async addItemByName(name: string) {
    await this.page
      .locator('.inventory_item')
      .filter({ hasText: name })
      .locator('button')
      .click();
  }

  async openCart() {
    await this.cartLink.click();
  }

  async sortBy(value: string) {
    await this.sortDropdown.selectOption(value);
  }

  async getItemNames(): Promise<string[]> {
    return await this.page.locator('.inventory_item_name').allTextContents();
  }
}