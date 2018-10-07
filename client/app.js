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

// const loginConf = require('./protobuf/login.js')
const protocolConf = require('./protobuf/protocol.js')

const dispatcher = require('./utils/dispatcher.js')
const websocket = require('./utils/websocket.js')

import {eventMgr} from './utils/event_mgr.js' 

// const serverDomain = 'local.jie-trancender.org'

// const serverDomain = 'wechat.jie-trancender.org'

import {serverDomain} from './js/config.js'

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
  // loginConf: loginConf,
  protocolConf: protocolConf,
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
    this.globalData.eventMgr = eventMgr
    console.log('eventMgr', this.globalData.eventMgr)
    // this.globalData.eventMgr = new EventMgr()
    
  },
  onShow: function() {
    console.log("App Show")
  },
  onHide: function() {
    console.log("App Hide")
  },

  getProtocolConf: function(protocolName) {
    console.log('getProtocolConf', protocolName)
    return protocolConf[protocolName]
  },

  updateUserInfo: function(userInfo) {
    this.globalData.userInfo = userInfo
    this.globalData.login = true
    console.log('updateUserInfo', userInfo)
  },

  updatePlayerInfo: function(playerInfo) {
    this.globalData.playerInfo = playerInfo
    console.log('updatePlayerInfo', playerInfo)
  },
  

  globalData: {
    data:{},
    websockt: null,
    dispatcher: null,
    eventMgr: null,
    salt: '582865471',
    userInfo: null,
    playerInfo: null
  }
})