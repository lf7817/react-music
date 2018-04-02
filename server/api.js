/* eslint-disable no-undef */
const axios = require('axios')
const { DISC_URL } = require('./constant')

const headers =  {
  referer: 'https://c.y.qq.com/',
  host: 'c.y.qq.com'
}

const getDiscList = (params) => {
  return axios.get(DISC_URL, {
    headers,
    params: params,
  })
}

module.exports = {
  getDiscList
}