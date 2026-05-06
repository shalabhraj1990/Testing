import { test } from "@playwright/test";

test.describe("Locator", () => {
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

  test("User Facing Locators", async ({ page }) => {
    //getByRole
    await page.getByRole("textbox", { name: "Email" }).first().click();
    //getByLabel
    await page.getByLabel("Email").first().click();
    //getByLabel
    await page.getByPlaceholder("Jane Doe").first().click();
    //getByTitle
    await page.getByTitle("IoT Dashboard").first().click();
    //getByTestId
    //await page.getByTestId("signin").first().click();
  });

  test.only("Locating Child Elements", async ({ page }) => {
    //await page.locator('nb-card nb-radio :test-is("Option 1")').click();
    await page
      .locator("nb-card")
      .nth(1)
      .locator("nb-radio")
      .locator(':test-is("Option 1")')
      .click();

      await page.locator('nb-card nb-radio :test-is("Option 1")').click();
  });

  
});
