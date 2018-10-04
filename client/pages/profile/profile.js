const app = getApp()

Page({
	data: {
		canIUse: wx.canIUse('button.open-type.getUserInfo'),
		userInfo: null
	},
	onLoad: function() {
		app.wechat.getSetting()
			.then(res => {
				if (res.authSetting['scope.userInfo']) {
					app.wechat.getUserInfo()
						.then(res => {
							app.globalData.userInfo = res.userInfo
							app.globalData.hasLogin = true
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
	},
	onShow: function() {
		// console.log("Profile:onShow", app.globalData.userInfo)
	},
	onHide: function() {
		// console.log("Profile:onHide")
	},
	bindGetUserInfo: function(res) {
		this.setData({
			userInfo: res.detail.userInfo
		})

		app.globalData.userInfo = this.data.userInfo
		app.globalData.hasLogin = true
		
		let getUserInfoLogs = app.wechat.getStorageSync('getUserInfoLogs') || []
		getUserInfoLogs.unshift({
			nickName: this.data.userInfo.nickName,
			dt: Date.now()
		})
		app.wechat.setStorage('getUserInfoLogs', getUserInfoLogs)
	},
	bindShowLogs: function(e) {
		console.log(e)
		app.wechat.navigateTo('../logs/logs')
	}
})