import Vue from 'vue'
// http://momentjs.cn/
import moment from 'moment'

//设置moment国际化语言
moment.locale('zh-cn')

Vue.filter('timeFormat', function (value, format = 'YYYY-MM-DD HH:mm:ss') {
    return moment(value).format(format)
})
