import { test, expect } from '@playwright/test';
//anotation test
test('validation test1', async ({ page }) => {
  //set one test step goto url
  await page.goto('https://www.facebook.com');
  // xpa
  // await page.getByPlaceholder('Email or phone number').fill("qwerthj");
  // await page.getByPlaceholder('Password').fill("qwerthj");
  await page.locator('//input[@name="email"]').fill("qwerthj");
  await page.locator('//*[@type="password"]').fill("qwerthj");
  await page.locator('//*[@type="text"]//following::button[1]').click();
  await page.waitForTimeout(15000);
});
test('validation test2', async ({ page }) => {
//   //set one test step goto url
//   await page.goto('https://www.facebook.com');
//   await page.getByPlaceholder('Email or phone number').fill("qwerthj");
//   await page.getByPlaceholder('Password').fill("");
//   await page.locator('[name="login"]').click();
//   await page.waitForTimeout(15000);
 });
 test('validation test3', async ({ page }) => {
//   //set one test step goto url
//   await page.goto('https://www.facebook.com');
//   await page.getByPlaceholder('Email or phone number').fill("");
//   await page.getByPlaceholder('Password').fill("qwerthj");
//   await page.locator('[name="login"]').click();
//   await page.waitForTimeout(15000);
 });
 test('validation test4', async ({ page }) => {
//   //set one test step goto url
//   await page.goto('https://www.facebook.com');
//   // await page.getByPlaceholder('Email or phone number').fill("qwerthj");
//   // await page.getByPlaceholder('Password').fill("qwerthj");
//   await page.locator('[name="login"]').click();
//   await page.waitForTimeout(15000);
 });
