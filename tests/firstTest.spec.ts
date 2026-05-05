import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/");
  await page.getByText("Forms").click();
});
test.describe("Form Layouts", () => {
  test("Test Step Up", async ({ page }) => {
    await page.getByText("Form Layouts").click();
  });
});

test.describe("DatePicker", () => {
  test("Test Step Up", async ({ page }) => {
    await page.getByText("DatePicker").click();
  });
});
