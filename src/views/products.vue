<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item><a href="#/">首页</a></el-breadcrumb-item>
      <el-breadcrumb-item><a href="#/">商品列表</a></el-breadcrumb-item>
    </el-breadcrumb>
    <el-table
      :data="products"
      style="width: 100%">
      <el-table-column
        prop="title"
        label="商品">
      </el-table-column>
      <el-table-column
        prop="price"
        label="价格">
      </el-table-column>
      <el-table-column
        prop="address"
        label="操作">
        <!-- 这一行可以通过插槽获取作用域数据 -->
        <!-- <template slot-scope="scope"> -->
        <template v-slot="scope">
          <el-button @click="addToCart(scope.row)">加入购物车</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// 导入需要的模块
import { mapActions, mapMutations, mapState } from 'vuex'
export default {
  name: 'ProductList',
  // 创建计算属性，映射products数据，因为开启了命名空间，这里添加了命名空间的写法，后面是映射的属性products
  computed: {
    ...mapState('products', ['products'])
  },
  // 把actions里面的方法映射进来，第一个依旧是命名空间的写法
  methods: {
    ...mapActions('products', ['getProducts']),
    ...mapMutations('cart', ['addToCart'])
  },
  // 组件创建之后调用getProducts获取数据
  created () {
    this.getProducts()
  }
}
</script>

<style></style>
