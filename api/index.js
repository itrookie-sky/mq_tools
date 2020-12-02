const { post } = require("../plugs/request");

const url = "http://39.106.156.29:9000/config_server";
// const url = "https://192.168.1.170:9000/config_server";
/**
 * 添加命名空间
 * @param {string} space
 */
function addNameSpace(space) {
  return post(url, {
    api: "add_namespace",
    awlArgs: { space: space },
  });
}

/**
 * 添加微服务 app
 * @param {string} space
 * @param {string} app
 */
function addApp(space, app) {
  return post(url, {
    api: "add_app",
    awlArgs: { space: space, app: app },
  });
}

/**
 * 添加服务项 server
 * @param {string} space
 * @param {string} app
 * @param {string} server
 */
function addServer(space, app, server) {
  return post(url, {
    api: "add_server",
    awlArgs: { space: space, app: app, server: server },
  });
}

/**
 * 添加环境 env
 * @param {string} space
 * @param {string} app
 * @param {string} server
 * @param {string} env （本地 local、杭州 hz、联合 union、预上线 pre、正式 prod）
 */
function addEnv(space, app, server, env) {
  return post(url, {
    api: "add_env",
    awlArgs: { space: space, app: app, server: server, env: env },
  });
}

/**
 * 添加版本 version
 * @param {string} space
 * @param {string} app
 * @param {string} server
 * @param {string} env
 * @param {string} version
 * @param {string} data
 */
function addVersion(space, app, server, env, version, data, api) {
  return post(url, {
    api: api || "add_version",
    awlArgs: {
      space: space,
      app: app,
      server: server,
      env: env,
      version: version,
      data: data,
    },
  });
}

/**
 * 更新版本 version
 * @param {string} space
 * @param {string} app
 * @param {string} server
 * @param {string} env
 * @param {string} version
 * @param {string} data
 */
function updateVersion(space, app, server, env, version, data) {
  return addVersion(space, app, server, env, version, data, "update_version");
}

exports.addNameSpace = addNameSpace;
exports.addApp = addApp;
exports.addServer = addServer;
exports.addEnv = addEnv;
exports.addVersion = addVersion;
exports.updateVersion = updateVersion;
