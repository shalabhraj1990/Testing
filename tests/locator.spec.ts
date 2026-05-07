import { test, expect } from "@playwright/test";

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

  test("Locating Child Elements", async ({ page }) => {
    //await page.locator('nb-card nb-radio :test-is("Option 1")').click();
    await page
      .locator("nb-card")
      .nth(1)
      .locator("nb-radio")
      .locator(':test-is("Option 1")')
      .click();

    await page.locator('nb-card nb-radio :test-is("Option 1")').click();
  });

  test("Locating Parent Elements", async ({ page }) => {
    //await page.locator('nb-card nb-radio :test-is("Option 1")').click();
    await page
      .locator("nb-card", { hasText: "Using the Grid" })
      .getByRole("textbox", { name: "email" })
      .click();

    await page
      .locator("nb-card", { has: page.locator("#inputEmail1") })
      .getByRole("textbox", { name: "email" })
      .click();

    await page
      .locator("nb-card")
      .filter({ hasText: "Basic form" })
      .getByRole("textbox", { name: "email" })
      .click();

    await page
      .locator(':text-is("Using the Grid")')
      .locator("..")
      .getByRole("textbox", { name: "email" })
      .click();
  });

  test("resusing the locators", async ({ page }) => {
    const basicform = page.locator("nb-card").filter({ hasText: "Basic form" });
    const emailField = basicform.getByRole("textbox", { name: "email" });

    await emailField.fill("test@test.com");
    await basicform
      .getByRole("textbox", { name: "Password" })
      .fill("test@test");
    await basicform.locator("nb-checkbox").click();
    await basicform.getByRole("button").click();

    await expect(emailField).toHaveValue("test@test.com");
  });

  test("Extracting Values", async ({ page }) => {
    const basicform = page.locator("nb-card").filter({ hasText: "Basic form" });
    const emailField = basicform.getByRole("textbox", { name: "email" });
    // single value test

    const buttonText = await basicform.locator("button").textContent();
    expect(buttonText).toEqual("Submit");
    //multi value test
    const allRadioButtonLabels = await page
      .locator("nb-radio")
      .allTextContents();
    expect(allRadioButtonLabels).toContain("Option 1");
    //get the attribute value
    const placeholder = await emailField.getAttribute("placeholder");
    expect(placeholder).toEqual("Email");
  });

  test.only("Assertions", async ({ page }) => {
    const basicformButton = page
      .locator("nb-card")
      .filter({ hasText: "Basic form" })
      .locator("button");

    const text = await basicformButton.textContent();
    //Genreal Assertion
    expect(text).toEqual("Submit");
    //Locator Assertion
    await expect(basicformButton).toHaveText("Submit");
    //Soft assetions
    await expect.soft(basicformButton).toHaveText('Sumit1');
    await basicformButton.click()
  });
});
