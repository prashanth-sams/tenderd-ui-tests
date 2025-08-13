import { Given, Then, When } from "@cucumber/cucumber"
import { pageFixture as fixture } from "../hooks/pageFixture";
import { ListingsPage } from "../page/ListingsPage";
import { HistoryPage } from "../page/HistoryPage";
import { expect } from "@playwright/test";


let listings = new ListingsPage(fixture.page);
let history = new HistoryPage(fixture.page);


Then('I should see the history of status changes for the selected equipment items one by one with the {string}', { timeout: 60 * 1000 }, async function (newStatus: string) {

  const equipmentCount = await fixture.page.locator('tbody tr').count();
  fixture.logger.info(`Total number of equipment items: ${equipmentCount}`);

  const maxLoops = Math.min(3, equipmentCount);
  for (let i = 0; i < 3; i++) {
    const currentStatusName = await fixture.page.locator('tbody tr').nth(i).locator('td').nth(2).innerText();

    const historyLink = await fixture.page.locator('tbody tr').nth(i).locator('td').nth(4).locator('button');

    if (currentStatusName !== "Under Maintenance") {
      await historyLink.click();

      await history.element.operator().first().waitFor({ state: "visible", timeout: 5000 });
      
      const totalHistoryItems = await history.element.operator().count();
      fixture.logger.info(`Total status change history items: ${totalHistoryItems}`);
      expect(totalHistoryItems).toBeGreaterThan(1);

      await history.element.xcloseButton().click();
    }
  }



});