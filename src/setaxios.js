import axios from 'axios'
import store from './store/store'
import vue from 'vue'
import router from './router'

//http请求拦截
//将token放在请求的header中带回去给后端
export default function setAxios() {
    // axios.interceptors.request.use(
    //     config => {
    //         if (store.state.token) {
    //             config.headers.token = store.state.token;
    //         }
    //         return config;
    //     }
    // )
    //每次的有返回的请求，都会先进入改函数进行操作
    axios.interceptors.response.use(
        response => {
            if (response.status == 200) {
                //登录成功
                const data = response.data;
                if (data.code == -1) {
                    //登录过期，清空store的token和localstore的token
                    store.commit('settoken', '');
                    localStorage.removeItem('token');
                    router.replace({
                        path: '/login'
                    });
                } else if (data.code == '0') {
                    router.replace({
                        path: '/index'
                    })
                }
                return data;
            }
            return response;
        }
    )
}