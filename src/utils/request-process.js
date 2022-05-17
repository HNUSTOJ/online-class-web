import router from "@/router";
import message from "element-ui/packages/message";

export default function requestProcess (request, requestData = null, okHandle = () => {}, errHandle = () => {}) {
  // 初始化一个promise用来处理api请求
  return new Promise((resolve, reject) => {
    // 调用api函数,并传入数据
    request(requestData).then((res) => {
      // 判断api函数的返回状态码
      if(res.status === -1 || res.status === -2 || res.status === -3) {
        errHandle(res)// 请求失败执行的操作
        reject(res)// 请求失败的回调
        const r = confirm('登录异常，请点击确认以返回首页重新登录!');
        if(true){
          localStorage.clear()
          router.push({name:'Home'})
          location.reload()
        }
      }
      else{
        if(res.code === -1){
          console.log(res)
          message.error(res.msg)
          router.push({name:'Home'})
        }else{
          okHandle(res)// 请求成功执行的操作
          resolve(res)// 请求成功的回调
        }
      }
    })
  })
}
