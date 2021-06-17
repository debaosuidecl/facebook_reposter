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

    let possibleTextInArray = document
      .querySelectorAll(`.dati1w0a.ihqw7lf3.hv4rvrfc.ecm0bbzt`)
      [i].innerText.replace(/\n/g, " ")
      .replace(/(#\S+)/gi, "") // remove # tags
      .replace("See More", "")
      .replace("…", "")
      .replace("ave", "save")

      .replace(/http/, selectedlink)
      .replace(urlRegex, selectedlink)
      .replace()
      .split("Could we now")[0]
      .split("COMMENT")[0]
      .split("Price and availability are accurate")[0]
      .split("This is an Affiliate post")[0]
      .trim();

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
