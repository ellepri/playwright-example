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

}
// This class represents the home page of the application.