@smoke
Feature: Add Equipment

    As a user, I want to add new equipment
    So that I can keep track of all available equipment

    Background:
        Given I am on the Equipment Status Tracker "Listings" page
        Then I wait until the equipment loading completes

    Scenario Outline: Add new equipment
        When I click on the "Add Equipment" button
        When I add "<Equipment Name>" with status "<Status>" and location "<Location>"
        Then I should see "<Equipment Name>" in the equipment list with status "<Status>" and location "<Location>"

    Examples:
        | Equipment Name                | Status                | Location  |
        | Backhoe Loader Case 580N      | Idle                  | Site A    |
        | Bulldozer CAT D6              | Active                | Site B    |
        | Forklift Toyota 8FGCU25       | Under Maintenance     | Site C    |
