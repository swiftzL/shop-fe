<template>
  <div class="info-form">
    <Form ref="formValidate" :model="formValidate" :label-width="80" :rules="ruleValidate">
      <FormItem label="用户名" prop="username">
        <i-input v-model="formValidate.username" clearable size="large" placeholder=""></i-input>
      </FormItem>
      <FormItem label="密码" prop="password">
        <i-input
          v-model="formValidate.password"
          clearable
          size="large"
          type="password"
          placeholder=""
        ></i-input>
      </FormItem>
      <FormItem label="手机号" prop>
        <i-input v-model="formValidate.phone" clearable size="large" placeholder=""></i-input>
      </FormItem>
      <FormItem label="验证码" prop="checkNum">
        <i-input v-model="formValidate.phonecode" size="large" placeholder="">
          <Button slot="append" @click="getcheckNum">获取验证码</Button>
        </i-input>
      </FormItem>
      <Upload :on-success="handleSuccess" action="//jsonplaceholder.typicode.com/posts/">
        <Button icon="ios-cloud-upload-outline">Upload files</Button>
    </Upload>
      <FormItem label="图片验证码" prop>
        <img
          src="http://localhost:8080/user/getCode"
          onclick="this.src='http://localhost:8080/user/getCode?s='+Math.random()"
        >
        <i-input v-model="formValidate.code" clearable size="large" placeholder="请输入图形验证码"></i-input>
      </FormItem>
      <FormItem label="收货地址">
        <i-input v-model="formValidate.address" clearable size="large" placeholder></i-input>
      </FormItem>

      <Button type="error" size="large" long @click="handleSubmit('formValidate')">注册</Button>
    </Form>
  </div>
</template>

<script>
import store from "@/vuex/store";
import { mapMutations } from "vuex";
import Qs from 'qs';
export default {
  name: "CheckPhone",
  data() {
    return {
      formValidate: {},
      ruleValidate: {
        phone: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          {
            type: "string",
            pattern: /^1[3|4|5|7|8][0-9]{9}$/,
            message: "手机号格式出错",
            trigger: "blur"
          }
        ],
        checkNum: [
          { required: true, message: "必须填写验证码", trigger: "blur" },
          {
            type: "string",
            min: 4,
            max: 4,
            message: "验证码长度错误",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    ...mapMutations(["SET_SIGN_UP_SETP"]),
    handleSuccess (res, file) {
                console.log(res)
            },
    getcheckNum() {
      if (this.formValidate.phone.length === 11) {
        const res = this.$http
          .get("user/getPhoneCode", {
            params: {
              phone: this.formValidate.phone
            }
          })
          .then(res => {
            
          });
      } else {
        this.$Message.error({
          content: "请输入正确的手机号",
          duration: 6,
          closable: true
        });
      }
    },
    handleSubmit(name) {
      let data = {
             username: this.formValidate.username,
             telephone: this.formValidate.phone,
             password: this.formValidate.password,
             address: this.formValidate.address,
             code: this.formValidate.code,
             phonecode: this.formValidate.phonecode
          }
      // 提交验证
      this.$http.post("user/register",Qs.stringify(data)
      ).then(res =>{
        if(res.data.code == 200){

        this.$router.push('/Login')

        }
      })
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
