import { pageFixture as fixture } from "../hooks/pageFixture";
import { BasePage } from "./BasePage";

export class CommonPage extends BasePage {

    element = {
        header:() => fixture.page.locator(this.locator('header').selectorValue),
        addEquipment:() => fixture.page.locator(this.locator('addEquipment').selectorValue),
        refresh:() => fixture.page.getByRole('button', { name: this.locator('refresh').selectorValue })
    };

};