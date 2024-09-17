const puppeteer = require("puppeteer");
const path = require("path");
const browserOptions = {
  headless: true,
  ignoreHTTPSErrors: true,
};

let browser;
let page;

beforeAll(async () => {
  browser = await puppeteer.launch(browserOptions);
  page = await browser.newPage();
  await page.goto("file://" + path.resolve("./index.html"));
}, 30000);

afterAll((done) => {
  try {
    this.puppeteer.close();
  } catch (e) {}
  done();
});

describe("Add ToDos", () => {
  it("Page should contain task input field", async () => {
    const input = await page.$("input");
    expect(input).toBeTruthy();
  });
  it("Page should contain 'Create Task' button", async () => {
    const button = await page.$x(
      "//*[contains(translate(text(), 'CREATE', 'create'),'create')]"
    );
    expect(button).toEqual(expect.arrayContaining([expect.anything()]));
  });
  it("Task is created when entering text into input field and clicking button", async () => {
    await page.type("input", "Task 1");
    const button = await page.$x(
      "//*[contains(translate(text(), 'CREATE', 'create'),'create')]"
    );
    await button[0].click();
    expect(await page.$eval("body", (el) => el.textContent)).toMatch(/Task 1/i);
  });
});

describe("Delete ToDos", () => {
  it("Items should have 'x' delete button", async () => {
    await page.type("input", "Task 1");
    const button = await page.$x(
      "//*[contains(translate(text(), 'CREATE', 'create'),'create')]"
    );
    await button[0].click();
    const deleteBtn = await page.$x(
      "//*[contains(translate(text(), 'X', 'x'),'x')]"
    );
    expect(deleteBtn).toEqual(expect.arrayContaining([expect.anything()]));
  });
  it("Items is removed when clicking 'x' button", async () => {
    await page.type("input", "Task to delete");
    const button = await page.$x(
      "//*[contains(translate(text(), 'CREATE', 'create'),'create')]"
    );
    await button[0].click();
    expect(await page.$eval("body", (el) => el.textContent)).toMatch(
      /Task to delete/i
    );
    const deleteBtn = await page.$x(
      "//*[contains(translate(text(), 'X', 'x'),'x')]"
    );
    for (let index = 0; index < deleteBtn.length; index++) {
      await deleteBtn[index].click();
    }
    expect(await page.$eval("body", (el) => el.textContent)).not.toMatch(
      /Task to delete/i
    );
  });
});
