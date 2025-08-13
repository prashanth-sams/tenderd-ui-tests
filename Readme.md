# Tenderd UI Tests (Playwright + Cucumber + TypeScript)

[![GitHub CI](https://github.com/prashanth-sams/tenderd-ui-tests/actions/workflows/main.yml/badge.svg?branch=main)](https://github.com/prashanth-sams/tenderd-ui-tests/actions/workflows/main.yml)

## Overview

- **Previous Test Run Artifacts**: [View results](https://github.com/prashanth-sams/tenderd-ui-tests/actions/runs/16927978329)  
- **Trigger a New Test Run**: [Run via GitHub Actions](https://github.com/prashanth-sams/tenderd-ui-tests/actions/workflows/main.yml)  
- **HTML Test Reports** : [View reports](https://github.com/prashanth-sams/tenderd-api-tests/tree/main/test-result)  
- **Recorded Test Execution Video**: [Watch video](https://github.com/prashanth-sams/tenderd-ui-tests/blob/main/UI%20Test%20Execution.mov)  


<img width="1293" height="468" alt="Screenshot 2025-08-13 at 9 01 48 AM" src="https://github.com/user-attachments/assets/21c0a6fa-adf5-452a-b78d-64848200f7da" />

---

## Prerequisites

- Node.js LTS (v20 recommended)
- npm (or pnpm/yarn) and git

### Install
```bash
# clone and enter
git clone https://github.com/prashanth-sams/tenderd-ui-tests.git
cd tenderd-ui-tests

# install dependencies
npm install

# install browsers (and OS deps on Linux)
npx playwright install --with-deps
```

## Test Execution
Try any of the below cmds to execute the tests

| Runner        | Command                       |
| ---           | ---                           |
| Run all tests        | `ENV=local npx cucumber-js --config=config/cucumber.js --tags "@smoke" --format-options '{"IgnoreBrowserErrors": true}'`              |
| Headed mode   | `HEADLESS=false ENV=local npx cucumber-js --config=config/cucumber.js --tags "@smoke" --format-options '{"IgnoreBrowserErrors": true}'`  |
| Cross Browser | `BROWSER=firefox HEADLESS=false ENV=local npx cucumber-js --config=config/cucumber.js --tags "@smoke" --format-options '{"IgnoreBrowserErrors": true}'` |
| Parallel (4 workers) | `HEADLESS=false ENV=local npx cucumber-js --config=config/cucumber.js --tags "@smoke" --format-options '{"IgnoreBrowserErrors": true}' --parallel 4` |
