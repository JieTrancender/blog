const app = getApp()

Page({
	data: {
		canIUse: wx.canIUse('button.open-type.getUserInfo'),
		userInfo: null
	},
	onLoad: function() {
		let self = this
		app.wechat.getSetting()
			.then(res => {
				if (res.authSetting['scope.userInfo']) {
					app.wechat.getUserInfo()
						.then(res => {
							// app.globalData.userInfo = res.userInfo
							// app.globalData.hasLogin = true
							app.updateUserInfo(res.userInfo)
							this.setData({
								userInfo: res.userInfo
							})

							let getUserInfoLogs = app.wechat.getStorageSync('getUserInfoLogs') || []
							getUserInfoLogs.unshift({
								nickName: res.userInfo.nickName,
								dt: Date.now()
							})

							app.wechat.setStorage('getUserInfoLogs', getUserInfoLogs)
						})
				}
			})

		app.wechat.login()
			.then(res => {
				console.log("code:", res.code)
				let loginLogs = app.wechat.getStorageSync('loginLogs') || []
				loginLogs.unshift({
					code: res.code,
					dt: Date.now()
				})
				app.wechat.setStorage('loginLogs', loginLogs)
			})


		app.globalData.eventMgr.observe('login.Login', self, this.login)
	},
	onShow: function() {
		// console.log("Profile:onShow", app.globalData.userInfo)
		// wx.connectSocket({
	 //      url: 'wss://local.jie-trancender.org'
	 //    })
	},
	onHide: function() {
		// console.log("Profile:onHide")
	},
	bindGetUserInfo: function(res) {
		this.setData({
			userInfo: res.detail.userInfo
		})

		// app.globalData.userInfo = this.data.userInfo
		// app.globalData.hasLogin = true
		app.updateUserInfo(thsi.data.userInfo)
		
		let getUserInfoLogs = app.wechat.getStorageSync('getUserInfoLogs') || []
		getUserInfoLogs.unshift({
			nickName: this.data.userInfo.nickName,
			dt: Date.now()
		})
		app.wechat.setStorage('getUserInfoLogs', getUserInfoLogs)
	},
	bindShowLogs: function(e) {
		app.wechat.navigateTo('../logs/logs')
	},
	bindLoginServer: function(e) {
		let websocket = app.globalData.websocket
		console.log('websocket', websocket.isConn())

		if (websocket.isConn()) {
			let msg = {
				username: app.globalData,
				serverId: 1,
				userAgent: '{\"userAgent:\"\"',
				clientPasswd: 'client_passwd',
			}

			let websocket = app.globalData.websocket
			websocket.send("login", "Login", msg)
		} else {
			app.wechat.showToast('网络重连中', 'loading', 3000)
			websocket.reConn()
		}
	},
	bindTestLogin: function(e) {
		wx.connectSocket({
			url: 'wss://local.jie-trancender.org/ws',
		})

		wx.onSocketOpen(function(res) {
			console.log('wx.onSocketOpen', res)
		})
	},
	login: function(res) {
		console.log('login', res)
	}
})