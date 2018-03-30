import OJsonp from  'jsonp'

const obj2Param = (data) => {
  let url=''

  Object.keys(data).forEach(key => {
    url += `&${key}=${data[key]}`
  })

  return url && url.substring(1)
}

const jsonp = (url, data, options) => {
  url += (url.indexof('?') < 0 ? '?' : '&') + obj2Param(data)
  return new Promise ((reslove, reject) => {
    OJsonp(url, options, (err, res) => {
      if (!err) {
        reslove(res)
      } else {
        reject(err)
      }
    })
  })
}

export default jsonp
