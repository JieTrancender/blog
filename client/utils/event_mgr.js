import {array_del_if} from './common.js'

class EventMgr {
	constructor() {
		this._eventList = {}

		console.log('EventMgr', this)
	}

	observe = (event, obj, func) => {
		let observeList = this._eventList[event]
		console.log('EventMgr#observe', event, obj, func)
		if (Array.isArray(observeList)) {
			observeList.push({obj: obj, func: func})
		} else {
			this._eventList[event] = [{obj: obj, func: func}]
		}
	}

	trigger = (event, args) => {
		let observeList = this._eventList[event]
		console.log('EventMgr#trigger', event, args, observeList)
		if (Array.isArray(observeList)) {
			observeList.map((ele) => {
				let func = ele.func
				func.call(ele.obj, args)
			})
		}
	}

	cancel = (event, obj, func) => {
		let observeList = this._eventList[event]
		if (Array.isArray(observeList)) {
			array_del_if(observeList, (ele) => {
				return ele.obj === obj
			})
		}
	}
}

let eventMgr = new EventMgr()

export {eventMgr}