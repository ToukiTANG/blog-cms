import axios from '@/util/request'

export function getData(queryInfo) {
	return axios({
		url: 'tag/list',
		method: 'GET',
		params: {
			...queryInfo
		}
	})
}

export function addTag(form) {
	return axios({
		url: 'tag/save',
		method: 'POST',
		data: {
			...form
		}
	})
}

export function editTag(form) {
	return axios({
		url: 'tag/update',
		method: 'POST',
		data: {
			...form
		}
	})
}

export function deleteTagById(id) {
	return axios({
		url: 'tag/delete',
		method: 'POST',
		params: {
			id
		}
	})
}
