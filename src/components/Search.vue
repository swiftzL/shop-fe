<template>
  <div>
    <div class="container">
      <i-input v-model="sreachData" size="large" class="sreach" placeholder="输入你想查找的商品">
        <Button slot="append" icon="ios-search" @click="sreach"></Button>
      </i-input>
      <Tag v-for="(item, index) in promotionTags" :key="index" closable  @on-close="closeTags(index)">
        <router-link :to="{path:'goodsDetail', query:{bookid:item.bid}}">
          <span >{{item.bookname}}</span></router-link></Tag>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Search',
  data () {
    return {
      sreachData: '',
      promotionTags: []
    };
  },
  
  created(){
    
    const res =  this.$http.get("book/seckill").then((res)=>{
      this.promotionTags = res.data.obj;
      
    })
  },
  methods: {
    closeTags (index) {
      this.promotionTags.splice(index, 1);
    },
    selectTags (index) {
      this.sreachData = this.promotionTags[index];
    },
    sreach () {
      this.$router.push({path: '/goodsList', query: { sreachData: this.sreachData }});
    }
  }
};
</script>

<style scoped>
.container {
  padding-top: 15px;
  margin: 0px auto;
  margin-bottom: 15px;
  width: 460px;
}
.sreach {
  margin: 5px 0px;
}
</style>
