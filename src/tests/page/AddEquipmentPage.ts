import { pageFixture as fixture } from "../hooks/pageFixture";
import { BasePage } from "./BasePage";

export class AddEquipmentPage extends BasePage {

    element = {
        header:() => fixture.page.locator(this.locator('header').selectorValue),
        equipmentName:() => fixture.page.getByRole('textbox', { name: this.locator('equipmentName').selectorValue }),
        
        initialStatus:() => fixture.page.getByLabel(this.locator('initialStatus').selectorValue),
        location:() => fixture.page.getByRole('textbox', { name: this.locator('location').selectorValue }),
        
        addEquipmentSubmit:() => fixture.page.locator(this.locator('addEquipmentSubmit').selectorValue),
        successMessage:() => fixture.page.getByText(this.locator('successMessage').selectorValue),
    };

    public async addNewEquipment(equipmentName: string, status: string, location: string) {
        await this.element.equipmentName().fill(equipmentName);
        await this.element.initialStatus().selectOption(status);
        await this.element.location().fill(location);
        await this.element.addEquipmentSubmit().click();
    }

};