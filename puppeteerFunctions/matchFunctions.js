function matchPercentageNumber(post = "") {
  if (!post.match(/(85|86|87|88|89|90)(%| percent)/gi)) {
    return false;
  }

  return true;
}

function matchFree(post = "") {
  if (!post.match(/free/gi)) {
    return false;
  }

  return true;
}
function matchGlitch(post = "") {
  if (!post.match(/glitch/gi)) {
    return false;
  }

  return true;
}
function pricingError(post = "") {
  if (!post.match(/pricing error/gi)) {
    return false;
  }

  return true;
}

function buyonegetonefree(post = "") {
  if (
    post.match(/𝐁𝐔𝐘 𝐎𝐍𝐄 𝐆𝐄𝐓 𝐎𝐍𝐄 𝐅𝐑𝐄𝐄/g) ||
    post.replace(/"  "/g, " ").match(/buy one get one free/gi)
  ) {
    return true;
  }

  return false;
}

function invitelinks(post = "") {
  if (
    post.match(/t.me/g) ||
    post.replace(/"  "/g, " ").match(/buy one get one free/gi)
  ) {
    return true;
  }

  return false;
}

function grandMatch(post = "") {
  console.log(
    matchPercentageNumber(post || ""),
    matchFree(post || ""),
    matchGlitch(post || ""),
    pricingError(post || ""),
    buyonegetonefree(post || "")
  );

  if (buyonegetonefree(post)) {
    console.log("buyone get one free");
    return false;
  }

  if (
    matchPercentageNumber(post) ||
    matchFree(post) ||
    matchGlitch(post) ||
    pricingError(post)
  ) {
    return true;
  }

  return false;
}

module.exports = {
  matchPercentageNumber,
  matchFree,
  matchGlitch,
  grandMatch,
  pricingError,
};
