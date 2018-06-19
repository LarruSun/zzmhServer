import axios from 'axios'
import qs from 'qs'

//配置根URL
axios.defaults.baseURL = 'http://localhost:2018/slp';

//拦截器  在发送请求前拦截并吧对象转换成字符串
axios.interceptors.request.use((config) => {
    // config.withCredentials = true
    config.data = qs.stringify(config.data);
    
    return config
})


  //拦截器  在接收数据的时候检测用户是否退出了
//   axios.interceptors.response.use((res) => {
//     if(res.data.code == '401'){
//       store.commit('CLEAR_INFO');
//       yfAlert('登录身份已失效','warning');
//       router.replace('/');
//     }
//     return res
//   })


export default axios