import { pageFixture as fixture } from "../hooks/pageFixture";
import { BasePage } from "./BasePage";

export class HistoryPage extends BasePage {

    element = {
        header:() => fixture.page.locator(this.locator('header').selectorValue),
        operator:() => fixture.page.getByText(this.locator('operator').selectorValue),
        xcloseButton:() => fixture.page.locator(this.locator('xcloseButton').selectorValue)
    };

};