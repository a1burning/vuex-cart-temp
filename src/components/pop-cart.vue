<template>
  <el-popover
    width="350"
    trigger="hover"
  >
  <!-- 这里是cartProducts的数据，不需要修改 -->
    <el-table :data="cartProducts" size="mini">
      <el-table-column property="title" width="130" label="商品"></el-table-column>
      <el-table-column property="price" label="价格"></el-table-column>
      <el-table-column property="count" width="50" label="数量"></el-table-column>
      <el-table-column label="操作">
        <!-- 获取当前元素的id，添加slot插槽 -->
        <template v-slot="scope">
          <el-button size="mini" @click="deleteFromCart(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div>
      <!-- 总数和总量也改成插值表达式 -->
      <p>共 {{ totalCount }} 件商品 共计¥{{ totalPrice }}</p>
      <el-button size="mini" type="danger" @click="$router.push({ name: 'cart' })">去购物车</el-button>
    </div>
    <!-- 徽章这里，将value修改成totalCount -->
    <el-badge :value="totalCount" class="item" slot="reference">
      <el-button type="primary">我的购物车</el-button>
    </el-badge>
  </el-popover>
</template>

<script>
// 导入vuex模块
import { mapGetters, mapMutations, mapState } from 'vuex'
export default {
  name: 'PopCart',
  computed: {
    // 把cart模块中的cartProducts导入
    ...mapState('cart', ['cartProducts']),
    // 把cart模块中的totalCount和totalPrice导入
    ...mapGetters('cart', ['totalCount', 'totalPrice'])
  },
  methods: {
    // 把cart模块中的deleteFromCart映射到methods中
    ...mapMutations('cart', ['deleteFromCart'])
  }
}
</script>

<style>

</style>
