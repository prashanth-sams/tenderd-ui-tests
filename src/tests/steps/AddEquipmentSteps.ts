import { Then, When } from "@cucumber/cucumber"
import { pageFixture as fixture } from "../hooks/pageFixture";
import { AddEquipmentPage } from "../page/AddEquipmentPage";
import { CommonPage } from "../page/CommonPage";


let addEquipment = new AddEquipmentPage(fixture.page);


When('I add {string} with status {string} and location {string}', { timeout: 60 * 1000 }, async function (equipmentName: string, status: string, location: string) {
    await addEquipment.addNewEquipment(equipmentName, status, location);

    await addEquipment.element.successMessage().waitFor({ state: "visible", timeout: 5000 });
});


