// 获取全局应用程序实例对象
const app = getApp()

Page({
	data: {
		userInfo: null,
		canIUse: wx.canIUse('button.open-type.getUserInfo')
	},

	getUserInfo() {
		app.wechat.getUserInfo()
			.then(res => this.setData({userInfo: res.userInfo}))
	},

	onLoad() {
		app.wechat.getSetting()
			.then(res => {
				if (res.authSetting['scope.userInfo']) {
					app.wechat.getUserInfo()
						.then(res => {
							console.log(res)
						})
				}
				console.log(res)
			})

		app.wechat.login()
			.then(res => {
				if (res.code) {
					console.log('登陆成功:' + res.code)
				} else {
					console.error('获取用户登录状态失败:' + res.errMsg)
				}
			})
	},
	bindGetUserInfo(e) {
		console.log(e)
	}
})
