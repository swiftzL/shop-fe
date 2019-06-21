<template>
  <div>
    <Table border ref="selection" :columns="columns" :data="Cart" size="large" no-data-text="您的购物车没有商品，请先添加商品到购物车再点击购买"></Table>
    <div class="go-to">
      <Button @click="goTo" type="primary">去付款</Button>
    </div>
  </div>
</template>

<script>
import store from '@/vuex/store';
import { mapState, mapActions } from 'vuex';
export default {
  name: 'MyShoppingCart',
  data () {
    return {
      Cart: [],
      columns: [
        {
          type: 'selection',
          width: 58,
          align: 'center'
        },
        {
          title: '图片',
          key: 'bookimg',
          width: 86,
          render: (h, params) => {
            return h('div', [
              h('img', {
                attrs: {
                  height: "80px",
                  src: params.row.bookimg
                }
              })
            ]);
          },
          align: 'center'
        },
        {
          title: '标题',
          key: 'bookname',
          align: 'center'
        },
        {
          title: '数量',
          key: 'number',
          width: 68,
          align: 'center'
        },
        {
          title: '价格',
          width: 68,
          key: 'bookprice',
          align: 'center'
        }
      ]
    };
  },
  created () {
    this.loadShoppingCart();
     //获取购物车
    this.$http.get("car/getCar").then(res => {
      this.Cart = res.data.obj
      console.log(res.data)
    })
  },
  computed: {
    ...mapState(['shoppingCart'])
  },
  methods: {
    ...mapActions(['loadShoppingCart']),
    goTo () {
      this.$router.push('/order');
    }
  },
  store
};
</script>

<style scoped>
.go-to {
  margin: 15px;
  display: flex;
  justify-content: flex-end;
}
</style>
