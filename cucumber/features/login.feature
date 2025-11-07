Feature: User Login
  Scenario: Successful login with valid info
    Given the user is on the login page
    When the user enter a valid email and password
    Then the user should see their email and password in the URL