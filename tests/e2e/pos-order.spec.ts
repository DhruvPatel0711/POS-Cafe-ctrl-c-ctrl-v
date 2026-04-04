import { test, expect } from '@playwright/test';

test.describe('End-to-End POS Order Flow', () => {

  test('Creates a cart, transitions order to kitchen, and successfully completes payment', async ({ page }) => {
    // 1. Start at POS Terminal
    await page.goto('/pos');
    await expect(page.locator('text=Current Order')).toBeVisible();

    // 2. Add an Item to Cart
    // Wait for the grid item to load and simulate the click.
    // For our mock UI, we will target the "Masala Dosa" or item button explicitly.
    const productButton = page.locator('button', { hasText: 'Masala Dosa' }).first();
    await productButton.click();

    // Since we added a variants modal, wait for it and select Regular
    await page.locator('text=Regular').click();

    // Verify it appeared in the right-side cart
    await expect(page.locator('text=Masala Dosa')).toBeVisible();
    await expect(page.locator('text=₹120')).toBeVisible();

    // 3. Confirm Order (moves state from Draft -> Confirmed)
    await page.locator('button:has-text("Confirm Order")').click();
    
    // Check status badge explicitly shifted
    await expect(page.locator('span.badge', { hasText: 'Confirmed' })).toBeVisible();

    // 4. Send to Kitchen & Mark Served
    await page.locator('button:has-text("Send to Kitchen")').click();
    await expect(page.locator('span.badge', { hasText: 'Kitchen' })).toBeVisible();

    await page.locator('button:has-text("Mark as Served")').click();
    await expect(page.locator('span.badge', { hasText: 'Served' })).toBeVisible();

    // 5. Payment Processing
    // Click the final pay button (it shows the Total dynamic string)
    await page.locator('button:has-text("Pay ₹")').click();

    // The Payment Checkout Modal should now be visible
    await expect(page.locator('h3:has-text("Ledger")')).toBeVisible();

    // Select 'Cash' payment method
    await page.locator('text=Cash').click();

    // Apply the payment (Simulates typing the exact full amount due)
    await page.locator('button:has-text("Process Cash Payment")').click();

    // Because balance is 0, the complete order button should appear
    await page.locator('button:has-text("Complete Order")').click();

    // Finally, await the 2s timeout or verify cart transitions securely back to '#ORD-NEW' Draft state
    await expect(page.locator('text=#ORD-NEW')).toBeVisible({ timeout: 5000 });
  });

});
