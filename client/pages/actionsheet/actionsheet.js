Page({
	open: function() {
		wx.showActionSheet({
			itemList: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
			success: function(res) {
				if (!res.cancel) {
					console.log(res.tapIndex)
				}
			}
		})
	}
})
