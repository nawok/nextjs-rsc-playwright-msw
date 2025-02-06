import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Fruit/);
});

test("has real fruit", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByLabel("fruit")).toHaveText(/Melon/);
});
