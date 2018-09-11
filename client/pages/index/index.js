//index.js
//获取应用实例
var protobuf = require("../../js/protobuf-light.js")
// var protobuf = require("../../node_modules/pro")
// var loginConfig = require("../../js/login.js")
// var awesomeConfig = require("../../js/awesome.js")
// import "../../js/protobuf"
// var protobuf = require("../../../jsprotobufjs")
// var protobuf = require("../../js/proto.js");
// var loginConfig = require("../../js/login.js")
var loginConfig = require("../../json/login.json")

const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

    console.log("onLoad......")
    wx.connectSocket({
      url: 'wss://local.jie-trancender.org/ws',
    })

    wx.onSocketOpen(function(res) {
      console.log("websocket连接已打开!")
      console.log(res)

      console.log(protobuf)

      var LoginRoot = protobuf.Root.fromJSON(loginConfig)

      console.log(LoginRoot)

      var Login = LoginRoot.lookupType("login.Login")
      console.log(Login)

      var testLogin = LoginRoot.lookupType("Login")
      console.log(testLogin)

        var msg = {
          username: "fri51",
          serverId: 1,
          userAgent: "{\"userAgent:\"\"",
          clientPasswd: "client_passwd",
        }

        console.log("msg", msg)

        // var message = Login.create(msg)

        var AwesomeRoot = protobuf.Root.fromJSON(awesomeConfig)
        var AwesomeMessage = AwesomeRoot.lookupType("AwesomeMessage")

        var payload = {awesomeField: "我是test1"}
        var message = AwesomeMessage.create(payload)
    })

    wx.onSocketError(function(res) {
      console.log("websocket连接打开失败，请检查！")
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onShow: function() {
    console.log("onShow......")
  }
})
