import { ShoppingPage } from "../pages/shopping.page";
import { test, expect } from "@playwright/test";

test.describe('Shopping Page Tests', () => {
    let shoppingPage: ShoppingPage;

    test.beforeEach(async ({ page }) => {
        await page.goto("/shopping");
        shoppingPage = new ShoppingPage(page);
    });

    test('should have correct Shopping page heading', async ({ page }) => {
        await expect(shoppingPage.shoppinPageHeading).toHaveText('Essential Tees');
    });

    test('should have correct product details', async ({ page }) => {
        const productDetails = await shoppingPage.getProductDetailsByAltText('Purple T-shirt');

        expect(productDetails.name).toBe("Men's Essential Tee (Purple)");
        expect(productDetails.price).toBe('$28.00');
    });

    test('should be able to add product to cart', async ({ page }) => {
        await shoppingPage.addToCartByAltText('Purple T-shirt');
        await shoppingPage.addToCartByAltText('Dark Grey T-shirt');
        await shoppingPage.addToCartByAltText('Dark Grey T-shirt');

        const cartCount = await shoppingPage.cartCount.innerText();
        expect(cartCount).toBe('3');
    });
});
