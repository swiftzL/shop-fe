<template>
  <div>
    <Search></Search>
    <GoodsListNav></GoodsListNav>
    <div class="container">
      
     
      <!-- 商品展示容器 -->
      <div class="goods-box">
        
        <div class="goods-list-box">
          
          <div class="goods-list">
            <div class="goods-show-info" v-for="(item, index) in booklist" :key="index">
              <div class="goods-show-img">
                <router-link :to="{path:'goodsDetail', query:{bookid:item.bid}}"><img :src="item.bookimage" width="250px" height="400px" /></router-link>
              </div>
              <div class="goods-show-price">
                <span>
                  <Icon type="social-yen text-danger"></Icon>
                  <span class="seckill-price text-danger">{{item.bookprice}}</span>
                </span>
              </div>
              <div class="goods-show-detail">
                <span>{{item.intro}}</span>
              </div>
              <div class="goods-show-num">
                已有<span>{{item.remarks}}</span>人评价
              </div>
              <div class="goods-show-seller">
                <span>{{item.bookname}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="goods-page">
        <Page :page-size-opts=[12,24] show-total=true :page-size=pageinfo.pageSize :current=pageinfo.pageNum 
        :total=pageinfo.total @on-change="handlePage" @on-page-size-change='handlePageSize' show-sizer></Page>
      </div>
    </div>
    <Spin size="large" fix v-if="isLoading"></Spin>
  </div>
</template>

<script>
import Search from '@/components/Search';
import GoodsListNav from '@/components/nav/GoodsListNav';
import GoodsClassNav from '@/components/nav/GoodsClassNav';
import store from '@/vuex/store';
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';
export default {
  name: 'GoodsList',
  beforeRouteEnter (to, from, next) {
    window.scrollTo(0, 0);
    next();
  },
  data () {
    return {
      booklist:{},
      pageinfo:{}
    };
  },
  watch: {
            '$route': function (){
                this.$router.go(0); //刷新页面
            }
},
  created() {
    this.typeid = this.$route.query.typeid
    this.pagenum = 1
    this.pagesize = 12
    this.findBook()
  },
  computed: {
    ...mapState(['asItems', 'isLoading']),
    ...mapGetters(['orderGoodsList'])
  },
  methods: {
    handlePage(value){
        this.pagenum = value
        this.findBook()
    },
    handlePageSize(value) {
      this.pagesize = value
      this.findBook()
    },
    findBook(){
      const res =  this.$http.get("book/findByTid",{
      params:{
        tid:this.typeid,
        pagenum:this.pagenum,
        pagesize:this.pagesize
      }
    }).then((res)=>{
      this.pageinfo = res.data.obj
      this.booklist = res.data.obj.list
    })
    },
    orderBy (data, index) {
      console.log(data);
      this.icon = [ 'arrow-down-a', 'arrow-down-a', 'arrow-down-a' ];
      this.isAction = [ false, false, false ];
      this.isAction[index] = true;
      this.icon[index] = 'arrow-up-a';
      this.SET_GOODS_ORDER_BY(data);
    },
    
  },
  mounted () {
    this.searchItem = this.$route.query.sreachData;
  },
  components: {
    Search,
    GoodsListNav,
    GoodsClassNav
  },
  store
};
</script>

<style scoped>
.container {
  margin: 15px auto;
  width: 93%;
  min-width: 1000px;
}
.text-danger {
  color: #A94442;
}
.seckill-price{
  margin-right: 5px;
  font-size: 25px;
  font-weight: bold;
}
.goods-box {
  display: flex;
}
/* ---------------侧边广告栏开始------------------- */
.as-box {
  width: 200px;
  border: 1px solid #ccc;
}
.item-as-title{
  width: 100%;
  height: 36px;
  color: #B1191A;
  line-height: 36px;
  font-size: 18px;
}
.item-as-title span:first-child{
  margin-left: 20px;
}
.item-as-title span:last-child{
  float: right;
  margin-right: 15px;
  font-size: 10px;
  color: #ccc;
}
.item-as{
  width: 160px;
  margin: 18px auto;
}
.item-as-img{
  width: 160px;
  height: 160px;
  margin: 0px auto;
}
.item-as-price span{
  font-size: 18px;
}
.item-as-intro{
  margin-top: 5px;
  font-size: 12px;
}
.item-as-selled{
  margin-top: 5px;
  font-size: 12px;
}
.item-as-selled span{
  color: #005AA0;
}
/* ---------------侧边广告栏结束------------------- */

/* ---------------商品栏开始------------------- */
.goods-list-box {
  margin-left: 15px;
  width: calc(100% - 215px);
}
.goods-list-tool{
  width: 100%;
  height: 38px;
  border: 1px solid #ccc;
  background-color: #F1F1F1;
}
.goods-list-tool ul{
  padding-left: 15px;
  list-style: none;
}
.goods-list-tool li{
  cursor: pointer;
  float: left;
}
.goods-list-tool span{
  padding: 5px 8px;
  border: 1px solid #ccc;
  border-left: none;
  line-height: 36px;
  background-color: #fff;
}
.goods-list-tool span:hover{
  border: 1px solid #E4393C;
}
.goods-list-tool i:hover{
  color: #E4393C;
}
.goods-list-tool-active {
  color: #fff;
  border-left: 1px solid #ccc;
  background-color: #E4393C !important;
}

.goods-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.goods-show-info{
  width: 240px;
  padding: 40px;
  margin: 15px 50px;
  border: 5px solid #fff;
  cursor: pointer;
}
.goods-show-info:hover{
  border: 1px solid #ccc;
  box-shadow: 0px 0px 15px #ccc;
}
.goods-show-price{
  margin-top: 6px;
}
.goods-show-detail{
  font-size: 12px;
  margin: 6px 0px;
}
.goods-show-num{
  font-size: 12px;
  margin-bottom: 6px;
  color: #009688;
}
.goods-show-num span{
  color: #005AA0;
  font-weight: bold;
}
.goods-show-seller{
  font-size: 12px;
  color:#E4393C;
}
.goods-page {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
/* ---------------商品栏结束------------------- */
</style>
