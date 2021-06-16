const delay = require("./delay");

function clearUpFacebookOverlay(page) {
  return new Promise(async function (resolve) {
    await page.mouse.down();
    await delay(1000);
    await page.mouse.up();
    resolve("done");
  });
}

module.exports = clearUpFacebookOverlay;
