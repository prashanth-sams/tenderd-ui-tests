@smoke
Feature: Update Equipment Status

    As a user, I want to update the status of existing equipment
    So that I can reflect their current availability

    Background:
        Given I am on the Equipment Status Tracker "Listings" page
        Then I wait until the equipment loading completes

    Scenario Outline: Update equipment status
        When I change the existing equipment status to "<New Status>"
        Then the status should be "<New Status>" for the selected equipment items
        Then I should see the history of status changes for the selected equipment items one by one with the "<New Status>"

        Examples:
            | New Status            |
            | Idle                  |
            | Active                |
