import axios from '@/util/request'

export function getLoginLogList(queryInfo) {
	return axios({
		url: 'logInLog/list',
		method: 'GET',
		params: {
			...queryInfo
		}
	})
}

export function deleteLoginLogById(logId) {
	return axios({
		url: 'logInLog/delete',
		method: 'POST',
		params: {
			logId
		}
	})
}
