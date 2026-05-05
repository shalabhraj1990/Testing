import { test } from "@playwright/test";

test.describe.only("Locator", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:4200/");
    await page.getByText("Forms").click();
    await page.getByText("Form Layouts").click();
  });

  test("locator syntax rules", async ({ page }) => {
    //by tag
    await page.locator("input").first().click();
    //by ID
    await page.locator("#inputEmail1");
    //by class
    page.locator(".shape-rectangel");
    // by attribute
    page.locator('[pleaceholder="Email"]');
    // by class value full
    page.locator(
      '[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]',
    );
    // combine different selctores
    page.locator('input[pleaceholder="Email"][nbinput]');
    // by partial text match
    page.locator(':text("Using")');
    //by exact text match
    page.locator(':text-is("Using the Grid")');
  });
});
