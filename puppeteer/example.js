'use strict';

const puppeteer = require('puppeteer');
var constants = require( './constants.js' );

var username = constants.username;
var password = constants.password;

// var testImage = require('./theme.png');
var testImage = "./theme.png";

// Defaults to Galaxy s9 user agent
//https://github.com/jamesgrams/instagram-poster/blob/master/index.js
const USER_AGENT = false
  ? "false"
  : 'Mozilla/5.0 (Linux; Android 8.0.0; SM-G960F Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.84 Mobile Safari/537.36';
const REQUIRED_ARGS = ['username', 'password', 'image'];
const INSTAGRAM_LOGIN_URL = 'https://instagram.com/accounts/login';
const INSTAGRAM_URL = 'https://instagram.com';





(async () => {

  let options = {
    defaultViewport: {
      width: 320,
      height: 570,
    },
    headless: false
  };


    const browser = await puppeteer.launch(options);
    const page = await browser.newPage();


    let imageArray = [];

    // for (let i = 0; i < 10; i++){
    //     await page.goto('http://localhost:3000/preview');
    // }

    await page.goto('http://localhost:3000/preview');


    


    await page.waitForSelector('#theme');
    const element = await page.$('#theme');


    await element.screenshot({
      path: 'puppeteer/theme.png',
      // type: "png"
    });

    // const base64 = await element.screenshot({
    //     encoding: "base64"
    // });

    // console.log(base64);

    await browser.close();
});//();


async function run(base64Array) {

    // console.log(`username: ${username}, password: ${password}`)
    console.log(username);
    console.log(password)
    try {
      console.debug('launching puppeteer');
  
      // Configure puppeteer options
      let options = {
        defaultViewport: {
          width: 320,
          height: 570,
        },
      };

      // if we wanna use a certain chrome
      const executablePath = null;
      if (executablePath) {
        options.executablePath = executablePath;
      }

      // for debugging -- make false after
      if (true) {
        options.headless = false;
      }
  
      // Get the browser
      let browser = await puppeteer.launch(options);
  
      // Get the page
      let page = await browser.newPage();
  
      // Instagram only allows posting on their mobile site, so we have to pretend to be on mobile
      page.setUserAgent(USER_AGENT);
  
      console.debug('visiting the instagram login page');
  
      // Go to instagram.com
      await page.goto(INSTAGRAM_LOGIN_URL);
  
      console.debug('waiting for the username input');
  
      // Wait for the username input
      await page.waitForSelector("input[name='username']");
      await delay(2500);
  
      console.debug('typing in the username and password');
  
      // Get the inputs on the page
      let usernameInput = await page.$("input[name='username']");
      let passwordInput = await page.$("input[name='password']");
  
      // Type the username in the username input
      await usernameInput.click();
      await page.keyboard.type(username, { delay: 50 });
  
      // Type the password in the password input
      await passwordInput.click();
      await page.keyboard.type(password, { delay: 50 });
  
      console.debug('clicking log in');
  
      // Click the login button
      let button = await page.$x("//div[contains(text(),'Log In')]//..");
      await button[0].click();
  
      // Make sure we are signed in
      await page.waitForNavigation();
  
      console.debug('going to instagram home');
  
      // They may try to show us something but just go straight to instagram.com
      await page.goto(INSTAGRAM_URL);
  
      console.debug('waiting for the file inputs');
  
      // Wait until everything is loaded
      await page.waitForSelector("input[type='file']");
  
      // Set the value for the correct file input (last on the page is new post)
      let fileInputs = await page.$$('input[type="file"]');
      let input = fileInputs[fileInputs.length - 1];
  
      // Upload the file
      console.debug('uploading the image');
  
      try {
        let [fileChooser] = await Promise.all([
          page.waitForFileChooser(),
          page.click("[aria-label='New Post']")
        ]);
        // await fileChooser.accept([argv.image]);
        await fileChooser.accept('puppeteer/theme.png');
        await delay(2500);
      }
      catch( error ) {
        // The chrome version may not support file picker interaction
        console.debug('could not use file picker');
      }
      // await input.uploadFile('puppeteer/theme.png');
      // await delay(2500);
  
      console.debug('waiting for next');



      return;
  
      // Wait for the next button
      await page.waitForXPath("//button[contains(text(),'Next')]");
  
      console.debug('clicking next');
  
      // Get the next button
      let next = await page.$x("//button[contains(text(),'Next')]");
      await next[0].click();
  
      console.debug('adding the caption');
  
      const caption = 'test caption';

      if (caption) {
        // Wait for the caption option
        await page.waitForSelector("textarea[aria-label='Write a caption…']");
  
        // Click the caption option
        await page.click("textarea[aria-label='Write a caption…']");
  
        // Type
        await page.keyboard.type(caption, { delay: 50 });
      }
  
      console.debug('waiting for share');
  
      // Get the share button and click it
      await page.waitForXPath("//button[contains(text(),'Share')]");
      let share = await page.$x("//button[contains(text(),'Share')]");
  
      console.debug('clicking share');
  
      await share[0].click();
  
      console.debug('finishing up');
  
      // Wait for a little while before finishing
      await delay(6000);
  
      // Close
      await browser.close();
  
      console.log('the post was made successfully');
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
}
  
  /**
   * Print the correct usage of this program.
   */
  function usage() {
    console.log(
      'Usage: node index.js --username <username> --password <password> --image <image_path> [-caption <caption>] [-executablePath <chrome_path>] [-agent <user_agent>] [-debug]'
    );
  }
  
  /**
   * Exit the program with an error
   */
  function fail() {
    usage();
    process.exit(1);
  }
  
  /**
   * Delays the code execution
   * @param {number} timeout
   * @returns {Promise}
   */
  function delay(timeout) {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  }


  run([]);