<template>
  <div class="info-form">
    
    <Form ref="formValidate" :model="formValidate" :label-width="80" :rules="ruleValidate">
      <FormItem label="用户名" prop="username">
          <i-input v-model="formValidate.username" clearable size="large"  placeholder="请输入手机号"></i-input>
      </FormItem>
      <FormItem label="密码" prop="password">
          <i-input v-model="formValidate.password" clearable size="large"  type="password" placeholder="请输入手机号"></i-input>
      </FormItem>
      <FormItem label="手机号" prop="">
          <i-input v-model="formValidate.phone" clearable size="large"  placeholder="请输入手机号"></i-input>
      </FormItem>
      <FormItem label="验证码" prop="checkNum">
          <i-input v-model="formValidate.phone_code" size="large"  placeholder="请输入验证码">
            <Button slot="append" @click="getcheckNum">获取验证码</Button>
          </i-input>
      </FormItem>
      <FormItem label="图片验证码" prop="">
        <img src="http://localhost:8080/user/getCode" 
        onclick="this.src='http://localhost:8080/user/getCode?s='+Math.random()"/>
          <i-input v-model="formValidate.code" clearable size="large"  placeholder="请输入图形验证码">
          </i-input>
      </FormItem>
      <FormItem label="收货地址" >
          <i-input v-model="formValidate.address" clearable size="large"  placeholder=""></i-input>
      </FormItem>
      
      <Button type="error" size="large" long @click="handleSubmit('formValidate')">注册</Button>
    </Form>
  </div>
</template>

<script>
import store from '@/vuex/store';
import { mapMutations } from 'vuex';
export default {
  name: 'CheckPhone',
  data () {
    return {
      formValidate: {
       
      },
      ruleValidate: {
        phone: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { type: 'string', pattern: /^1[3|4|5|7|8][0-9]{9}$/, message: '手机号格式出错', trigger: 'blur' }
        ],
        checkNum: [
          { required: true, message: '必须填写验证码', trigger: 'blur' },
          { type: 'string', min: 4, max: 4, message: '验证码长度错误', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    ...mapMutations(['SET_SIGN_UP_SETP']),
    getcheckNum () {
      if (this.formValidate.phone.length === 11) {
        this.$Message.success({
          content: '验证码为: 1234',
          duration: 6,
          closable: true
        });
      } else {
        this.$Message.error({
          content: '请输入正确的手机号',
          duration: 6,
          closable: true
        });
      }
    },
    handleSubmit (name) { // 提交验证
      console.log(this.formValidate);
    }
  },
  store
};
</script>

<style scoped>
.info-form {
  width: 90% !important;

}
</style>
