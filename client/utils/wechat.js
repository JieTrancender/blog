function getSetting() {
	return new Promise((resolve, reject) => {
		wx.getSetting({success: resolve, fail: reject})
	})
}

function getUserInfo() {
	return new Promise((resolve, reject) => {
		wx.getUserInfo({success: resolve, fail: reject})
	})
}

function navigateTo(path) {
	return new Promise((resolve, reject) => {
		wx.navigateTo({url: path, success: resolve, fail: reject})
	})
}

function login() {
	return new Promise((resolve, reject) => {
		wx.login({success: resolve, fail: reject})
	})
}

/**
 *    异步键值对本地存储
 *    @method setStorage
 *    @author JTrancender 2018-10-03
 *    @param  {string} key
 *    @param  {string/object} value
 *    @return {string: errMsg}
 */
function setStorage(key, value) {
	return new Promise((resolve, reject) => {
		wx.setStorage({key: key, data: value, success: resolve, fail: reject})
	})
}

/**
 *    同步按键值对本地存储
 *    @method setStorageSync
 *    @author JTrancender 2018-10-03
 *    @param  {string} key
 *    @param  {string/object} value
 */
function setStorageSync(key, value) {
	wx.setStorageSync(key, value)
}

/**
 *    异步按键获取本地存储
 *    @method getStorage
 *    @author JTrancender 2018-10-03
 *    @param  {string} key
 *    @return {string/object: data}
 */
function getStorage(key) {
	return new Promise((resolve, reject) => {
		wx.getStorage({key: key, success: resolve, fail: reject})
	})
}

/**
 *    同步按键获取本地存储
 *    @method getStorageSync
 *    @author JTrancender 2018-10-03
 *    @param  {string} key
 *    @return {string/object}
 */
function getStorageSync(key) {
	return wx.getStorageSync(key)
}

/**
 *    异步获取本地存储信息
 *    @method getStorageInfo
 *    @author JTrancender 2018-10-03
 *    @return {string array: keys, number: currentSize, number: limitSize}
 */
function getStorageInfo() {
	return new Promise((resolve, reject) => {
		wx.getStorageInfo({success: resolve, fail: reject})
	})
}

/**
 *    同步获取本地存储信息
 *    @method getStorageInfoSync
 *    @author JTrancender 2018-10-03
 *    @return {string array: keys, number: currentSize, number: limitSize}
 */
function getStorageInfoSync() {
	return wx.getStorageInfoSync()
}

/**
 *    异步按键删除本地存储
 *    @method removeStorage
 *    @author JTrancender 2018-10-03
 *    @param  {string} key
 *    @return {nil}
 */
function removeStorage(key) {
	return new Promise((resolve, reject) => {
		wx.removeStorage({key: key, success: resolve, fail: reject})
	})
}

/**
 *    同步指键删除本地存储
 *    @method removeStorageSync
 *    @author JTrancender 2018-10-03
 *    @param  {string} key
 */
function removeStorageSync(key) {
	wx.removeStorageSync(key)
}

/**
 *    异步清除本地所有存储
 *    @method clearStorage
 *    @author JTrancender 2018-10-03
 *    @return {nil}
 */
function clearStorage() {
	return new Promise((resolve, reject) => {
		wx.clearStorage()
	})
}

/**
 *    同步清除本地所有存储
 *    @method clearStorageSync
 *    @author JTrancender 2018-10-03
 *    @return {nil}
 */
function clearStorageSync() {
	wx.clearStorageSync()
}

function getLocation(type) {
	return new Promise((resolve, reject) => {
		wx.getLocation({type: type, success: resolve, fail: reject})
	})
}

module.exports = {
	getSetting,
<<<<<<< HEAD
=======
	getUserInfo,

	login,
>>>>>>> 8e0924b7459b463467724f267322413f71f7eb8e
	getUserInfo,
	navigateTo,
	login,
	setStorage,
	setStorageSync,
	getStorage,
	getStorageSync,
	getStorageInfo,
	getStorageInfoSync,
	removeStorage,
	removeStorageSync,
	clearStorage,
	clearStorageSync,
	// getUserInfo,
	getLocation,
	original: wx
}