<template>
<!-- 登录页面 -->
  <div>
    <Row class="container">
      <i-col span="13" offset="2" class="login-img-box">
        <img src="static/img/sale.jpg" alt="">
      </i-col>
      <i-col span="7" class="login-box">
        <div class="login-container">
          <div class="login-header">
            <p>欢迎登录</p>
          </div>
          <div class="form-box">
            <Form ref="formInline" :model="formDate" :rules="ruleInline">
              <FormItem prop="username">
                  <i-input type="text" v-model="formDate.username" clearable size="large" placeholder="用户名">
                      <Icon type="person" slot="prepend"></Icon>
                  </i-input>
              </FormItem>
              <FormItem prop="password">
                  <i-input type="password" v-model="formDate.password" clearable size="large" placeholder="密码">
                      <Icon type="ios-locked-outline" slot="prepend"> </Icon>
                  </i-input>
              </FormItem>
              <FormItem prop="phone">
        <img src="http://localhost:8080/user/getCode" 
        onclick="this.src='http://localhost:8080/user/getCode?s='+Math.random()"/>
          <i-input v-model="formDate.code" clearable size="large"  placeholder="请输入图形验证码">
          </i-input>
      </FormItem>
              
              <FormItem>
                  <Button type="error" size="large" @click="handleSubmit('formInline')" long>登录</Button>
              </FormItem>
          </Form>
          </div>
        </div>
      </i-col>
    </Row>
  </div>
</template>

<script>
import store from '@/vuex/store';
import { mapMutations, mapActions } from 'vuex';
import Qs from 'qs';
export default {
  name: 'Login',
  data () {
    return {
      formDate: {
        
      },
      ruleInline: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { type: 'string', min: 6, message: '密码不能少于6位', trigger: 'blur' }
        ]
      }
    };
  },

  methods: {
    ...mapMutations(['SET_USER_LOGIN_INFO']),
    ...mapActions([]),
    handleSubmit (name) {
      // this.$http.get("alipay/pay",Qs.stringify(data)).then(res =>{
      //    this.$store.state.userInfo.username=res.data.obj.username
      //  })
      // location.href = 'http://119.23.25.226:8080/alipay/pay'
      let data = {
        username: this.formDate.username,
        password: this.formDate.password,
        code: this.formDate.code
      }
      let userInfo = {
          username: ''
        }
      this.$http.post("user/login",Qs.stringify(data)).then(res => {
        if(res.data.code == 200){
            userInfo.username = res.data.obj.username
        this.$store.commit('SET_USER_LOGIN_INFO',userInfo)
        this.$router.push('/')
        }
        
        
      })
       
      
     
     
      

       
      const father = this;
      
      
    }
  },
  store
};
</script>

<style scoped>
.container {
  margin-top: 30px;
  height: 600px;
  background-color: #fff;
}
.login-img-box {
  height: 485px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login-img-box>img {
  width: 68%;
}
.login-box {
  height: 485px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login-container {
  width: 80%;
  height: px;
  border: #ED3F14 solid 1px;
}
.login-header {
  height: 50px;
  font-size: 20px;
  text-align: center;
  line-height: 50px;
  letter-spacing: 5px;
  color: #fff;
  background-color: #ED3F14;
}
.form-box {
  width: 80%;
  margin: 30px auto;
}
</style>
