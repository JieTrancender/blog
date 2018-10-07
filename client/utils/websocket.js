const DispatcherManager = require('./dispatcher.js')

const dispatcher = new DispatcherManager.Dispatcher()

import {eventMgr} from './event_mgr.js'

class Websocket {
	constructor(url) {
		this.urlPath_ = 'wss://' + url + '/ws'
		
		this.initConn()
	}

	initConn = () => {
		this.isConn_ = false

		this.socketTask_ = wx.connectSocket({
			url: this.urlPath_
		})

		this.socketTask_.onOpen(this.onOpen)
		this.socketTask_.onMessage(this.onMessage)
		this.socketTask_.onError(this.onError)
		this.socketTask_.onClose(this.onClose)

		console.log('Websocket', this)
	}

	onOpen = res => {
		let self = this
		this.isConn_ = true
		console.log('Websocket#onOpen', this.isConn_)
	}

	onMessage = res => {
		let [module, oper, msg] = dispatcher.dispatch(res.data)
		console.log(module + '.' + oper, msg)
		console.log('fix', module === "login", oper === "LoginR")
		if (module === "login" && oper === "LoginR") {
			eventMgr.trigger('login.Login', msg)
		}
	}

	onError = res => {
		this.isConn_ = false
		// app.wechat.showToast('网络已断开', 'loading', 3000)
		console.log('Websocket#onError', res)
	}

	onClose = res => {
		this.isConn_ = false
		// app.wechat.showToast('网络已断开', 'loading', 3000)
		console.log('Websocket#onClose', this.isConn_)
	}

	isConn = res => {
		console.log('isConn', this.isConn_)
		return this.isConn_
	}

	reConn = () => {
		this.initConn()
	}

	/**
	 *    根据protobuf协议编码后异步发送到后台服务
	 *    @method send
	 *    @author JTrancender 2018-10-04
	 *    @param  {string} module 包名
	 *    @param  {string} oper 操作名
	 *    @param  {object} msg json数据
	 *    @return {nil} 
	 */
	send(module, oper, msg) {
		console.log(module + '.' + oper, msg)
		let data = dispatcher.pack(module, oper, msg)

		return new Promise((resolve, reject) => {
			this.socketTask_.send({data: data, success: resolve, fail: reject})
		})
	}
}

module.exports = {
	Websocket
}