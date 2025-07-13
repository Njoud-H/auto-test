const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

describe('Login Page Tests', function () {
  let driver;
  const baseUrl = 'http://localhost:3000/login.html';

  this.timeout(30000);

  before(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  after(async () => {
    await driver.quit();
  });

  beforeEach(async () => {
    await driver.get(baseUrl);
  });

  it('should login successfully with valid credentials', async () => {
    await driver.findElement(By.id('username')).sendKeys('validUser');
    await driver.findElement(By.id('password')).sendKeys('validPass');
    await driver.findElement(By.id('loginBtn')).click();

    await driver.wait(until.urlContains('https://satr.codes/'), 10000);
    const currentUrl = await driver.getCurrentUrl();
    assert.ok(currentUrl.includes('https://satr.codes/'));
  });

  it('should show error for empty username', async () => {
    await driver.findElement(By.id('password')).sendKeys('validPass');
    await driver.findElement(By.id('loginBtn')).click();

    const errorMsg = await driver.findElement(By.id('errorMessage')).getText();
    assert.strictEqual(errorMsg, 'اسم المستخدم أو كلمة المرور غير صحيحة');
  });

  it('should show error for empty password', async () => {
    await driver.findElement(By.id('username')).sendKeys('validUser');
    await driver.findElement(By.id('loginBtn')).click();

    const errorMsg = await driver.findElement(By.id('errorMessage')).getText();
    assert.strictEqual(errorMsg, 'اسم المستخدم أو كلمة المرور غير صحيحة');
  });

  it('should show error for invalid credentials', async () => {
    await driver.findElement(By.id('username')).sendKeys('wrongUser');
    await driver.findElement(By.id('password')).sendKeys('wrongPass');
    await driver.findElement(By.id('loginBtn')).click();

    const errorMsg = await driver.findElement(By.id('errorMessage')).getText();
    assert.strictEqual(errorMsg, 'اسم المستخدم أو كلمة المرور غير صحيحة');
  });

  it('should allow clicking "تذكرني" checkbox', async () => {
    const checkbox = await driver.findElement(By.id('rememberMe'));
    const isSelectedBefore = await checkbox.isSelected();
    await checkbox.click();
    const isSelectedAfter = await checkbox.isSelected();
    assert.strictEqual(isSelectedBefore, false);
    assert.strictEqual(isSelectedAfter, true);
  });
  
});
