// @ts-nocheck

// is private group
const puppeteer = require("puppeteer");
const { grandMatch } = require("./puppeteerFunctions/matchFunctions");
const signIn = require("./puppeteerFunctions/signin");
const fs = require("fs");
// const {
//   fetchResultsForGroup2,
//   facebookpostpreparation,
//   preparepostingpage,
// } = require("./puppeteerFunctions/puppeteerpagemovementfunctions");

const INDEX = 1;
(async () => {
  let latestText = fs.readFileSync(`./recentpost/recent${INDEX}.txt`, "utf8");

  try {
    const browser = await puppeteer.launch({
      headless: false,
      //   slowMo: 10,
    });
    let page = await signIn(browser);
    console.log("done");
    let newpage = await browser.newPage();
    await newpage.goto("https://www.facebook.com/groups/4082205051895086");
    await newpage.waitForSelector(
      `[data-pagelet="GroupInlineComposer"] .a8c37x1j.ni8dbmo4.stjgntxs.l9j0dhe7`
    );
    const element = await newpage.$x(
      "//BODY/div/div/div/div/div[3]/div/div/div/div/div[2]/div/div/div[4]/div/div/div/div/div/div/div/div/div/div/div/div/span"
    );
    console.log(element, "xpath element");
    await element[0].click();
    console.log("clicked");

    const formpath =
      "//BODY/div/div/div/div/div[4]/div/div/div/div/div[2]/div/div/div/div/div/form/div/div/div/div/div/div/div[2]/div/div/div/div/div/div/div/div[2]/div/div/div";
    await newpage.waitForXPath(formpath);

    const fform = await newpage.$x(formpath);

    await fform[0].click();

    const post =
      "𝑷  𝑹  𝑰  𝑪  𝑬  -  𝑫  𝑹  𝑶  𝑷     adidas boys Kids-boy's/Girl's Blocked Lin ear Quarter Socks (6-pair) https://amzn.to/2RZtsLJ?tag=rios0f76-20 COMMENT “S";

    const links = await page.evaluate((post) => {
      console.log(post, "blah"); // 2. should be defined now
      function copyToClp(txt) {
        var m = document;
        txt = m.createTextNode(txt);
        var w = window;
        var b = m.body;
        b.appendChild(txt);
        if (b.createTextRange) {
          var d = b.createTextRange();
          d.moveToElementText(txt);
          d.select();
          m.execCommand("copy");
        } else {
          var d = m.createRange();
          var g = w.getSelection;
          d.selectNodeContents(txt);
          g().removeAllRanges();
          g().addRange(d);
          m.execCommand("copy");
          g().removeAllRanges();
        }
        txt.remove();
      }

      copyToClp(post);
      return post;
    }, post);
    console.log(links, "link");

    // for (let i = 0; i < post.length; i++) {
    //     try {
    //       await newpage.keyboard.press(post[i]);
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   }

    await newpage.keyboard.down("Control");
    await newpage.keyboard.press("V");
    await newpage.keyboard.up("Control");

    const postbutton = await newpage.$(`[aria-label="Post"]`);
    await postbutton.click();
    await postbutton.click();
    console.log("done");

    // need to find a way to wait for this before close
    // await delay(60000);
    // resolve({ page, id });
    console.log("done");
  } catch (error) {
    console.error(error);
  }
})();
