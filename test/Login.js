const { Builder, Browser, By, Key, until } = require('selenium-webdriver')
const assert = require ('assert');

const url= 'https://saucedemo.com';

let driver;

describe('Login Functionality', (async)=>{
    
    beforeEach(function()
    {
        driver = new Builder().forBrowser(Browser.CHROME).build();
        driver.get(url);

    })

    afterEach(function()
    {
         driver.quit();

    })
       
    
    it('Successful login with valid username and password',async ()=>{
        
        await driver.findElement(By.id('user-name')).sendKeys('standard_user');
        await driver.findElement(By.id('password')).sendKeys('secret_sauce');
        await driver.findElement(By.name('login-button')).click();

        

    })

    it('Failed login with invalid username and invalid password',async ()=>{
        
        await driver.findElement(By.id('user-name')).sendKeys('standard');
        await driver.findElement(By.id('password')).sendKeys('secret');
        await driver.findElement(By.name('login-button')).click();

        let errorMessage=await driver.findElement(By.css('h3[data-test="error"]')).getText().then(function(value){
            return value

        })
       // Verify error message displayed on failed Login
       assert.strictEqual(errorMessage,'Epic sadface: Username and password do not match any user in this service')


    })

    

    
})
