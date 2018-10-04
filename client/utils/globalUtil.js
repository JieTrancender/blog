const app = getApp()

function setValue(key, value) {
	console.log("global#setValue:", key, value)
	// console.log("globalData", app.globalData.data)
	// app.globalData.data[key] = value
	// console.log("galoeb:", app.globalData.userInfo)
	console.log("app", app)
}

module.exports = {
	setValue,
}