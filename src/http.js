import axios from 'axios';

const http = axios.create({
  baseURL: 'http://localhost:8080/'
});

// 添加请求拦截器
http.interceptors.request.use(function (config) {
  let token = localStorage.getItem('token')
  config.headers['jwt'] = token;
  // console.log(localStorage.getItem('token'))

  // eslint-disable-next-line no-unused-expressions
  
  // 在发送请求之前做些什么
  console.log(config);
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});
// 添加响应拦截器
http.interceptors.response.use((response) => {
  if(response.headers['jwt']){
    // console.log("lzl")
    localStorage.setItem('token',response.headers['jwt'])
  }
  
  
  
  
  // window.vm.$store.state.jwt = response.headers.jwt;
  // console.log(window.vm.$store.state);
  
  // 对响应数据做点什么
  if(!response.data.msg.startsWith("操作")) {
    if (response.data.code == 200) {
      window.vm.$Message.success({
        content: response.data.msg,
        duration: 6,
        closable: true
      });
    }else{
      window.vm.$Message.warning({
        content: response.data.msg,
        duration: 6,
        closable: true
      });
    }
  }
  return response;
}, (error) => {
  
  window.vm.$Message.warning({
    content: error.data.msg,
    duration: 6,
    closable: true
  });
  // 对响应错误做点什么
  return Promise.reject(error);
});
http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
http.defaults.withCredentials = true;// 让ajax携带cookie
export default http;
