// const puppeteer = require("puppeteer");
// const { grandMatch } = require("./puppeteerFunctions/matchFunctions");
// const signIn = require("./puppeteerFunctions/signin");
// const fs = require("fs");
// const {
//   fetchResultsForGroup2,
//   facebookpostpreparation,
//   preparepostingpage,
// } = require("./puppeteerFunctions/puppeteerpagemovementfunctions");

// const INDEX = 8;
// (async () => {
//   let latestText = fs.readFileSync(`./recentpost/recent${INDEX}.txt`, "utf8");

//   try {
//     const browser = await puppeteer.launch({
//       headless: false,
//       //   slowMo: 10,
//     });
//     const pageinit = await signIn(browser);
//     const page = await browser.newPage();

//     let initfacebookpostingpage = await browser.newPage();
//     let initid = Math.random();
//     let activepostpages = [
//       {
//         id: initid,
//         page: initfacebookpostingpage,
//       },
//     ];

//     initfacebookpostingpage = await preparepostingpage(
//       activepostpages.find((p) => p.id === initid).page
//     );
//     console.log("navigation done");
//     let pagesidPosting = [];
//     while (true) {
//       console.time("timer");
//       let result;
//       try {
//         result = await fetchResultsForGroup2(
//           page,
//           "https://www.facebook.com/groups/freebiesdealsfinder/"
//           // "https://www.facebook.com/groups/404743450894440/"
//           // "https://www.facebook.com/groups/404743450894440/"
//         );
//       } catch (error) {
//         console.log(error);

//         continue;
//       }
//       //   if (false) {
//       if (!grandMatch(result)) {
//         console.log("there is no match");
//         console.timeEnd("timer");

//         continue;
//       } else {
//         console.log("there is a match", result);
//         if (result && result !== latestText) {
//           latestText = result;
//           console.log("writing result to file", result);
//           fs.writeFileSync(`./recentpost/recent${INDEX}.txt`, result);
//           console.log("written");

//           // post to facebook

//           await facebookpostpreparation(
//             activepostpages,
//             pagesidPosting,
//             result,
//             browser
//           );

//           // post to facebook done
//         }
//       }
//       console.timeEnd("timer");
//     }
//   } catch (error) {
//     console.error(error);
//   }
// })();

const puppeteer = require("puppeteer");
const { grandMatch } = require("./puppeteerFunctions/matchFunctions");
const signIn = require("./puppeteerFunctions/signin");
const fs = require("fs");
const {
  fetchResultsForGroup2,
  facebookpostpreparation,
  // preparepostingpage,
} = require("./puppeteerFunctions/puppeteerpagemovementfunctions");

const INDEX = 8;
(async () => {
  let latestText = fs.readFileSync(`./recentpost/recent${INDEX}.txt`, "utf8");

  try {
    const browser = await puppeteer.launch({
      headless: true,
      //   slowMo: 10,
    });
    const pageinit = await signIn(browser);

    const page = await browser.newPage();
    console.log("navigation done");
    while (true) {
      console.time("timer");
      let result;
      try {
        result = await fetchResultsForGroup2(
          page,
          // "https://www.facebook.com/groups/momsdealsandglitches/"
          "https://www.facebook.com/groups/freebiesdealsfinder/"
        );
      } catch (error) {
        console.log(error);
        continue;
      }
      // if (false) {
      if (!grandMatch(result)) {
        console.log("there is no match");
        console.timeEnd("timer");

        continue;
      } else {
        console.log("there is a match", result);
        if (result && result !== latestText) {
          latestText = result;
          console.log("writing result to file", result);
          fs.writeFileSync(`./recentpost/recent${INDEX}.txt`, result);
          console.log("written");

          // post to facebook

          await facebookpostpreparation(result, page);

          // post to facebook done
        }
      }
      console.timeEnd("timer");
    }
  } catch (error) {
    console.error(error);
  }
})();
