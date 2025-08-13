import { Given, Then, When } from "@cucumber/cucumber"
import { pageFixture as fixture } from "../hooks/pageFixture";
import { ListingsPage } from "../page/ListingsPage";
import { CommonPage } from "../page/CommonPage";
import page from "../support/actions";
import assert from "../support/assertions";
import { expect } from "@playwright/test";


let listings = new ListingsPage(fixture.page);
let common = new CommonPage(fixture.page);

Given('I am on the Equipment Status Tracker {string} page', { timeout: 60 * 1000 }, async function (pageName: string) {

  await page.goto(process.env.BASEURL);
  fixture.logger.info(`Successfully navigated to the Equipment Status Tracker ${pageName} page`);

  await expect(fixture.page.title()).resolves.toMatch(listings.constant('title'));
});


Then('I wait until the equipment loading completes', async function () {

  fixture.logger.info("Waiting for the equipment loading to complete...");
  await Promise.all([
    listings.element.spinner().waitFor({ state: "detached", timeout: 10000 }),
    listings.element.loadertext().waitFor({ state: "detached", timeout: 10000 })
  ]);
  fixture.logger.info("Successfully waited for the equipment loading to complete");

  await common.element.header().waitFor({ state: "visible" });
  await assert.urlContains(listings.constant('url'));
  await expect(common.element.header()).toContainText(common.constant('header'));

  await listings.element.header().waitFor({ state: "visible" });
  await expect(listings.element.header()).toContainText(listings.constant('header'));
});


Then('I should see {string} in the equipment list with status {string} and location {string}', { timeout: 60 * 1000 }, async function (equipmentName: string, status: string, location: string) {

    await common.element.refresh().waitFor({ state: "visible", timeout: 5000 });
    await common.element.refresh().click();

    await expect(listings.element.lastEquipmentDetails().nth(0)).toContainText(equipmentName);
    await expect(listings.element.lastEquipmentDetails().nth(1)).toContainText(location);
    await expect(listings.element.lastEquipmentDetails().nth(2)).toContainText(status);
});


When('I change the existing equipment status to {string}', async function (newStatus: string) {
  
  const equipmentCount = await fixture.page.locator('tbody tr').count();
  fixture.logger.info(`Total number of equipment items: ${equipmentCount}`);
  
  const maxLoops = Math.min(3, equipmentCount);
  for (let i = 0; i < 3; i++) {

    const currentStatusName = await fixture.page.locator('tbody tr').nth(i).locator('td').nth(2).innerText();

    if (currentStatusName !== newStatus && currentStatusName !== "Under Maintenance") {
      await fixture.page.locator('tbody tr').nth(i).locator('td').nth(4).locator('select').selectOption(newStatus);
    }
  }
});


Then('the status should be {string} for the selected equipment items', async function (newStatus: string) {
  
  await common.element.refresh().waitFor({ state: "visible", timeout: 5000 });
  await common.element.refresh().click();  

  const equipmentCount = await fixture.page.locator('tbody tr').count();
  fixture.logger.info(`Total number of equipment items: ${equipmentCount}`);

  const maxLoops = Math.min(3, equipmentCount);
  for (let i = 0; i < 3; i++) {

    const currentStatusName = await fixture.page.locator('tbody tr').nth(i).locator('td').nth(2).innerText();

    if (currentStatusName !== "Under Maintenance") {
      fixture.logger.info(`Checking status for equipment item ${i + 1}: ${currentStatusName}`);
      await expect(fixture.page.locator('tbody tr').nth(i).locator('td').nth(2)).toHaveText(newStatus);
    }
  }
});
