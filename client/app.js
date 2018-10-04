//app.js

/**
* WeChat API 模块
* 用于将微信官方API封装成Promise方式
* 小程序支持以CommonJS规范组织代码结构
*/
const util = require('./utils/util.js')

const wechat = require('./utils/wechat.js')

const douban = require('./utils/douban.js')

const globalUtil = require('./utils/globalUtil.js')

const protobuf = require('./weichatPb/protobuf.js')

const loginConf = require('./js/login.js')

const dispatcher = require('./utils/dispatcher.js')
const websocket = require('./utils/websocket.js')

const serverDomain = 'local.jie-trancender.org'



App({
  /**
  * global shared
  * 整个应用共享
  */
  data: {
    name: 'Blog',
    version: '0.0.0.1',
    currentCity: '北京'
  },

  util: util,
  wechat: wechat,
  douban: douban,
  globalUtil: globalUtil,
  protobuf: protobuf,
  loginConf: loginConf,
  websocket: websocket,
  dispatcher: dispatcher,

  onLaunch: function () {
    console.log('App Launch')

    let launchLogs = wechat.getStorageSync('launchLogs') || []
    launchLogs.unshift(Date.now())
    wechat.setStorage('launchLogs', launchLogs)
      .then(res => {
        console.log(res.errMsg)
      })

    this.globalData.websocket = new websocket.Websocket(serverDomain)
    this.globalData.dispatcher = new dispatcher.Dispatcher()
  },
  onShow: function() {
    console.log("App Show")
  },
  onHide: function() {
    console.log("App Hide")
  },
  

  globalData: {
    data:{},
    websockt: null,
    dispatcher: null,
  }
})