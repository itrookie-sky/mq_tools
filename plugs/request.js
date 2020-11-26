const https = require("https");
const querystring = require("querystring");

/**
 * 发送请求
 * @param {string} method
 * @param {object} data
 * @param {object} headers
 * @returns {Promise}
 */
function request(url, method = "POST", data = {}, headers) {
  return new Promise((resolve, reject) => {
    let json = JSON.stringify(data);
    method = method.toLowerCase();

    if (method == "GET") {
      if (url.indexOf("?") < 0) url += "?";
      url += querystring.stringify(data);
    }

    const options = {
      method: method,
      headers: {
        "Content-Type": "application/json",
        "Content-Length": json.length,
      },
    };

    if (headers) {
      for (let key in headers) {
        let value = headers[key];
        if (value != null && value != undefined) {
          options.headers[key] = value;
        }
      }
    }

    const req = https.request(url, options, (res) => {
      //   console.log(`status_code:${res.statusCode}`);

      res.on("data", (d) => {
        resolve(JSON.parse(d.toString()));
      });
    });

    req.on("error", (error) => {
      reject(error);
    });

    req.write(json);
    req.end();
  });
}

/**
 * POST请求
 * @param {string} url
 * @param {object} data
 * @param {object} headers
 * @returns {Promise}
 */
function post(url, data, headers) {
  return request(url, "post", data, headers);
}

/**
 * GET请求
 * @param {string} url
 * @param {object} data
 * @param {object} headers
 * @returns {Promise}
 */
function get(url, data, headers) {
  return request(url, "get", data, headers);
}

exports.request = request;
exports.post = post;
exports.get = get;
