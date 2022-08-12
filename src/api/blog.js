import axios from '@/util/request'

export function getDataByQuery(queryInfo) {
	return axios({
		url: 'blogs',
		method: 'GET',
		params: {
			...queryInfo
		}
	})
}

export function deleteBlogById(id) {
	return axios({
		url: 'blog/delete',
		method: 'POST',
		params: {
			id
		}
	})
}

export function getCategoryAndTag() {
	return axios({
		url: 'categoryAndTag',
		method: 'GET'
	})
}

export function saveBlog(blog) {
	return axios({
		url: 'blog/save',
		method: 'POST',
		data: {
			...blog
		}
	})
}

export function updateTop(id, top) {
	return axios({
		url: 'blog/updateTop',
		method: 'POST',
		params: {
			id,
			top
		}
	})
}


export function getBlogById(id) {
	return axios({
		url: 'blog/get',
		method: 'GET',
		params: {
			id
		}
	})
}

export function updateBlog(blog) {
	return axios({
		url: 'blog/update',
		method: 'POST',
		data: {
			...blog
		}
	})
}