import axios from '@/util/request'


export function getUpyunSetting() {
    return axios({
        url: '/pic/upyunSetting',
        method: 'GET'
    })
}

export function updateUpyunSetting(setting) {
    return axios({
        url: '/pic/upyunSetting/update',
        method: 'POST',
		data:{
            ...setting
        }
    })
}
