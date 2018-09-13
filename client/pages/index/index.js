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

      var size = 4 + strBuf.length
      var sz1 = size / 65536
      var sz2 = size % 65536
      // var buf = 2字节size
      // 两字节长度，一字节一级协议，两字节二级协议，一字节域，后面接包内容

      // var buf = new Uint8Array(size)
      var buf = new ArrayBuffer(size)

      console.log(buf)

      var dv = new DataView(buf)

      console.log("dv:", dv.length, dv)

      dv.setInt16(0, size)
      dv.setInt8(2, sz1)
      dv.setInt16(3, sz2)
      

      // buf.setUint16(size)

      console.log("dv:", dv.length, dv)
      // buf.setUint8(sz1)
      // buf.setUint16(sz2)
      // var len = buf.length
      // for (var i = 0, i < buf.length; ++i) {
      //   buf[len + i] = strBuf[i]
      // }

      // console.log("---length", buf.length, buf)


      // var decodeBuffer = Login.decode(buffer)

      // console.log("decodeBuffer", decodeBuffer)

      // var bytes = new Array()

      // bytes.push(43)

      // bytes.push(buffer)

      // console.log(buffer)

      // // 2字节 + 

      // wx.sendSocketMessage({
      //   data:buffer
      // })

        // var AwesomeRoot = protobuf.Root.fromJSON(awesomeConfig)
        // var AwesomeMessage = AwesomeRoot.lookupType("AwesomeMessage")

        // var payload = {awesomeField: "我是test1"}
        // var message = AwesomeMessage.create(payload)
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
