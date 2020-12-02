var requestLib = require("request");
const querystring = require("querystring");
const chalk = require("chalk");

/**
 * 参数清理空value的key
 * @param {object} obj
 */
function getParams(obj) {
  if (!obj) return;
  for (let key in obj) {
    let cur = obj[key];
    if (cur === null || cur === undefined) delete obj[key];
  }
  return obj;
}

/**
 * 发送请求
 * @param {string} method
 * @param {object} data
 * @param {object} headers
 * @returns {Promise}
 */
function request(url, method = "POST", data = {}, headers) {
  getParams(data);

  return new Promise((resolve, reject) => {
    let json = JSON.stringify(data);
    method = method.toUpperCase();

    if (method == "GET") {
      if (url.indexOf("?") < 0) url += "?";
      url += querystring.stringify(data);
    }

    const options = {
      method: method,
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json; charset=UTF-8",
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

    function handler(err, resp, body) {
      console.error("error:", err); // Print the error if one occurred
      console.log("statusCode:", resp && resp.statusCode); // Print the response status code if a response was received
      console.log("body:", body);
      if (!err && resp.statusCode == 200) {
        resolve(body);
      } else {
        reject(err);
      }
    }

    if (method == "GET") {
      requestLib(url, handler);
    } else if (method == "POST") {
      requestLib.post(url, { headers: options.headers, json: data }, handler);
    }
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
  return new Promise((resolve) => {
    console.log("requrest>>>", chalk.blue(JSON.stringify(data)));
    request(url, "post", data, headers)
      .then((resp) => {
        let code = resp.code;
        if (code == 0) {
          console.log("response<<<", chalk.green(JSON.stringify(resp)));
        } else {
          console.log("response<<<", chalk.red(JSON.stringify(resp)));
        }
        resolve(resp);
      })
      .catch(() => {});
  });
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
