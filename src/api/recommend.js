import jsonp from '../common/jsonp'
import axios from 'axios'
import { API_RECOMMEND_ADDRESS } from '../constant'
import { commonParams, options } from './config'

export const getRecommend = () => {
  const data = {
    ...commonParams,
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  }

  return jsonp(API_RECOMMEND_ADDRESS, data, options)
}

export const getDiscList = () => {
  const data = {
    ...commonParams,
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
    format: 'json'
  }
  
  return axios.get('/api/getDiscList', {
    params: data
  })
}
