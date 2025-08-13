import { Given, Then, When } from "@cucumber/cucumber"
import { pageFixture as fixture } from "../hooks/pageFixture";
import { CommonPage } from "../page/CommonPage";
import { AddEquipmentPage } from "../page/AddEquipmentPage";
import { expect } from "@playwright/test";


let common = new CommonPage(fixture.page);
let addEquipment = new AddEquipmentPage(fixture.page);

When('I click on the {string} button', { timeout: 60 * 1000 }, async function (buttonName: string) {
    if (buttonName === 'Add Equipment') {
        await common.element.addEquipment().click();
    }

    await addEquipment.element.header().waitFor({ state: "visible", timeout: 10000 });
    await expect(addEquipment.element.header()).toContainText(addEquipment.constant('header'));
});
