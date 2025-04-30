import { test, expect } from '@playwright/test';
import { Navbar } from '../pages/Navbar';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000');
});

test('should have correct navbar links on homepage', async ({ page }) => {
  const navbar = new Navbar(page);

  await expect(navbar.navigationBar).toBeVisible();
  await expect(navbar.navbarLogo).toHaveText('Test Playground')
  await expect(navbar.homeLink).toBeVisible();
  await expect(navbar.shoppingLink).toBeVisible();
});

test('should have correct navbar links on shopping page', async ({ page }) => {
  const navbar = new Navbar(page);

  await navbar.navigateToShopping();

  await expect(navbar.navigationBar).toBeVisible();
  await expect(navbar.navbarLogo).toHaveText('Test Playground')
  await expect(navbar.homeLink).toBeVisible();
  await expect(navbar.shoppingLink).toBeVisible();
  await expect(navbar.cartLink).toBeVisible();
});

test('should have correct navbar links on cart page', async ({ page }) => {
  const navbar = new Navbar(page);

  await navbar.navigateToShopping();
  await navbar.navigateToCart();

  await expect(navbar.navigationBar).toBeVisible();
  await expect(navbar.navbarLogo).toHaveText('Test Playground')
  await expect(navbar.homeLink).toBeVisible();
  await expect(navbar.shoppingLink).toBeVisible();
  await expect(navbar.cartLink).toBeVisible();
});
