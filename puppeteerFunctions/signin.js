const password = require("../config").password;

function signIn(browser) {
  return new Promise(async (resolve, reject) => {
    const page = await browser.newPage();
    const context = browser.defaultBrowserContext();
    //        URL                  An array of permissions
    context.overridePermissions("https://www.facebook.com", [
      "geolocation",
      "notifications",
    ]);
    await page.setDefaultNavigationTimeout(1000000);
    await page.setViewport({ width: 1000, height: 3000 });
    await page.goto("https://www.facebook.com");
    await page.waitForSelector("#email");
    // await page.type("#email", "oosuide@yahoo.com");
    await page.type("#email", "debaosuidecl@gmail.com");
    await page.type("#pass", password);
    await page.click(`[type="submit"]`);
    await page.waitForNavigation();

    resolve(page);
  });
}

module.exports = signIn;
