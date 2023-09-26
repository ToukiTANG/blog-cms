import axios from '@/util/request'

export function getData(queryInfo) {
	return axios({
		url: 'category/list',
		method: 'GET',
		params: {
			...queryInfo
		}
	})
}

export function addCategory(form) {
	return axios({
		url: 'category/save',
		method: 'POST',
		data: {
			...form
		}
	})
}

export function editCategory(form) {
	return axios({
		url: 'category/update',
		method: 'POST',
		data: {
			...form
		}
	})
}

export function deleteCategoryById(id) {
	return axios({
		url: 'category/delete',
		method: 'POST',
		params: {
			id
		}
	})
}
