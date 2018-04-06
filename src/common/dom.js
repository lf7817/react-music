export const hasClass = (el, className) => {
  const reg = new RegExp('(^|\\s)' + className + '(\\s|$)')

  return reg.test(el.className)
}

export const addClass = (el, className) => {
  if (hasClass(el, className)) {
    return 
  }

  const list = el.className.split(' ')
  list.push(className)
  el.className = list.join(' ')
}

export const getData = (el, name) => {
  const prefix = 'data-'

  return el.getAttribute(prefix + name)
}

export const setData = (el, name, val) => {
  const prefix = 'data-'

  return el.setAttribute(prefix + name, val)
}