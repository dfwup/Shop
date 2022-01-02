import axios from 'axios'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
const requests = axios.create({
    //配置对象
    baseURL: '/api',//基础路径，发送请求时，默认补全/api
    timeout: 500,//请求超时时间
})

//请求拦截器：
requests.interceptors.request.use((config) => {

    // nprogress.start()
    // nprogress.inc()
    nprogress.set(.3)
    //config配置对象中的header
    return config
})
//响应拦截器
requests.interceptors.response.use((res) => {
    nprogress.done()
    return res.data
}, (err) => {
    nprogress.done()
    return Promise.reject(err)
}
)
export default requests
