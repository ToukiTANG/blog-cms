import axios from '@/util/request'

export function uploadFile(formData) {
    return axios({
        url: '/file/upload',
        method: 'POST',
        data: formData,
        headers: {'Content-Type': 'multipart/form-data'}
    })
}
