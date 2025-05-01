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

test('should not be able to select future date', async ({ page }) => {
    const homePage = new HomePage(page);

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowString = tomorrow.toISOString().split('T')[0];
    await homePage.pickDate(tomorrowString);

    await expect(homePage.dateInput).toHaveValue(tomorrowString);
    await expect(homePage.dateErrorMessage).toHaveText('You cannot select date in future.');
});

// Counter

test('should have correct Counter heading', async ({ page }) => {
    const homePage = new HomePage(page);

    await expect(homePage.counterHeading).toHaveText('Counter');
});

test('should be able to increment and decrement', async ({ page }) => {
    const homePage = new HomePage(page);

    await expect(homePage.counterDecrementButton).toBeDisabled();
    await expect(homePage.counterIncrementButton).toBeEnabled();

    for (let i = 0; i < 5; i++) {
        await homePage.counterIncrementButton.click();
        await expect(homePage.counterValue).toHaveText(`${i + 1}`);
    }

    await expect(homePage.counterIncrementButton).toBeDisabled();
    await expect(homePage.counterDecrementButton).toBeEnabled();

    for (let i = 5; i > 0; i--) {
        await homePage.counterDecrementButton.click();
        await expect(homePage.counterValue).toHaveText(`${i - 1}`);
    }

    await expect(homePage.counterDecrementButton).toBeDisabled();
}); 

// Dropdown

test('should have correct Dropdown heading and label', async ({ page }) => {
    const homePage = new HomePage(page);

    await expect(homePage.dropdownHeading).toHaveText('Dropdown');
    await expect(homePage.dropdownCategoryLabel).toHaveText('Select a Category');
    await expect(homePage.dropdownItemLabel).toBeHidden();
});

test("should be able to select a category 'Fruit'", async ({ page }) => {
    const homePage = new HomePage(page);

    await expect(homePage.itemSelect).toBeHidden();
    await homePage.selectCategory('Fruit');
    await expect(homePage.itemSelect).toBeVisible();

    const categoryItemValues = await homePage.categoryValues()
    const subCategoryItemValues = await homePage.itemValues()

    expect(categoryItemValues).toEqual(['Choose one...', 'Fruit', 'Vehicle']);
    expect(subCategoryItemValues).toEqual(['Choose an item...', 'Apple', 'Banana', 'Orange']);

    await homePage.selectItem('Apple');
    await expect(homePage.selectionMessage).toHaveText('You selected: Apple 🍎');
});

test("should be able to select a category 'Vehicle'", async ({ page }) => {
    const homePage = new HomePage(page);

    await expect(homePage.itemSelect).toBeHidden();
    await homePage.selectCategory('Vehicle');
    await expect(homePage.itemSelect).toBeVisible();

    const categoryItemValues = await homePage.categoryValues()
    const subCategoryItemValues = await homePage.itemValues()

    expect(categoryItemValues).toEqual(['Choose one...', 'Fruit', 'Vehicle']);
    expect(subCategoryItemValues).toEqual(['Choose an item...', 'Car', 'Bike', 'Bus']);

    await homePage.selectItem('Car');
    await expect(homePage.selectionMessage).toHaveText('You selected: Car 🚗');
});

// Form Validation

test('should have correct Form heading and labels', async ({ page }) => {
    const homePage = new HomePage(page);

    await expect(homePage.formHeading).toHaveText('Form');
    await expect(homePage.formLabel).toHaveText('Fill Your Information');
    await expect(homePage.nameInputLabel).toHaveText('Name');
    await expect(homePage.emailInputLabel).toHaveText('Email');
    await expect(homePage.phoneNrInputLabel).toHaveText('Phone Number');
});

test('should be able to fill the form', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.fillForm('Jane Doe', 'info@mail.com', '1234567890');
    await expect(homePage.nameErrorMessage).toBeHidden();
    await expect(homePage.emailErrorMessage).toBeHidden();
    await expect(homePage.phoneNrErrorMessage).toBeHidden();
    await homePage.submitButton.click();

    await expect(homePage.formSuccessMessage).toBeVisible();
    await expect(homePage.formSuccessMessage).toHaveText('Thanks for submitting your info! We will get back to you soon.');
});

test('should see all error messages', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.fillForm('', '', '');

    // click away to see error messages
    await page.mouse.click(1, 1);

    await expect(homePage.nameErrorMessage).toBeVisible();
    await expect(homePage.emailErrorMessage).toBeVisible();
    await expect(homePage.phoneNrErrorMessage).toBeVisible();

    await expect(homePage.formSuccessMessage).toBeHidden();
});

test('should see no error messages after correcting the form', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.fillForm('', '', '');

    // click away to see error messages
    await page.mouse.click(1, 1);

    await homePage.fillForm('Jane Doe', 'info@mail.com', '1234567890');

    await expect(homePage.emailErrorMessage).toBeVisible();
    await expect(homePage.nameErrorMessage).toBeHidden();
    await expect(homePage.phoneNrErrorMessage).toBeHidden();
});