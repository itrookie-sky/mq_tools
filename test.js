const { post } = require("./plugs/request");
const lypartnerUrl = "https://laoyoutest.bflyzx.com:34566/general_greatwall";
/**api测试发送参数 */
const data = {
  mod: "pixiu",
  fun: "login",
  args: {
    telphone: "12344444444",
  },
};

function testPost() {
  return post(lypartnerUrl, data);
}

// testPost().then((resp) => {
//   console.log(resp);
// });

exports.testPost = testPost;
