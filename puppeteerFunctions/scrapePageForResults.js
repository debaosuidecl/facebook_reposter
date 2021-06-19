// @ts-nocheck
async function pageScrapeAlgo() {
  function getElementByXpath(path) {
    return document.evaluate(
      path,
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
    ).singleNodeValue;
  }

  function delay(time) {
    return new Promise(function (resolve) {
      setTimeout(resolve, time);
    });
  }

  await delay(500);

  let urlRegex =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
  function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  let headings = document.querySelectorAll(
    `.dati1w0a.ihqw7lf3.hv4rvrfc.ecm0bbzt`
  );

  if (headings.length <= 0) {
    console.log("locating by xpath");
    headings = [
      getElementByXpath(
        "//BODY/div/div/div/div/div[3]/div/div/div/div/div[4]/div/div/div/div/div/div[2]/div/div/div[3]/div/div/div/div/div/div/div/div/div/div/div[2]/div/div[3]/div/div"
      ),
    ];
  }
  console.log(headings, "headings");

  const headingList = [];
  let reallink = "";
  headerloop: for (let i = 0; i < headings.length; i++) {
    let seemore;

    seemore = headings[i].querySelector("div.oajrlxb2.g5ia77u1");
    console.log(seemore, "seemore");
    if (seemore) {
      console.log("seeemore seen", seemore);
      seemore.click();
    }

    await delay(200);
    const linksforthisheading = document
      .querySelectorAll(`.dati1w0a.ihqw7lf3.hv4rvrfc.ecm0bbzt`)
      [i].querySelectorAll("a");
    // const linksforthisheading = headings[i].querySelectorAll("a");

    let selectedlink = "";

    if (linksforthisheading.length <= 0) {
      continue;
    }

    linkloop: for (let j = 0; j < linksforthisheading.length; j++) {
      let baselink = linksforthisheading[j].getAttribute("href");

      let possibleamazonlink = getParameterByName("u", baselink);
      if (!possibleamazonlink) {
        continue;
      }

      if (
        possibleamazonlink.indexOf("amzn.to") === -1 &&
        possibleamazonlink.indexOf("amazon.com") === -1
      ) {
        continue;
      }

      selectedlink = possibleamazonlink.split("?")[0] + "";

      // "?tag=rios0f76-20&ref=as_li_ss_tl";
    }

    if (!selectedlink) {
      continue;
    }

    let mytext =
      document.querySelectorAll(`.dati1w0a.ihqw7lf3.hv4rvrfc.ecm0bbzt`)[i]
        .innerText || "";

    let mytextarray = mytext.split(" ");
    let finaltext = "";
    for (let p = 0; p < mytextarray.length; p++) {
      if (finaltext) break;
      if (urlRegex.test(mytextarray[p])) {
        if (
          mytextarray[p].indexOf("amzn.to") == -1 &&
          mytextarray[p].indexOf("amazon.com") == -1
        ) {
          console.log("13", mytextarray[p]);
          mytext = mytext.replace(mytextarray[p], "");
        } else if (
          mytextarray[p].indexOf("amzn.to") !== -1 ||
          mytextarray[p].indexOf("amazon.com") !== -1
        ) {
          let arraytopossiblyremove = mytext.split(`${[mytextarray[p]]}`);
          let linkrelevanttext =
            arraytopossiblyremove.shift() + " " + mytextarray[p];

          console.log("start", mytextarray[p]);
          console.log("end");
          console.log(linkrelevanttext, 65);

          console.log(arraytopossiblyremove, 67);
          let newstring =
            linkrelevanttext +
            arraytopossiblyremove
              .join("")
              .split("\n")
              .filter((t) => {
                if (/code/gi.test(t) || /% /gi.test(t)) {
                  return true;
                }

                if (
                  /COMMENT/gi.test(t) ||
                  /TELEGRAM/gi.test(t) ||
                  /affiliate post/gi.test(t) ||
                  /drop a post/gi.test(t) ||
                  /t.me/gi.test(t) ||
                  /𝘓𝘦𝘵 𝘮𝘦 𝘬𝘯𝘰𝘸/gi.test(t) ||
                  /DROP A HEART/gi.test(t) ||
                  /𝑷𝒂/g.test(t)
                ) {
                  return false;
                }
                return false;
              })
              .join(" ");

          finaltext = newstring;
        }
      }
    }

    let possibleTextInArray = finaltext
      .replace(/\n/g, " ")
      .replace(/(#\S+)/gi, "") // remove # tags
      .replace("See More", "")
      .replace("…", "")
      .replace("ave", "save")

      .replace(/http/, selectedlink)
      .replace(urlRegex, selectedlink)
      .replace(/0 %/g, "0%")
      .replace(/5 %/g, "5%")
      .replace(/6 %/g, "6%")
      .replace(/7 %/g, "7%")
      .replace("(Code also in comments. Anyone can  use.)", "")
      .replace(/8 %/g, "8%")
      .replace(/9 %/g, "9%")
      .split("Could we now")[0]
      .split("COMMENT")[0]
      .split("JOIN TELEGRAM")[0]
      .split("DROP A HEART")[0]
      .split("Price and availability are accurate")[0]
      .split("This is an Affiliate post")[0]
      .split("𝘓𝘦𝘵 𝘮𝘦 𝘬𝘯𝘰𝘸")[0]
      .trim();

    // let mytextarray = mytext.split(" ");
    // let finaltext = "";
    // for (let p = 0; p < mytextarray.length; p++) {
    //   if (finaltext) break;
    //   if (urlRegex.test(mytextarray[p])) {
    //     if (
    //       mytextarray[p].indexOf("amzn.to") == -1 &&
    //       mytextarray[p].indexOf("amazon.com") == -1
    //     ) {
    //       console.log("13", mytextarray[p]);
    //       mytext = mytext.replace(mytextarray[p], "");
    //     } else if (
    //       mytextarray[p].indexOf("amzn.to") !== -1 ||
    //       mytextarray[p].indexOf("amazon.com") !== -1
    //     ) {
    //       let arraytopossiblyremove = mytext.split([mytextarray[p]]);
    //       let linkrelevanttext = arraytopossiblyremove.shift();
    //       arraytopossiblyremove =
    //         linkrelevanttext +
    //         arraytopossiblyremove
    //           .join("")
    //           .split("\n")
    //           .filter((t) => {
    //             if (/code/gi.test(t) || /%/gi.test(t)) {
    //               return true;
    //             }
    //             return false;
    //           })
    //           .join(" ");

    //       finaltext = arraytopossiblyremove;
    //     }
    //   }
    // }

    // let possibleTextInArray = finaltext
    //   .replace(/\n/g, " ")
    //   .replace(/(#\S+)/gi, "") // remove # tags
    //   .replace("See More", "")
    //   .replace("…", "")
    //   .replace("ave", "save")

    //   .replace(/http/, selectedlink)
    //   .replace(urlRegex, selectedlink)
    //   .replace(/0 %/g, "0%")
    //   .replace(/5 %/g, "5%")
    //   .replace(/6 %/g, "6%")
    //   .replace(/7 %/g, "7%")
    //   .replace(/8 %/g, "8%")
    //   .replace(/9 %/g, "9%")
    //   .split("Could we now")[0]
    //   .split("COMMENT")[0]
    //   .split("JOIN TELEGRAM")[0]
    //   .split("DROP A HEART")[0]
    //   .split("Price and availability are accurate")[0]
    //   .split("This is an Affiliate post")[0]
    //   .split("𝘓𝘦𝘵 𝘮𝘦 𝘬𝘯𝘰𝘸")[0]
    //   .trim();

    reallink = selectedlink;
    //   .split(". ");
    // for (let b = 0; b < possibleTextInArray.length; b++) {
    //   if (possibleTextInArray[b].match(urlRegex)) {
    //     headingList.push(removeEmoji(possibleTextInArray[b]).trim());
    //   }
    // }

    console.log(possibleTextInArray, 124);
    headingList.push(possibleTextInArray);
    break;
  }
  // console.log(headingList);
  return {
    post: headingList[0],
    link: reallink,
  };
}

module.exports = pageScrapeAlgo;
