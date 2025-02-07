import { faker } from "@faker-js/faker";
import {
  test,
  http,
  passthrough,
  HttpResponse,
  expect,
} from "next/experimental/testmode/playwright/msw";

test.use({
  mswHandlers: [
    [
      // Allow all non-mocked routes to pass through
      http.all("*", () => {
        return passthrough();
      }),
    ],
    { scope: "test" },
  ],
});

test("has title", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Fruit/);
});

test("has real fruit", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByLabel("fruit")).toHaveText(/Melon/);
});

test("has fake fruit", async ({ page, msw }) => {
  // Arrange
  const randomFruit = faker.food.fruit();

  msw.use(
    http.get(`https://httpbin.org/anything?fruit=Melon`, () =>
      HttpResponse.json({
        args: {
          fruit: randomFruit,
        },
      }),
    ),
  );

  // Act
  await page.goto("/");

  // Assert
  await expect(page.getByLabel("fruit")).toHaveText(randomFruit);
});
