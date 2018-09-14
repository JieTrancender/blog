//index.js
//获取应用实例
// var protobuf = require("../../js/protobuf-light.js")
// var protobuf = require("../../node_modules/pro")
// var loginConfig = require("../../js/login.js")
// var awesomeConfig = require("../../js/awesome.js")
// import "../../js/protobuf"
// var protobuf = require("../../../jsprotobufjs")
// var protobuf = require("../../js/proto.js");
// var loginConfig = require("../../js/login.js")
// var loginConfig = require("../../json/login.json")

// var protobuf = require("../../js/protobuf.js");
// var loginConf = require("../../js/login.js");


const app = getApp()

var util = require("../../weichatPb/src/util.js")
var protobuf = require("../../weichatPb/protobuf.js")
var loginConf = require("../../js/login.js")

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

      var LoginRoot = protobuf.Root.fromJSON(loginConf)
      var Login = LoginRoot.lookupType("login.Login")

      var msg = {
          username: "fri51",
          serverId: 1,
          userAgent: "{\"userAgent:\"\"}",
          clientPasswd: "client_passwd",
        }

      console.log("msg:", msg)

      var message = Login.create(msg)
      console.log("message:", message)

      var strBuf = Login.encode(message).finish()
      console.log("buffer.length", strBuf.length, strBuf)

       // 两字节长度，一字节一级协议，两字节二级协议，一字节域，后面接包内容

      var size = 4 + strBuf

      var buffer = new ArrayBuffer(strBuf.length + 4 + 2)
      var dv = new DataView(buffer, 0)

      dv.setInt16(0, size)
      dv.setInt8(2, 3)
      dv.setInt16(3, 2)
      dv.setInt8(5, 0)

      for (var i = 0; i < strBuf.length; i++) {
        dv.setInt8(6 + i, strBuf[i])
      }

      console.log(dv)

      var data = new Uint8Array(buffer)

      console.log(data)

      wx.sendSocketMessage({
        data: data
      })

      wx.ons
    })

    wx.onSocketClose(function(res) {
      console.log("websocket连接已关闭!")
    })

    wx.onSocketError(function(res) {
      console.log("websocket连接打开失败，请检查！")
    })

    wx.onSocketMessage(function(res) {
      console.log("websocket：服务端消息", res.data)

      // var data = new Uint8Array(res.data)

      console.log(res.data)

      var dv = new DataView(res.data)

      var size = dv.getUint16(0)
      var id1 = dv.getUint8(2)
      var id2 = dv.getUint16(3)
      var sid = dv.getUint8(5)

      console.log("encode", size, id1, id2, sid)

      var message = new ArrayBuffer(16)

      // 解包
      // var sizeView = new Uint16Array(data, 0, 1)
      // var id1 = new Uint8Array(data, 2, 1)
      // var id2 = new Uint16Array(data, 3, 1)
      // var sid = new Uint8Array(data, 5, 1)

      // var pbBuf = new Uint8Array(data, 6)

      // console.log("encode", sizeView, id1, id2, sid)

      // var LoginRoot = protobuf.Root.fromJSON(loginConf)
      // var LoginR = LoginRoot.lookupType("login.LoginR")

      // var message = LoginR.decode(pbBuf)

      // console.log("message:", message)
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
