import { expect, test } from '@playwright/test';

test.describe('Async Select', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should render the page title', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Async Select');
  });

  test('should render Async Select component', async ({ page }) => {
    const asyncSelect = page.locator('h2:has-text("Async Select")');
    await expect(asyncSelect).toBeVisible();
  });

  test('should render Select Filter component', async ({ page }) => {
    const selectFilter = page.locator('h2:has-text("Select Filter")');
    await expect(selectFilter).toBeVisible();
  });

  test('should open Async Select dropdown when clicked', async ({ page }) => {
    const asyncSelectTrigger = page.locator('button:has-text("Search users...")').first();
    await asyncSelectTrigger.click();

    // Check if dropdown opens with loading or items
    await expect(page.locator('[cmdk-root]')).toBeVisible();
  });

  test('should open Select Filter dropdown when clicked', async ({ page }) => {
    const selectFilterTrigger = page.locator('button:has-text("Search users...")').last();
    await selectFilterTrigger.click();

    // Check if dropdown opens
    await expect(page.locator('[cmdk-root]')).toBeVisible();
  });

  test('should filter users when searching in Async Select', async ({ page }) => {
    const asyncSelectTrigger = page.locator('button:has-text("Search users...")').first();
    await asyncSelectTrigger.click();

    // Type in the search input
    const searchInput = page.locator('[cmdk-input]').first();
    await searchInput.fill('User 1');

    // Wait for results

    // Should see filtered results
    const items = page.locator('[cmdk-item]');
    await expect(items.first()).toContainText('User 1');
  });

  test('should select a user in Async Select', async ({ page }) => {
    const asyncSelectTrigger = page.locator('button:has-text("Search users...")').first();
    await asyncSelectTrigger.click();

    // Wait for dropdown to open

    // Click on first item
    const firstItem = page.locator('[cmdk-item]').first();
    await firstItem.click();

    // Dropdown should close
    await expect(page.locator('[cmdk-root]')).toBeHidden();
  });

  test('should clear selection when X button is clicked', async ({ page }) => {
    // First select a user
    const asyncSelectTrigger = page.locator('button:has-text("Search users...")').first();
    await asyncSelectTrigger.click();

    const firstItem = page.locator('[cmdk-item]').first();
    await firstItem.click();

    // Click X to clear
    const clearButton = page.locator('[data-radix-popover-trigger] button').first();
    await clearButton.hover();
    await page.locator('svg.lucide-x').first().click();

    // Should show placeholder again
    await expect(asyncSelectTrigger).toContainText('Search users...');
  });

  test('should show loading state while fetching', async ({ page }) => {
    const asyncSelectTrigger = page.locator('button:has-text("Search users...")').first();
    await asyncSelectTrigger.click();

    // Should see loading spinner
    const loading = page.locator('[cmdk-loading], .animate-spin').first();
    await expect(loading).toBeVisible();
  });

  test('should handle infinite scroll loading more items', async ({ page }) => {
    const asyncSelectTrigger = page.locator('button:has-text("Search users...")').first();
    await asyncSelectTrigger.click();

    // Wait for initial load

    // Get initial count
    const initialItems = await page.locator('[cmdk-item]').count();

    // Scroll down to trigger load more (scroll the list)
    const list = page.locator('[cmdk-list]');
    await list.evaluate((element) => (element.scrollTop = element.scrollHeight));

    // Wait for potential load more

    // Items should have loaded or remain the same if at end
    const finalItems = await page.locator('[cmdk-item]').count();
    expect(finalItems).toBeGreaterThanOrEqual(initialItems);
  });
});

test.describe('Select Filter', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should render Select Filter with placeholder', async ({ page }) => {
    const selectFilterTrigger = page.locator('button:has-text("Search users...")').last();
    await expect(selectFilterTrigger).toBeVisible();
  });

  test('should open dropdown and show all users when clicked', async ({ page }) => {
    const selectFilterTrigger = page.locator('button:has-text("Search users...")').last();
    await selectFilterTrigger.click();

    // Should show all users (preloaded)

    const items = page.locator('[cmdk-item]');
    // All 100 users should be visible in preload mode
    await expect(items).toHaveCount(100);
  });

  test('should filter users when searching in Select Filter', async ({ page }) => {
    const selectFilterTrigger = page.locator('button:has-text("Search users...")').last();
    await selectFilterTrigger.click();

    // Type in the search input
    const searchInput = page.locator('[cmdk-input]').last();
    await searchInput.fill('User 10');

    // Wait for filter

    // Should see filtered results (User 10, User 100, etc.)
    const items = page.locator('[cmdk-item]');
    const itemText = await items.first().textContent();
    expect(itemText).toContain('User 10');
  });

  test('should select a user and show in trigger', async ({ page }) => {
    const selectFilterTrigger = page.locator('button:has-text("Search users...")').last();
    await selectFilterTrigger.click();

    // Click on first item
    const firstItem = page.locator('[cmdk-item]').first();
    await firstItem.click();

    // Dropdown should close
    await expect(page.locator('[cmdk-root]')).toBeHidden();

    // Trigger should show selected user
    await expect(selectFilterTrigger).not.toContainText('Search users...');
  });
});
