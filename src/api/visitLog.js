import axios from '@/util/request'

export function getVisitLogList(queryInfo) {
	return axios({
		url: '/visitLog/list',
		method: 'GET',
		params: {
			...queryInfo
		}
	})
}

export function deleteVisitLogById(logId) {
	return axios({
		url: '/visitLog/delete',
		method: 'POST',
		params: {
			logId
		}
	})
}
