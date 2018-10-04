const app = getApp()

Page({
	data: {
		logs:[]
	},
	onLoad: function() {
		console.log("logs load")
		app.wechat.getStorage('loginLogs')
			.then(res => {
				this.setData({
					logs: (res.data || []).map(log => {
						return {code: log.code, dt: app.util.formatTime(new Date(log.dt))}
					})
				})
			})
	},
	onShow: function() {
		console.log('logs', this.data.logs)
		// this.data.logs.map(log => {
		// })
	}
})