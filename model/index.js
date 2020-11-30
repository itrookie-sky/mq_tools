class BaseData {
  constructor(info) {
    this.update(info);
  }

  update(info) {
    if (!info) return;
    for (let key in info) {
      Object.defineProperty(this, key, {
        value: info[key],
        configurable: true,
      });
    }
  }
}

/**请求参数 */
class AwlArgs extends BaseData {
  constructor(info) {
    super();
    this.update(info);
  }
  /**
   * 可选项	命名空间（品牌）
   * @type {string}
   */
  space;
  /**
   * 可选项	微服务(功能)
   * @type {string}
   */
  app;
  /**
   * 可选项	服务项(配置名字)，不选则视为获取功能下的所有配置文件
   * @type {string}
   */
  server;
  /**
   * 可选项	环境（本地 local、杭州 hz、联合 union、预上线 pre、正式 prod）
   * @type {string}
   */
  env;
  /**
   * 可选项	版本
   * @type {string}
   */
  version;
  /**
   * 可选项	配置数据
   * @type {string} json
   */
  data;
}

exports.BaseData = BaseData;
exports.AwlArgs = AwlArgs;
