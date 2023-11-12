import axios from '@/util/request'

export function uploadImg(formdata) {
    return axios({
        url: 'uploadImg',
        method: 'post',
        data: formdata,
        headers: { 'Content-Type': 'multipart/form-data' },
    })
}