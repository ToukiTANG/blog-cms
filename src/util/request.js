import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {Message} from 'element-ui'
import router from "@/router";

const request = axios.create({
    baseURL: '/admin',
    timeout: 10000
})

let CancelToken = axios.CancelToken

// 请求拦截
request.interceptors.request.use(config => {
        //对于访客模式，除GET请求外，都拦截并提示
        const userJson = window.localStorage.getItem('user') || '{}'
        const user = JSON.parse(userJson)
        if (userJson !== '{}' && user.roles[0].roleName !== 'ROLE_admin' && config.method !== 'get') {
            config.cancelToken = new CancelToken(function executor(cancel) {
                cancel('访客模式，不允许操作')
            })
            return config
        }

        NProgress.start()
        const ac_token = window.localStorage.getItem('access_token')
        if (ac_token) {
            config.headers.Authorization = 'Bearer ' + ac_token
        }
        return config
    },
    error => {
        NProgress.done()
        console.info(error)
        return Promise.reject(error)
    }
)

// 响应拦截
request.interceptors.response.use(response => {
        NProgress.done()
        const res = response.data
        if (res.code !== 2000) {
            if (res.code === 4002 || res.code === 4003) {
                let msg = res.msg || 'Error'
                Message.error(msg)
                window.localStorage.clear()
                router.push('/login')
                return Promise.reject(new Error(msg))
            }
            let msg = res.msg || 'Error'
            Message.error(msg)
            return Promise.reject(new Error(msg))
        }
        return res
    },
    error => {
        NProgress.done()
        console.info(error)
        Message.error(error.message)
        return Promise.reject(error)
    }
)

export default request
