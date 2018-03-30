import jsonp from '../common/jsonp'
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