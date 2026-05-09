import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://www.uitestingplayground.com/ajax");
  await page.getByText("Button Triggering AJAX Request").click();
});

test("auto await", async ({ page }) => {
  const successButton = page.locator(".bg-success");
  //await successButton.waitFor({ state: "attached" });
  //   const text = await successButton.allTextContents();
  //   expect(text).toContain("Data loaded with AJAX get request.");
  await expect(successButton).toHaveText("Data loaded with AJAX get request.", {
    timeout: 20000,
  });
});
