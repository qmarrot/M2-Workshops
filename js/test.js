const { Builder, Browser, By, until } = require('selenium-webdriver');
const assert = require('assert');
const firefox = require('selenium-webdriver/firefox');

const baseUrl = "http://localhost:3000";

let firefoxOptions = new firefox.Options().setBinary('/usr/bin/firefox');  

async function testCreateWorkshop() {
    let driver = await new Builder()
        .forBrowser(Browser.FIREFOX)
        .setFirefoxOptions(firefoxOptions) 
        .build();
    
    try {
        await driver.get(`${baseUrl}/workshop`);  

        const nameInput = await driver.findElement(By.name("name"));
        await nameInput.sendKeys("Atelier Test");

        const descriptionInput = await driver.findElement(By.name("description"));
        await descriptionInput.sendKeys("Ceci est une description de test pour un atelier");

        const saveButton = await driver.findElement(By.css("button[type='submit']"));
        await saveButton.click();

        await driver.wait(until.urlIs(baseUrl), 5000);

        const workshops = await driver.findElements(By.css(".workshop-item"));
        const lastWorkshopText = await workshops[workshops.length - 1].getText();
        assert(lastWorkshopText.includes("Atelier Test"), "L'atelier n'a pas été créé correctement");

        console.log("Test réussi : L'atelier a été créé avec succès");
    } catch (err) {
        console.error("Erreur lors de la création de l'atelier", err);
    } finally {
        await driver.quit(); 
    }
}

testCreateWorkshop();