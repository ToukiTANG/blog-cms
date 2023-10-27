import axios from '@/util/request'

export function getOperationLogList(queryInfo) {
	return axios({
		url: '/operationLog/list',
		method: 'GET',
		params: {
			...queryInfo
		}
	})
}

export function deleteOperationLogById(logId) {
	return axios({
		url: '/operationLog/delete',
		method: 'POST',
		params: {
			logId
		}
	})
}
