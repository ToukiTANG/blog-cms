import axios from '@/util/request'

export function getExceptionLogList(queryInfo) {
	return axios({
		url: '/exceptionLog/list',
		method: 'GET',
		params: {
			...queryInfo
		}
	})
}

export function deleteExceptionLogById(logId) {
	return axios({
		url: '/exceptionLog/delete',
		method: 'DELETE',
		params: {
			logId
		}
	})
}
