export function isNeedApiPrefix (url) {
  return !/^(https?\:\/\/)|^(\/\/)/.test(url)
}
export function i18nFormat (txt, args) {
  if (args.length == 0) return txt
  var param = args[0]
  var s = txt
  if (typeof param === 'object') {
    for (var key in param) { s = s.replace(new RegExp('\\{' + key + '\\}', 'g'), param[key]) }
    return s
  } else {
    for (var i = 0; i < args.length; i++) { s = s.replace(new RegExp('\\{' + i + '\\}', 'g'), args[i]) }
    return s
  }
}

export function getCookie (cookieName) {
  let strCookie = document.cookie
  let arrCookie = strCookie.split(';')
  for (let i = 0; i < arrCookie.length; i++) {
    let arr = arrCookie[i].split('=')
    if (cookieName == arr[0].trim()) {
      return arr[1]
    }
  }
  return ''
}
