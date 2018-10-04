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

  onLaunch: function () {
    console.log('App Launch')

    let launchLogs = wechat.getStorageSync('launchLogs') || []
    launchLogs.unshift(Date.now())
    wechat.setStorage('launchLogs', launchLogs)
      .then(res => {
        console.log(res.errMsg)
      })
  },
  onShow: function() {
    console.log("App Show")
  },
  onHide: function() {
    console.log("App Hide")
  },

  globalData: {
    data:{}
  }
})