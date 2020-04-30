export function isNeedApiPrefix (url) {
  return !/^(https?\:\/\/)|^(\/\/)/.test(url)
}

export function uuid () {
  var s = []
  var hexDigits = '0123456789abcdef'
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = '-'

  var uuid = s.join('')

  return replaceAll(uuid, '-', '')
}

export function replaceAll (str, ov, nv) {
  return str.replace(new RegExp(ov, 'gm'), nv)
}

export function i18nFormat (txt, args) {
  if (args.length == 0) return txt
  var param = args[0]
  var s = txt
  if (typeof param === 'object') {
    for (var key in param) {
      s = s.replace(new RegExp('\\{' + key + '\\}', 'g'), param[key])
    }
    return s
  } else {
    for (var i = 0; i < args.length; i++) {
      s = s.replace(new RegExp('\\{' + i + '\\}', 'g'), args[i])
    }
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
