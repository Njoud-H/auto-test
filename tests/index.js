const { Builder, By, Key } = require('selenium-webdriver');
const assert = require("assert");

const chrome = require('selenium-webdriver/chrome');

async function runTest() {


  // lanch the browser 
 let  driver = await new Builder().forBrowser('chrome').build();

  // navigate to the application
    await driver.get("https://lambdatest.github.io/sample-todo-app/");
    

    // add to do
    await driver.findElement(By.id("sampletodotext")).sendKeys("Learn Selenium", Key.RETURN);


   // assert
/*   let toDoText = await driver.findElement(By.xpath("//li[last()]")).getText().then(function(value) {
    return value;
   }); */


  // assert.strictEqual(toDoText, "Learn Selenium");
 

 //  await driver.quit();
}

runTest();

