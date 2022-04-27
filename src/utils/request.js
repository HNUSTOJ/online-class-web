// import axios from 'axios'
// import {serverIp} from "../../public/config";
//
// const request = axios.create({
//     // baseURL: `http://${serverIp}:8443`,
//     baseURL: `http://127.0.0.1:4523/mock/785490`,
//     timeout: 5000
// })
//
// // request 拦截器
// // 可以自请求发送前对请求做一些处理
// // 比如统一加token，对请求参数统一加密
// request.interceptors.request.use(config => {
//     config.headers['Content-Type'] = 'application/json;charset=utf-8';
//
//     // config.headers['token'] = user.token;  // 设置请求头
//     return config
// }, error => {
//     return Promise.reject(error)
// });
//
// // response 拦截器
// // 可以在接口响应后统一处理结果
// request.interceptors.response.use(
//     response => {
//         let res = response.data;
//         // 如果是返回的文件
//         if (response.config.responseType === 'blob') {
//             return res
//         }
//         // 兼容服务端返回的字符串数据
//         if (typeof res === 'string') {
//             res = res ? JSON.parse(res) : res
//         }
//         return res;
//     },
//     error => {
//         console.log('err' + error) // for debug
//         return Promise.reject(error)
//     }
// )
//
//
// export default request

import axios from "axios"
import Cookie from "js-cookie"

// 对axios函数进行封装，用来发api请求，post使用qs进行处理，避免自己把from数据转换为json字符串
export default async function request (url, data, type) {
    // 创建axios请求 携带session
    const service = axios.create({
        baseURL:'http://152.136.122.135:8848/',
        //baseURL:'http://127.0.0.1:4523/mock/785490/',
        withCredentials: false
    })
    // let token = ''
    // if (Cookie.get('token') !== undefined) {
    //     // 把cookie数据解析为对象
    //     token = 'Bearer '+Cookie.get('token')
    // }
    let token = localStorage.getItem('token')
    // 默认数据
    const res = {
        code: 104,
        data: null,
        msg: '发送请求失败！'
    }
    try {
        // 判断请求类型
        if (type === 'get') {
            return (await service.get(url, { params: data, headers: { 'Content-Type': 'application/json;charset=utf-8' , 'token':token} })).data
        } else if (type === 'post') {
            return (await service.post(url, data,{ params:data, headers: { 'Content-Type': 'application/json;charset=utf-8' , 'token':token} })).data
        } else if (type === 'put') {
            return (await service.put(url, data)).data
        } else if (type === 'delete') {
            return (await service.delete(url, data)).data
        } else if (type === 'form') {
            return (await service.post(url, data,{ headers: { 'Content-Type': 'application/json;charset=utf-8' , 'token':token} })).data
        } else {
            return res
        }
    } catch (e) {
        return res
    }
}
