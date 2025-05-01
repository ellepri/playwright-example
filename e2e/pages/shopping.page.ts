import { Page, Locator } from '@playwright/test';

export class ShoppingPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    get shoppinPageHeading(): Locator {
        return this.page.locator('.products-page h3');
    }

    getProductCardByAltText(altText: string): Locator {
        return this.page.locator(`.product-card:has(img[alt="${altText}"])`);
    }

    getProductNameByAltText(altText: string): Locator {
        const productCard = this.getProductCardByAltText(altText);
        return productCard.locator('.product-name');
    }

    getProductPriceByAltText(altText: string): Locator {
        const productCard = this.getProductCardByAltText(altText);
        return productCard.locator('.product-price');
    }

    async getProductDetailsByAltText(altText: string): Promise<{ name: string; price: string }> {
        const name = this.getProductNameByAltText(altText);
        console.log(await name.innerText());
        const price = this.getProductPriceByAltText(altText);
        console.log(await price.innerText());
        return Promise.all([name.innerText(), price.innerText()]).then(
            ([name, price]) => ({ name, price })
        );
    }

    async addToCartByAltText(altText: string) {
        const productCard = this.getProductCardByAltText(altText);
        const addToCartButton = productCard.locator('button:has-text("Add to cart")');
        await addToCartButton.click();
    }

    get cartCount(): Locator {
        return this.page.locator('.cart-badge');
    }
}
