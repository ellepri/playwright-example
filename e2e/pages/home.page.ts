import { Page, Locator } from '@playwright/test';

export class HomePage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Background selection card

    get backgroundHeading(): Locator {
        return this.page.locator('.card:has([data-background-select]) h4');
    }

    get backgroundLabel(): Locator {
        return this.page.locator('.card:has([data-background-select]) label');
    }

    get backgroundSelect(): Locator {
        return this.page.locator('[data-background-select]');
    }

    async selectBackground(color: string) {
        await this.backgroundSelect.selectOption(color);
    }

    // Calendar card

    get calendarHeading(): Locator {
        return this.page.locator('.card:has([data-date-input]) h4');
    }

    get calendarLabel(): Locator {
        return this.page.locator('.card:has([data-date-input]) label');
    }

    get dateInput(): Locator {
        return this.page.locator('[data-date-input]');
    }

    get dateErrorMessage(): Locator {
        return this.page.locator('[data-date-error]');
    }

    async pickDate(date: string) {
        this.dateInput.fill(date);
    }

    // Counter

    get counterHeading(): Locator {
        return this.page.locator('.card:has([data-counter-wrapper]) h4');
    }

    get counterDecrementButton(): Locator {
        return this.page.locator('[data-decrement]');
    }

    get counterIncrementButton(): Locator {
        return this.page.locator('[data-increment]');
    }

    get counterValue(): Locator {
        return this.page.locator('[data-counter-display]');
    }

    // Dropdown

    get dropdownHeading(): Locator {
        return this.page.locator('.card:has([data-category-select]) h4');
    }

    get dropdownCategoryLabel(): Locator {
        return this.page.locator('label[for="categorySelect"]');
    }

    get dropdownItemLabel(): Locator {
        return this.page.locator('[data-sub-selection] label');
    }

    get categorySelect(): Locator {
        return this.page.locator('[data-category-select]');
    }

    async selectCategory(category: string) {
        await this.categorySelect.selectOption(category);
    }

    async categoryValues(): Promise<string[]> {
        const options = await this.categorySelect.locator('option').all();
        return Promise.all(options.map(option => option.textContent()))
            .then(text => text.filter(text => text !== null) as string[]);
    }

    get itemSelect(): Locator {
        return this.page.locator('[data-item-select]');
    }

    async itemValues(): Promise<string[]> {
        const options = await this.itemSelect.locator('option').all();
        return Promise.all(options.map(option => option.textContent()))
            .then(text => text.filter(text => text !== null) as string[]);
    }

    async selectItem(item: string) {
        await this.itemSelect.selectOption(item);
    }

    get selectionMessage(): Locator {
        return this.page.locator('[data-selection-message]');
    }

    // Form

    get formHeading(): Locator {
        return this.page.locator('.card:has([data-info-form]) h4');
    }

    get formLabel(): Locator {
        return this.page.locator('label[for="formInput"]');
    }

    get nameInputLabel(): Locator {
        return this.page.locator('label[for="nameInput"]');
    }

    get nameInput(): Locator {
        return this.page.locator('#nameInput');
    }

    get nameErrorMessage(): Locator {
        return this.page.locator('[data-name-error]');
    }

    async fillName(name: string) {
        await this.nameInput.fill(name);
    }

    get emailInputLabel(): Locator {
        return this.page.locator('label[for="emailInput"]');
    }

    get emailInput(): Locator {
        return this.page.locator('#emailInput');
    }

    get emailErrorMessage(): Locator {
        return this.page.locator('[data-email-error]');
    }

    async fillEmail(email: string) {
        await this.emailInput.fill(email);
    }

    get phoneNrInputLabel(): Locator {
        return this.page.locator('label[for="phoneInput"]');
    }

    get phoneNrInput(): Locator {
        return this.page.locator('#phoneInput');
    }

    get phoneNrErrorMessage(): Locator {
        return this.page.locator('[data-phone-error]');
    }

    async fillPhoneNr(phone: string) {
        await this.phoneNrInput.fill(phone);
    }

    async fillForm(name: string, email: string, phone: string) {
        await this.fillName(name);
        await this.fillEmail(email);
        await this.fillPhoneNr(phone);
    }

    get submitButton(): Locator {
        return this.page.locator('[data-info-submit]');
    }

    get formSuccessMessage(): Locator {
        return this.page.locator('[data-success-message]');
    }
}
