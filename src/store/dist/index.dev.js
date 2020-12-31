"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vuex = _interopRequireDefault(require("vuex"));

var _products = _interopRequireDefault(require("./modules/products"));

var _cart = _interopRequireDefault(require("./modules/cart"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].use(_vuex["default"]);

var myPlugin = function myPlugin(store) {
  // 当store初始化后调用
  store.subscribe(function (mutation, state) {
    // mutation 的格式为 { type, payload }
    // type里面的格式是cart/cartProducts
    // state 的格式为 { cart, products }
    if (mutation.type.startsWith('cart/')) {
      // 本地存储cartProducts
      window.localStorage.setItem('cart-products', JSON.stringify(state.cart.cartProducts));
    }
  });
};

var _default = new _vuex["default"].Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    products: _products["default"],
    cart: _cart["default"]
  },
  plugins: [myPlugin]
});

exports["default"] = _default;