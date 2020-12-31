const state = {
  // 记录购物车商品数据
  // 从本地获取购物车商品数据，如果没有初始化为空数组
  cartProducts: JSON.parse(window.localStorage.getItem('cart-products')) || []
}
const getters = {
  // 接收state为参数，返回结果
  totalCount (state) {
    // 返回数组中某个元素的和，用reduce方法
    // reduce方法接收两个参数，第一个参数是函数，第二个参数是起始数(这里从0开始)
    // 函数内部接收两个参数，第一个参数是求和变量，第二个数组的元素
    return state.cartProducts.reduce((sum, prod) => sum + prod.count, 0)
  },
  totalPrice () {
    return state.cartProducts.reduce((sum, prod) => sum + Number(prod.totalPrice), 0).toFixed(2)
  },
  // 选中的商品数量
  checkedCount (state) {
    // 返回前判断是否是选中状态，如果是就进行添加，并且返回sum
    return state.cartProducts.reduce((sum, prod) => {
      if (prod.isChecked) {
        sum += prod.count
      }
      return sum
    }, 0)
  },
  // 选中的商品价格，同理上面
  checkedPrice () {
    return state.cartProducts.reduce((sum, prod) => {
      if (prod.isChecked) {
        sum += Number(prod.totalPrice)
      }
      return sum
    }, 0).toFixed(2)
  }
}
const mutations = {
  // 第二个是payLoad，传过来的商品对象
  addToCart (state, product) {
    // 1. 没有商品时把该商品添加到数组中，并增加count，isChecked，totalPrice
    // 2. 有该商品时把商品数量加1，选中，计算小计
    // 判断有没有该商品，返回该商品
    const prod = state.cartProducts.find(item => item.id === product.id)
    if (prod) {
      // 该商品数量+1
      prod.count++
      // 选中
      prod.isChecked = true
      // 小计 = 数量 * 单价
      prod.totalPrice = (prod.count * prod.price).toFixed(2)
      console.log(prod.totalPrice)
    } else {
      // 给商品列表添加一个新商品
      state.cartProducts.push({
        // 原来products的内容
        ...product,
        // 数量
        count: 1,
        // 选中
        isChecked: true,
        // 小计为当前单价
        totalPrice: product.price
      })
    }
  },
  // 删除购物车商品，第二个参数是商品id
  deleteFromCart (state, prodId) {
    // 使用数组的findIndex获取索引
    const index = state.cartProducts.findIndex(item => item.id === prodId)
    // 判断这个是不是等于-1，如果不是说明有这个商品，就执行后面的删除该元素
    // splice接收删除元素的索引，第二个元素是删除几个元素，这里写1
    index !== -1 && state.cartProducts.splice(index, 1)
  },
  // 改变所有商品的isChecked属性
  // 需要两个参数，第二个是checkbox的状态
  updateAllProductChecked (state, checked) {
    // 给每个商品的isChecked属性为checkbox状态
    state.cartProducts.forEach(prod => {
      prod.isChecked = checked
    })
  },
  // 改变某个商品的isChecked属性
  // 需要两个属性，第二个是商品对象，这里是解构，一个是checked，一个是id
  updateProductChecked (state, {
    checked,
    prodId
  }) {
    // 找到对应id的商品对象
    const prod = state.cartProducts.find(item => item.id === prodId)
    // 如果商品对象存在就给其isChecked进行赋值
    prod && (prod.isChecked = checked)
  },
  // 更新商品，把商品id和count进行解构
  updateProduct (state, { prodId, count }) {
    // 找到当前商品
    const prod = state.cartProducts.find(prod => prod.id === prodId)
    // 如果找到了就更新数量和总价
    if (prod) {
      prod.count = count
      prod.totalPrice = (count * prod.price).toFixed(2)
    }
  }
}
const actions = {}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
