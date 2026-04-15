## 🎯 Design Decisions & Trade-offs

### Why Playwright + TypeScript

Playwright was chosen as a modern, reliable E2E framework with built-in support for auto-waiting, parallel execution, and multiple browsers.
TypeScript was used because Playwright is natively developed for it, providing better developer experience and type safety.

---

### Page Object Model (POM)

Page Object Model was implemented to:

* separate test logic from UI interactions
* improve maintainability and readability
* allow easier future extensions

**Trade-off:**
For a small project, POM introduces additional structure and files, but it scales much better for real-world test suites.

---

### Fixtures

Custom Playwright fixtures were introduced to:

* eliminate duplicated login steps
* provide pre-authenticated test state
* simplify test setup

**Trade-off:**
Fixtures add an abstraction layer, which slightly increases complexity, but significantly improves test clarity and reduces duplication.

---

### Selectors Strategy

Selectors are based on:

* visible text
* semantic structure (`hasText`, `locator` chaining)

instead of fragile CSS paths.

**Trade-off:**
Text-based selectors may be slightly slower, but are more stable and readable compared to deeply nested CSS selectors.

---

### Test Design

Tests are:

* independent (no shared state)
* readable (Arrange–Act–Assert structure)
* free of hard waits (`waitForTimeout` avoided)

**Trade-off:**
Additional assertions and structure increase code length, but greatly improve reliability and debuggability.

---

### CI (GitHub Actions)

CI workflow was added to automatically execute tests on push and pull requests.

**Trade-off:**
Adds setup overhead, but ensures test reliability and mimics real-world development practices.

---

### What could be improved

* adding API mocking using `page.route`
* introducing visual regression testing
* adding accessibility tests (e.g. axe-core)
* running tests against multiple environments

---