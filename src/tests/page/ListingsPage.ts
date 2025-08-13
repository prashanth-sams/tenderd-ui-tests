import { pageFixture as fixture } from "../hooks/pageFixture";
import { BasePage } from "./BasePage";

export class ListingsPage extends BasePage {

    element = {
        header:() => fixture.page.locator(this.locator('header').selectorValue),
        spinner:() => fixture.page.locator(this.locator('spinner').selectorValue),
        loadertext:() => fixture.page.getByText(this.locator('loadertext').selectorValue),

        tableRows:() => fixture.page.locator(this.locator('tableRows').selectorValue),
        lastEquipmentDetails:() => fixture.page.locator(this.locator('lastEquipmentDetails').selectorValue),
        firstEquipmentDetails:() => fixture.page.locator(this.locator('firstEquipmentDetails').selectorValue)
    };

};