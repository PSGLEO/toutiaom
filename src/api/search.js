
import request from '@/utils/request'
// import store from '@/store'

export const getSearchSuggestions = q => {
	return request({
		method: 'GET',
		url: '/v1_0/suggestion',
		params:{
      q
    }
	})
}

//获取搜索结果

export const getSearchResult = params => {
	return request({
		method: 'GET',
		url: '/v1_0/search',
		params
	})
}