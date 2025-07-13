const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

describe('SignUp Page Tests', function () {
  let driver;
  const baseUrl = 'http://localhost:3000/signup.html';

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

  it('sign up with valid registration', async () => {
    await driver.findElement(By.id('firstName')).sendKeys('محمد');
    await driver.findElement(By.id('lastName')).sendKeys('خالد');
    await driver.findElement(By.id('username')).sendKeys('mohammad_k');
    await driver.findElement(By.id('email')).sendKeys('m.khaled@example.com');
  
    const phoneCodeSelect = await driver.findElement(By.id('phoneCode'));
    await phoneCodeSelect.findElement(By.css('option[value="+966"]')).click();
  
    await driver.findElement(By.id('phone')).sendKeys('512345678');
    await driver.findElement(By.id('password')).sendKeys('pass12345');
    await driver.findElement(By.id('confirmPassword')).sendKeys('pass12345');
  
    await driver.findElement(By.id('signupBtn')).click();
  
    const msg = await driver.findElement(By.id('signupMessage')).getText();
    assert.strictEqual(msg, 'تم إنشاء الحساب بنجاح');
  });
  

  it('should show error for empty fields', async () => {
    await driver.findElement(By.id('signupBtn')).click();

    const msg = await driver.findElement(By.id('signupMessage')).getText();
    assert.strictEqual(msg, 'حقول إلزامية');
  });

  it('sign up with password mismatch', async () => {
    await driver.findElement(By.id('fullName')).sendKeys('سارة علي');
    await driver.findElement(By.id('username')).sendKeys('sara_ali');
    await driver.findElement(By.id('email')).sendKeys('sara@example.com');

    await driver.findElement(By.id('phone')).sendKeys('599123456');
    await driver.findElement(By.id('password')).sendKeys('pass123');
    await driver.findElement(By.id('confirmPassword')).sendKeys('wrongpass');

    await driver.findElement(By.id('signupBtn')).click();

    const msg = await driver.findElement(By.id('signupMessage')).getText();
    assert.strictEqual(msg, 'يجب أن تكون كلمة المرور متطابقة');
  });

  it('login link navigation - if there is an existing account', async () => {
    const loginLink = await driver.findElement(By.id('loginLink'));
    await loginLink.click();

    await driver.wait(until.urlContains('/login.html'), 10000);
    const url = await driver.getCurrentUrl();
    assert.ok(url.includes('/login.html'));
  });
});
