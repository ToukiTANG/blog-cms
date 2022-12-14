import axios from '@/util/request'

export function getMomentListByQuery(queryInfo) {
	return axios({
		url: 'moments',
		method: 'GET',
		params: {
			...queryInfo
		}
	})
}

export function updatePublished(id, published) {
	return axios({
		url: 'moment/published',
		method: 'POST',
		params: {
			id,
			published
		}
	})
}

export function getMomentById(id) {
	return axios({
		url: 'moment',
		method: 'GET',
		params: {
			id
		}
	})
}

export function deleteMomentById(id) {
	return axios({
		url: 'moment/delete',
		method: 'POST',
		params: {
			id
		}
	})
}

export function saveMoment(moment) {
	return axios({
		url: 'moment/save',
		method: 'POST',
		data: {
			...moment
		}
	})
}

export function updateMoment(moment) {
	return axios({
		url: 'moment/update',
		method: 'POST',
		data: {
			...moment
		}
	})
}