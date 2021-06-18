// @ts-nocheck
const pageScrapeAlgo = require("./scrapePageForResults");
const delay = require("./delay");
const axios = require("axios");

function getlonglinkAndTransform(shortlink = "", post) {
  return new Promise(async (resolve, reject) => {
    if (shortlink.indexOf("amzn.to") === -1) {
      resolve(newpost);
    }
    try {
      let res = await axios.get(shortlink);
      // console.log(res)

      // res.data = "";

      let path = res.request.path;
      console.log(res.request.path, "path");

      let newpost = post.replace(
        shortlink,
        `https://www.amazon.com${
          path.split("?")[0]
        }?tag=rios0f76-20&ref=as_li_ss_tl`
      );
      // console.log(data);
      resolve(newpost);
    } catch (error) {
      // console.log(error);
      console.log(error.response.request.path, "13");
      let path = error.response.request.path;

      if (path.indexOf("404ref=mpc_redirect_bot") !== -1) {
        await getlonglinkAndTransform(shortlink, post);
      }
      let newpost = post.replace(
        shortlink,
        `https://www.amazon.com${
          path.split("?")[0]
        }?tag=rios0f76-20&ref=as_li_ss_tl`
      );

      // console.log("new post", newpost);
      resolve(newpost);
    }
  });
}
function fetchResultsForGroup2(page, groupurl) {
  //https://www.facebook.com/groups/amzdeals1/
  return new Promise(async (resolve, reject) => {
    await page.goto(`${groupurl}?sorting_setting=CHRONOLOGICAL`);
    try {
      await page.waitForSelector(`[href="${groupurl}"]`);
    } catch (error) {
      console.log(error);
      resolve({
        link: "",
      });
    }

    await page.bringToFront();

    // page.$eval("#element", (el) => el.scrollIntoView());

    // await delay(1000);
    // await page.keyboard.press(String.fromCharCode(32));
    // await page.keyboard.press(String.fromCharCode(32));
    // await page.keyboard.press(String.fromCharCode(32));
    // await page.keyboard.press(String.fromCharCode(32));
    try {
      await page.waitForSelector(`.dati1w0a.ihqw7lf3.hv4rvrfc.ecm0bbzt`);

      // page.$eval(".dati1w0a.ihqw7lf3.hv4rvrfc.ecm0bbzt", (el) =>
      //   el.scrollIntoView()
      // );

      // await delay(1000);
    } catch (error) {
      console.log(error, "here");
      resolve("");
      // process.exit(1);
    }
    console.log("evaluating");

    // await page.keyboard.press(String.fromCharCode(32));
    const result = await page.evaluate(pageScrapeAlgo);
    console.log(result, 57);

    // return;
    // return;
    let newresult = "";

    if (result.link) {
      console.log("link found");
      newresult = await getlonglinkAndTransform(result.link, result.post);
    }

    resolve(newresult);
  });
}
function facebookpostpreparation(
  activepostpages,
  pagesidPosting,
  result,
  browser
) {
  return new Promise(async (resolve, reject) => {
    let useLastPagePushed = activepostpages[activepostpages.length - 1].page;
    let useLastPagePushedid = activepostpages[activepostpages.length - 1].id;
    if (pagesidPosting.indexOf(useLastPagePushedid) !== -1) {
      const newid = Math.random();
      let brandnewpage = await browser.newPage();
      activepostpages.push({
        page: brandnewpage,
        id: newid,
      });

      await preparepostingpage(brandnewpage);
      posttogroup(brandnewpage, result, newid).then(async (res) => {
        try {
          if (activepostpages.length > 1) {
            await res.page.close();
          }
          activepostpages = activepostpages.filter((item) => res.id != item.id);

          pagesidPosting = pagesidPosting.filter((pageid) => pageid !== res.id);
          resolve("done");
        } catch (error) {
          console.log(error);
          resolve("done");
        }
      });
    } else {
      pagesidPosting.push(useLastPagePushedid);
      posttogroup(useLastPagePushed, result, useLastPagePushedid).then(
        async (res) => {
          try {
            if (activepostpages.length > 1) {
              await res.page.close();
            }
            activepostpages = activepostpages.filter(
              (item) => res.id != item.id
            );
            pagesidPosting = pagesidPosting.filter(
              (pageid) => pageid !== res.id
            );
            resolve("done");
          } catch (error) {
            console.log(error);
            resolve("done");
          }
        }
      );
    }
  });
}
function posttogroup(page, post, id) {
  return new Promise(async (resolve, reject) => {
    console.log("done");

    let element;
    try {
      await page.bringToFront();
      element = await page.$(
        `[data-pagelet="GroupInlineComposer"] .a8c37x1j.ni8dbmo4.stjgntxs.l9j0dhe7`
        // "//BODY/div/div/div/div/div[3]/div/div/div/div/div[2]/div/div/div[4]/div/div/div/div/div/div/div/div/div/div/div/div/span"
      );
      // return;
      console.log(element, "element");
      await page.click(
        `[data-pagelet="GroupInlineComposer"] .a8c37x1j.ni8dbmo4.stjgntxs.l9j0dhe7`
      );

      console.log(element);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }

    // console.log(element, 181);

    // const element = await page.$x(
    //   "BODY/div/div/div/div/div[3]/div/div/div/div/div[4]/div/div/div/div/div/div/div/div/div/div/div/div/span"
    //   // "//BODY/div/div/div/div/div[3]/div/div/div/div/div[2]/div/div/div[4]/div/div/div/div/div/div/div/div/div/div/div/div/span"
    // );
    // console.log(element, "xpath element");

    // await element.click();
    console.log("clicked");

    const formpath =
      "//BODY/div/div/div/div/div[4]/div/div/div/div/div[2]/div/div/div/div/div/form/div/div/div/div/div/div/div[2]/div/div/div/div/div/div/div/div[2]/div/div/div";

    try {
      await page.waitForXPath(formpath);
    } catch (error) {
      console.log(error);
      resolve({ page, id });
    }

    const fform = await page.$x(formpath);

    await fform[0].click();

    await page.evaluate((post) => {
      //   console.log(post, "blah"); // 2. should be defined now
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

    // for (let i = 0; i < post.length; i++) {
    //   try {
    //     await page.keyboard.press(post[i]);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }

    await page.keyboard.down("Control");
    await page.keyboard.press("V");
    await page.keyboard.up("Control");

    const postbutton = await page.$(`[aria-label="Post"]`);
    await postbutton.click();
    await postbutton.click();
    console.log("done");

    // need to find a way to wait for this before close
    await delay(10000);
    resolve({ page, id });
    console.log("done");
  });
}

function preparepostingpage(page) {
  return new Promise(async (resolve, reject) => {
    await page.goto("https://www.facebook.com/groups/255527996169734/");
    // await page.goto("https://www.facebook.com/groups/255527996169734/");
    // await page.goto("https://www.facebook.com/groups/4082205051895086");
    let selector;

    try {
      selector = await page.waitForSelector(
        `[data-pagelet="GroupInlineComposer"] .a8c37x1j.ni8dbmo4.stjgntxs.l9j0dhe7`
      );

      if (!selector)
        await page.waitForXPath(
          "BODY/div/div/div/div/div[3]/div/div/div/div/div[4]/div/div/div/div/div/div/div/div/div/div/div/div/span"
        );
    } catch (error) {
      // process.exit(1);

      resolve(page);
    }

    resolve(page);
  });
}

module.exports = {
  fetchResultsForGroup2,
  facebookpostpreparation,
  preparepostingpage,
  getlonglinkAndTransform,
};
