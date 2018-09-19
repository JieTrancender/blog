// 获取全局应用程序实例对象
const app = getApp()

Page({
	data: {
		movies: [],
		loading: true,
		indicatorDots: false,
		autoplay: false,
		interval: 5000,
		duration: 1000,

		imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
	},

	getCache() {
		console.log("getCache")
		return new Promise(resolve => {
			app.wechat.getStorage('last_splash_data')
				.then(res => {
					const {movies, expires} = res.data

					console.log("getStorage last_splash_data", res.data, {movies, expires})

					// 有缓存判断是否过期
					if (movies && expires > Date.now()) {
						return resolve(res.data)
					}

					// 已经过期
					console.log("uncached")
					return resolve(null)
				})
				.catch(e => resolve(null))
		})
	},

	handleStart() {
		wx.switchTab({
			url: '../board/board'
		})
	},

	onLoad() {
		console.log("splash loading...")
		this.getCache()
			.then(cache => {
				if (cache) {
					return this.setData({movies: cache.movies, loading: false})
				}

				app.douban.find('coming_soon', 1, 3)
					.then(d => {
						this.setData({movies: d.subjects, loading: false})
						return app.wechat.setStorage('last_splash_data', {
							movies: d.subjects,
							expires: Date.now() + 1 * 24 * 60 * 60 * 1000
						})
					})
					.then(() => console.log('storage last splash data'))
			})
	},

	onReady() {

	},

	onShow() {
		console.log("onShow", this.data)
	},

	onHide() {
		console.log("onHide", this.data)
	},

	onUnload() {

	},

	onPullDownRefresh() {
		console.log("onPullDownRefresh", this.data)
	}
})
