#! /usr/bin/env node
const path = require("./utils/path");
const { fileWalk } = require("./utils/file");
const {
  addApp,
  addEnv,
  addNameSpace,
  addServer,
  addVersion,
} = require("./api");
const { program } = require("commander");
const fs = require("fs");

const $rootPath = process.cwd();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

if (process.argv.length === 2) {
  addConfig();
  return;
}

program
  .option("-p, --path <pathName>", "指定路径")
  .option("-ev --envVersion <env> <version>", "指定evn和版本号")
  .option("-v, --packageVersion", "显示本工具版本号")
  .on("--help", () => {
    console.log();
    console.log("客户端配置文件转化工具");
    console.log("默认值 evn[local] version[1.0.0]");
  })
  .parse(process.argv);

if (program.path) {
  addConfig(program.path);
  // addVersion("Zeus", "common", "1", "local", "1.0.0", '["a","b"]');
} else if (program.packageVersion) {
  showPackageVerion();
} else if (program.envVersion) {
  let env = program.envVersion;
  let version = program.args[0];
  addConfig(null, env, version);
}

/**
 * 显示包版本号
 */
function showPackageVerion() {
  const version = require("./package.json").version;
  console.log(`mqmj_cli version: ${chalk.green(version)}`);
}
/**
  ErrorOk                  = iota //0 成功
	ErrorReqArgs                    //1 请求参数错误
	ErrorReqFail                    //2 请求失败
	ErrorRedisFail                  //3 Redis操作失败
	ErrorSpaceExist                 //4 命名空间已存在
	ErrorSpaceNotExist              //5 命名空间不存在
	ErrorSpaceNotEmpty              //6 命名空间不为空
	ErrorAppExist                   //7 微服务已存在
	ErrorAppNotExist                //8 微服务不存在
	ErrorAppNotEmpty                //9 微服务不为空
	ErrorServerExist                //10 服务项已存在
	ErrorServerNotExist             //11 服务项不存在
	ErrorServerNotEmpty             //12 服务项不为空
	ErrorEnvExist                   //13 环境已存在
	ErrorEnvNotExist                //14 环境不存在
	ErrorEnvNotEmpty                //15 环境不为空
	ErrorVersionExist               //16 版本已存在
	ErrorVersionNotExist            //17 版本不存在
	ErrorJsonFail                   //18 json转换失败
	ErrorDataType                   //19 数据格式错误
	ErrorSubscribeFail              //20 订阅失败
  ErrorCancelSubscribeFail        //21 取消订阅失败 
  * @param {string} subDir
  * @param {string} env
  * @param {string} version
*/
async function addConfig(subDir, env, version) {
  subDir = subDir || "";
  let dir = path.resolve(path.join($rootPath, subDir));
  let node = {};
  fileWalk(dir, node, node.children);

  console.log("%o", node);

  env = env || "local";
  version = version || "1.0.0";

  for (let space in node) {
    let spaceObj = node[space];
    await addNameSpace(space);
    for (let app in spaceObj) {
      let appObj = spaceObj[app];
      await addApp(space, app);
      for (let json in appObj) {
        if (json.indexOf(".json") < 0) continue;
        let jsonPath = appObj[json];
        let server = path.basename(json, ".json");
        let data = fs.readFileSync(jsonPath, "utf8");
        await addServer(space, app, server);
        await addEnv(space, app, server, env);
        await addVersion(space, app, server, env, version, data);
      }
    }
  }
}
