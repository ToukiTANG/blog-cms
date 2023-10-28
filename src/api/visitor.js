import axios from '@/util/request'

export function getVisitorList(queryInfo) {
	return axios({
		url: '/visitor/list',
		method: 'GET',
		params: {
			...queryInfo
		}
	})
}

export function deleteVisitor(id, uuid) {
	return axios({
		url: '/visitor/delete',
		method: 'POST',
		params: {
			id,
			uuid
		}
	})
}
