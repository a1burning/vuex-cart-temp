"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * 1. 在state中定义一个属性记录所有的商品数据
 * 2. 在mutations中添加方法去修改商品数据
 * 3. 在actions中添加方法异步向接口请求数据
 */
// 导入axios
var state = {
  // 记录所有商品
  products: []
};
var getters = {};
var mutations = {
  // 给products赋值
  setProducts: function setProducts(state, payLoad) {
    state.products = payLoad;
  }
};
var actions = {
  // 异步获取商品，第一个是context上下文，解构出来要commit
  getProducts: function getProducts(_ref) {
    var commit, _ref2, data;

    return regeneratorRuntime.async(function getProducts$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            commit = _ref.commit;
            _context.next = 3;
            return regeneratorRuntime.awrap((0, _axios["default"])({
              method: 'GET',
              url: 'http://127.0.0.1:3000/products'
            }));

          case 3:
            _ref2 = _context.sent;
            data = _ref2.data;
            // 将获取的数据将结果存储到state中
            commit('setProducts', data);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    });
  }
};
var _default = {
  namespaced: true,
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions
};
exports["default"] = _default;