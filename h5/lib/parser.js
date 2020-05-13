const path = require('path')
const execFile = require('child_process').execFile
const exec = require('child_process').exec
const cache = require('./cache')
const config = require('./config')
const isWin = /^win/.test(process.platform)
const isLinux = /^linux/.test(process.platform)
const isMac = /^darwin/.test(process.platform)
const wcscMac = path.resolve(__dirname, '../bin/wcsc')
const wcscWin = wcscMac + '.exe'
const wcscLinux = 'wine ' + wcscWin
const wccMac = path.resolve(__dirname, '../bin/wcc')
const wccWin = wccMac + '.exe'
const wccLinux = 'wine ' + wccWin
const wcsc = isWin ? wcscWin : isMac ? wcscMac : wcscLinux
const wcc = isWin ? wccWin : isMac ? wccMac : wccLinux
const util = require('./util')
const wxssSourcemap = require('./wxss')
const wxml_args = ['-d']
const wxss_args = ['-lc'] //, '-db'这个参数貌似跟sourcemap相关，用wine跑的时偶尔会报错，所以不用
const chalk = require('chalk')

const wxssTranspile = require('wxss-transpiler')
const wxmlTranspiler = require('wxml-transpiler')

const convert = require('convert-source-map')

const g_customComponentsInfo = {}
const g_pageComponents = {}

exports.g_customComponentsInfo = g_customComponentsInfo
exports.g_pageComponents = g_pageComponents
let promiselist = []

function parseImports (file, wxss, cb) {
  let fn = wxss ? 'parseCssImportsSync' : 'parseImports'
  let srcs = []
  util[fn](srcs, file, function (err) {
    if (err) {
      console.error(file + '=> ParseImports Error <=' + err)
      return cb(err)
    }
    srcs.unshift(file)
    return cb(null, srcs.map(src => `./${src}`))
  })
}

let wxmlMsgFlag = 1
let wxssMsgFlag = 1
function compileWxss (srcs) {
  let ret = new Promise(function (resolve, reject) {
    cache.setWxssMap(srcs)
    let execWcsc = execFile.bind(null, wcsc, wxss_args.concat(srcs))
    if (isLinux) {
      execWcsc = exec.bind(
        null,
        [wcsc]
          .concat(wxss_args)
          .concat(srcs)
          .join(' ')
      )
    }
    if (useDefaultCompiler) {
      if (wxssMsgFlag) {
        console.log(chalk.yellow('Using wcsc.exe to build: '))
        wxssMsgFlag = 0
      }
      execWcsc(
        {
          maxBuffer: 1024 * 600
        },
        (err, stdout, stderr) => {
          if (err) {
            console.error(err.stack)
            return reject(new Error(`${full_path} 编译失败，请检查`))
          }
          resolve(stdout)
        }
      )
    } else {
      if (wxssMsgFlag) {
        console.log(chalk.yellow('Using wxss-transpiler to transpile wxss '))
        wxssMsgFlag = 0
      }
      wxssTranspile(srcs, {
        keepSlash: true
      }).then(stdout => {
        resolve(stdout)
      })
    }
  })
  promiselist.push(ret)
  return ret
}
function parseCustomComponentWxss (full_path) {
  return new Promise(function (resolve, reject) {
    let prefix = full_path.replace(/\//, '-').substring(0, full_path.length - 5)
    parseImports(full_path, true, async (err, srcs) => {
      if (err) return reject(err)
      await compileWxss(srcs).then(async stdout => {
        // store classes names
        let ret = util.prefixCss(prefix, stdout)
        g_customComponentsInfo[full_path] = ret
        await wxssSourcemap(full_path, stdout).then(content => {
          cache[full_path] = content
          ret.content = content
          resolve()
        })
      })
    })
  })
}
function getWxsskeyByFullpathWxml (full_path) {
  return full_path.substring(0, full_path.length - 5) + '.wxss'
}
function parseCustomComponent (page, full_path) {
  // return new Promise(function(resolve,reject){
  parseImports(full_path, false, async (err, srcs) => {
    if (err) return
    let tag = full_path.substring(0, full_path.length - 5)
    let config = util.readFileSync(tag + '.json')
    config = JSON.parse(config)
    if (
      config &&
      config.usingComponents &&
      Object.keys(config.usingComponents).length > 0
    ) {
      for (let key in config.usingComponents) {
        let fullpatht =
          config.usingComponents[key].replace(/^(\/|\.\/)/, '') + '.wxml'
        parseCustomComponent(page, fullpatht)
      }
    }

    g_pageComponents[page].push(tag)
    let pt = new Promise(function (resolve, reject) {
      Promise.all([
        parseCustomComponentWxss(
          full_path.substring(0, full_path.length - 5) + '.wxss'
        ),
        compileWxml(srcs)
      ]).then(data => {
        resolve(data)
      })
    })

    pt.then(data => {
      let ccinfo = g_customComponentsInfo[getWxsskeyByFullpathWxml(full_path)]
      if (ccinfo && ccinfo.classes) {
        let curclasses = ccinfo.classes
        for (let key in curclasses) {
          let patten = new RegExp(key, 'g')
          data[1] = data[1].replace(patten, curclasses[key])
        }
      }
      g_customComponentsInfo[full_path] = {
        content: data[1]
      }
    })
    promiselist.push(pt)
  })
}
function compileWxml (srcs) {
  let ret = new Promise(function (resolve, reject) {
    let execWcc = execFile.bind(null, wcc, wxml_args.concat(srcs))
    if (isLinux) {
      execWcc = exec.bind(
        null,
        [wcc]
          .concat(wxml_args)
          .concat(srcs)
          .join(' ')
      )
    }
    if (useDefaultCompiler) {
      if (wxmlMsgFlag) {
        console.log(chalk.yellow('Using wcc.exe to transpile wxml:'))
        wxmlMsgFlag = 0
      }
      execWcc(
        {
          maxBuffer: 1024 * 600
        },
        (err, stdout, stderr) => {
          if (err) {
            console.error(err.stack)
            return reject(new Error(`${full_path} 编译失败，请检查`))
          }
          resolve(stdout)
        }
      )
    } else {
      if (wxmlMsgFlag) {
        console.log(chalk.yellow('Using wxml-compiler to transpile wxml'))
        wxmlMsgFlag = 0
      }
      const res = wxmlTranspiler.wxmlCompile(srcs).render
      resolve(res)
    }
  })
  promiselist.push(ret)
  return ret
}
// const useDefaultCompiler = process.env.DFT_CMP === 'true'
const useDefaultCompiler = true
module.exports.exe = function (full_path) {
  full_path = full_path.replace(/^\.?\//, '')
  return new Promise(function (resolve, reject) {
    if (/\.wxml$/.test(full_path)) {
      parseImports(full_path, false, async (err, srcs) => {
        if (err) return reject(err)
        g_pageComponents[full_path] = []
        try {
          let config = util.readFileSync(
            full_path.substring(0, full_path.length - 5) + '.json'
          )
          config = JSON.parse(config)
          if (
            config &&
            config.usingComponents &&
            Object.keys(config.usingComponents).length > 0
          ) {
            for (let key in config.usingComponents) {
              let fullpatht =
                config.usingComponents[key].replace(/^(\/|\.\.\/)+/, '') +
                '.wxml'
              parseCustomComponent(full_path, fullpatht)
            }
          }
        } catch (e) {}
        await compileWxml(srcs).then(stdout => {
          cache[full_path] = stdout
          // resolve(stdout)
        })
        Promise.all(promiselist).then(() => {
          resolve(cache[full_path])
        })
      })
    } else if (/\.wxss$/.test(full_path)) {
      parseImports(full_path, true, async (err, srcs) => {
        if (err) return reject(err)
        cache.setWxssMap(srcs)

        await compileWxss(srcs).then(async stdout => {
          await wxssSourcemap(full_path, stdout).then(content => {
            cache[full_path] = content
            resolve(content)
          }, reject)
        })
      })
    } else if (/\.js$/.test(full_path)) {
      config().then(function (obj) {
        util.parseJavascript(obj, full_path).then(
          function ({ code, map }) {
            code = code + '\n' + convert.fromJSON(map).toComment()
            cache[full_path] = code
            resolve(code)
          },
          function (err) {
            console.error(err.stack)
            return reject(new Error(`${full_path} 编译失败，请检查`))
          }
        )
      }, reject)
    } else {
      resolve()
    }
  })
}
