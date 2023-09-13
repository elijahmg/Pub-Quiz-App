import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000');
});

test.describe('Main game flow', () => {
  test('Click on pin', async ({ context }) => {
    const userPage = await context.newPage();
    const adminPage = await context.newPage();

    await userPage.goto('http://localhost:3000');
    await adminPage.goto('http://localhost:3000');

    const enterPinButton = userPage.getByTestId('enter_pin');
    const adminDashboardButton = adminPage.getByTestId('admin-dashboard');

    await enterPinButton.click();
    await adminDashboardButton.click();

    const userNextPage = userPage.getByText('Enter pin');
    const adminNextPage = adminPage.getByText('Welcome to QWIZZ!');

    await expect(userNextPage).toBeAttached();
    await expect(adminNextPage).toBeAttached();
  });
});
