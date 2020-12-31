/**
 * 1. 在state中定义一个属性记录所有的商品数据
 * 2. 在mutations中添加方法去修改商品数据
 * 3. 在actions中添加方法异步向接口请求数据
 */
// 导入axios
import axios from 'axios'
const state = {
  // 记录所有商品
  products: []
}
const getters = {}
const mutations = {
  // 给products赋值
  setProducts (state, payLoad) {
    state.products = payLoad
  }

}
const actions = {
  // 异步获取商品，第一个是context上下文，解构出来要commit
  async getProducts ({ commit }) {
    // 请求接口
    const { data } = await axios({
      method: 'GET',
      url: 'http://127.0.0.1:3000/products'
    })
    // 将获取的数据将结果存储到state中
    commit('setProducts', data)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
