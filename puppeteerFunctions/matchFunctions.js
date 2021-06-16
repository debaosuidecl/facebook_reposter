function matchPercentageNumber(post) {
  if (!post.match(/(85|86|87|88|89|90)(%| percent)/gi)) {
    return false;
  }

  return true;
}

function matchFree(post) {
  if (!post.match(/free/gi)) {
    return false;
  }

  return true;
}
function matchGlitch(post) {
  if (!post.match(/glitch/gi)) {
    return false;
  }

  return true;
}
function pricingError(post) {
  if (!post.match(/pricing error/gi)) {
    return false;
  }

  return true;
}

function grandMatch(post = "") {
  console.log(
    matchPercentageNumber(post),
    matchFree(post),
    matchGlitch(post),
    pricingError(post)
  );
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
