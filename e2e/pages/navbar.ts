import { Page, Locator } from '@playwright/test';

export class Navbar {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    get navigationBar(): Locator {
        return this.page.locator('.navbar');
    }

    get navbarLogo(): Locator {
        return this.page.locator('.navbar-logo');
    }

    get homeLink(): Locator {
        return this.page.locator('nav a:has-text("Home")');
    }

    get shoppingLink(): Locator {
        return this.page.locator('nav a:has-text("Shopping")');
    }

    get cartLink(): Locator {
        return this.page.locator('nav a[href="cart.html"]');
    }

    async navigateToHome() {
        await this.homeLink.click();
    }

    async navigateToShopping() {
        await this.shoppingLink.click();
    }

    async navigateToCart() {
        await this.cartLink.click();
    }

    // async expectCartBadgeCount(count: number) {
    //     await expect(this.cartBadge).toHaveText(count.toString());
    // }
}
