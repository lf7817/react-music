/* eslint-disable no-undef */
let host = ''
if (process.env.NODE_ENV === 'development') {
  host = '/api'
} else {
  host = 'http://47.98.156.114:4000/api'
}

export const HOST = 'http://47.98.156.114:4000/api'
// 错误码
export const ERR_OK = 0
// 推荐歌单地址
export const API_RECOMMEND_ADDRESS = 'http://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
// 歌手地址
export const API_SINGER_ADDRESS = 'http://c.y.qq.com/v8/fcg-bin/v8.fcg'
// 头像地址
export const AVATAR_ADDRESS = 'http://y.gtimg.cn/music/photo_new/T001R150x150M000{id}.jpg?max_age=2592000'
// 热门
export const HOT_NAME = '热门'
// 热门歌曲条数
export const HOT_SONG_NUM = 10

