import axios from '@/util/request'

export function getJobList(queryInfo) {
	return axios({
		url: 'jobs',
		method: 'GET',
		params: {
			...queryInfo
		}
	})
}

export function updateJobStatus(jobId, status) {
	return axios({
		url: 'job/status',
		method: 'POST',
		params: {
			jobId,
			status
		}
	})
}

export function runJobOnce(jobId) {
	return axios({
		url: 'job/run',
		method: 'POST',
		params: {
			jobId
		}
	})
}

export function deleteJobById(jobId) {
	return axios({
		url: 'job/delete',
		method: 'POST',
		params: {
			jobId
		}
	})
}

export function addJob(job) {
	return axios({
		url: 'job/add',
		method: 'POST',
		data: {
			...job
		}
	})
}

export function editJob(job) {
	return axios({
		url: 'job/update',
		method: 'POST',
		data: {
			...job
		}
	})
}

export function getJobLogList(queryInfo) {
	return axios({
		url: 'job/logs',
		method: 'GET',
		params: {
			...queryInfo
		}
	})
}

export function deleteJobLogByLogId(logId) {
	return axios({
		url: 'job/deleteLog',
		method: 'POST',
		params: {
			logId
		}
	})
}