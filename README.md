# Playwright Automation Framework - Sauce Demo

This repository contains a basic, interview-ready Test Automation Framework using Playwright. It was explicitly designed and structured to demonstrate standard industry best practices for a QA Automation Engineer interview.

## 🚀 Key Features

*   **Page Object Model (POM):** Built around POM to abstract page locators and actions, keeping tests incredibly clean and maintainable.
*   **Global Authentication Setup:** Uses Playwright's project dependencies to log in just *once* (`auth.setup.ts`) and save the authenticated state (`user.json`). Every test uses this session automatically.
*   **Custom Playwright Fixtures (`pomFixtures.ts`):** We extended Playwright's `test` object so that all Page Objects (like `LoginPage`, `InventoryPage`) are injected automatically into the tests. You don't need to instantiate classes (`new LoginPage()`) inside the test files!
*   **Parallel Execution:** Configured to run tests in parallel across Google Chrome, Firefox, and WebKit (Safari).

## 📁 Architecture Overview

```text
├── playwright.config.ts    # Main Playwright configuration (Projects, Retries, Reporters, Auth Setup)
├── fixtures/
│   └── pomFixtures.ts      # Custom fixture connecting test runner to abstract Page Objects
├── pages/                  # Page Object Model classes
│   ├── BasePage.ts         # Holds common logic, inheritance for other pages
│   ├── LoginPage.ts        
│   ├── InventoryPage.ts    
│   ├── ProductDetailsPage.ts 
│   ├── CartPage.ts         
│   ├── CheckoutPage.ts     
│   ├── SidebarMenu.ts     
│   └── Footer.ts     
└── tests/
    ├── setup/
    │   └── auth.setup.ts   # Runs once before the main tests to log in and save storageState
    └── e2e/
        ├── auth/           # Unhappy paths for login
        ├── inventory/      # Products, Sorting, Details
        ├── checkout/       # Happy checkout and form validations
        ├── cart.spec.ts    # Cart management tests
        ├── sidebar.spec.ts # Menu actions (Logout, Reset State)
        └── footer.spec.ts  # Validation of links opening in new tabs
```

## 🛠️ Setup & Installation

1.  **Clone the Repository** and navigate to the project directory.
2.  **Install Dependencies:**
    ```bash
    npm install
    # Install browsers if you run this for the first time
    npx playwright install --with-deps
    ```

## ▶️ Execution

### Run all tests (Headless mode)

```bash
npx playwright test
```

### Run tests in UI mode (Interactive)

```bash
npx playwright test --ui
```

### View HTML Report

```bash
npx playwright show-report
```

## 💡 Notes for an Interview

- **Why POM?** Separation of concerns. If UI changes, we only adjust the locators in the `pages/` directory instead of hunting down broken scripts in test files.
- **Why Global Setup?** Avoids the overhead and flakiness of logging in via UI for *every single test*. It speeds up the test suite significantly.
- **Why Custom Fixtures?** Demonstrates deep knowledge of Playwright internals. The resulting tests are extremely readable.
