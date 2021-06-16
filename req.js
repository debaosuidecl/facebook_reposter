const axios = require("axios");
(async () => {
  console.time("retrieve");
  try {
    let res = await axios.get("https://amzn.to/3iJaTWS?tag=rios0f76-20");
    // console.log(res)

    // res.data = "";

    console.log(res.request.path, "path");
    // console.log(data);
  } catch (error) {
    // console.log(error);
    console.log(error.response.request.path, "13");
  }

  console.timeEnd("retrieve");
})();
