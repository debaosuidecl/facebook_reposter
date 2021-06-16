// @ts-nocheck
async function pageScrapeAlgo() {
  function removeEmoji(str) {
    let strCopy = str;
    const emojiKeycapRegex = /[\u0023-\u0039]\ufe0f?\u20e3/g;
    const emojiRegex = /\p{Extended_Pictographic}/gu;
    const emojiComponentRegex = /\p{Emoji_Component}/gu;
    if (emojiKeycapRegex.test(strCopy)) {
      strCopy = strCopy.replace(emojiKeycapRegex, "");
    }
    if (emojiRegex.test(strCopy)) {
      strCopy = strCopy.replace(emojiRegex, "");
    }
    if (emojiComponentRegex.test(strCopy)) {
      // eslint-disable-next-line no-restricted-syntax
      for (const emoji of strCopy.match(emojiComponentRegex) || []) {
        if (/[\d|*|#]/.test(emoji)) {
          continue;
        }
        strCopy = strCopy.replace(emoji, "");
      }
    }

    return strCopy;
  }
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
  headerloop: for (let i = 0; i < headings.length; i++) {
    const linksforthisheading = headings[i].querySelectorAll("a");

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

      selectedlink = possibleamazonlink.split("?")[0] + "?tag=rios0f76-20";
    }

    if (!selectedlink) {
      continue;
    }

    let possibleTextInArray = headings[i].innerText
      .replace(/\n/g, " ")
      .replace(/(#\S+)/gi, "") // remove # tags
      .replace("See More", "")
      .replace("…", "")
      .replace("ave", "save")
      .trim()
      .replace(/http/, selectedlink)
      .replace(urlRegex, selectedlink)
      .split("Could we now")[0];
    //   .split(". ");
    // for (let b = 0; b < possibleTextInArray.length; b++) {
    //   if (possibleTextInArray[b].match(urlRegex)) {
    //     headingList.push(removeEmoji(possibleTextInArray[b]).trim());
    //   }
    // }
    headingList.push(possibleTextInArray);
    break;
  }
  console.log(headingList);
  return headingList[0];
}

module.exports = pageScrapeAlgo;
