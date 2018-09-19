// 获取全局应用程序实例对象
const app = getApp()

Page({
	data: {
		title: 'About',
		userInfo: {
			wechat: 'WEDN-NET',
			nickName: 'https://github.com/zce/weapp-douban',
			avatarUrl: '../../images/qrcode.png'
		}
	},

	getUserInfo() {
		app.wechat.getUserInfo()
			.then(res => this.setData({userInfo: res.userInfo}))
	},

	onLoad() {
		app.wechat.login()
			.then(res => {
				if (res.code) {
					console.log('登陆成功:' + res.code)
				} else {
					console.error('获取用户登录状态失败:' + res.errMsg)
				}
			})
	}
})
