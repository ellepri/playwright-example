import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
});

// Background Selection

test('should have correct background heading and label', async ({ page }) => {
    const homePage = new HomePage(page);

    await expect(homePage.backgroundHeading).toHaveText('Change colour');
    await expect(homePage.backgroundLabel).toHaveText('Change Background');
});

test('should be able to change background colour', async ({ page }) => {
    const homePage = new HomePage(page);

    const themes = [
        { label: 'Sunset Pastel', className: 'bg-sunset', colour: '(135deg, rgb(253, 226, 243) 0%, rgb(196, 215, 242) 100%)' },
        { label: 'Ocean Breeze', className: 'bg-ocean', colour: '(135deg, rgb(209, 244, 255) 0%, rgb(224, 247, 250) 100%)' },
        { label: 'Mint Cream', className: 'bg-mint', colour: '(135deg, rgb(224, 255, 224) 0%, rgb(208, 240, 192) 100%)' },
        { label: 'Peach Dream', className: 'bg-peach', colour: '(135deg, rgb(255, 229, 180) 0%, rgb(255, 216, 190) 100%)' },
    ];

    for (const theme of themes) {
        await homePage.selectBackground(theme.label);

        const bg = await page.locator('body').evaluate((el) =>
            window.getComputedStyle(el).backgroundImage
        );

        const bodyClass = await page.locator('body').getAttribute('class');
        expect(bodyClass).toContain(theme.className);
        expect(bg).toMatch('linear-gradient' + theme.colour);
    }

    await homePage.selectBackground('Select a Color');
    const colour = await page.locator('body').evaluate((el) =>
        window.getComputedStyle(el).backgroundImage
    );

    expect(colour).toBe('none');
});

// Calendar

test('should have correct Calendar heading and label', async ({ page }) => {
    const homePage = new HomePage(page);

    await expect(homePage.calendarHeading).toHaveText('Calendar');
    await expect(homePage.calendarLabel).toHaveText('Choose Date');
});

test("should be able to select today's date", async ({ page }) => {
    const homePage = new HomePage(page);

    const today = new Date().toISOString().split('T')[0];
    await homePage.pickDate(today);

    await expect(homePage.dateInput).toHaveValue(today);
    await expect(homePage.dateErrorMessage).toHaveText('');
});

test("should not be able to select future date", async ({ page }) => {
    const homePage = new HomePage(page);

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowString = tomorrow.toISOString().split('T')[0];
    await homePage.pickDate(tomorrowString);

    await expect(homePage.dateInput).toHaveValue(tomorrowString);
    await expect(homePage.dateErrorMessage).toHaveText('You cannot select date in future.');
});