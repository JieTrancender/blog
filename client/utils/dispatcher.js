const protobuf = require('../weichatPb/protobuf.js')

class Dispatcher {
	constructor() {
		// 根据协议文件注册
		this.packageList_ = {
			loginGame: 1,
			test: 2,
			login: 3,
		}

		this.packageIdList_ = ['loginGame', 'test', 'login']

		this.operList_ = {
			login: {
				RoleInfo: 1,
				Login: 2,
				LoginR: 3,
			}
		}

		this.operIdList_ = ['RoleInfo', 'Login', 'LoginR']

		this.pbList_ = {
			login:	 require('../protobuf/login.js')
			// login: 
		}
	}

	getId(module, oper) {
		return [this.packageList_[module], this.operList_[module][oper]]
	}

	getPattern(id1, id2) {
		return [this.packageIdList_[id1], this.operIdList_[id2]]
	}

	getProtobufConf(module) {
		// console.log('getProtobufConf', app.protocolConf)
		return this.pbList_[module]
	}

	pack(module, oper, msg) {
		// console.log('pack', module, oper, msg, app.protocolConf)
		let [id1, id2] = this.getId(module, oper)
		let rootConf = this.getProtobufConf(module)
		let ProtobufRoot = protobuf.Root.fromJSON(rootConf)
		let Root = ProtobufRoot.lookupType(module + '.' + oper)

		let strBuf = Root.encode(msg).finish()

		// 两字节长度 + 一字节一级协议 + 两字节二级协议 + 一字节域 + 内容长度
		let size = 4 + strBuf.length
		let buffer = new ArrayBuffer(strBuf.length + 4 + 2)
		let dv = new DataView(buffer, 0)

		dv.setInt16(0, size)
		dv.setInt8(2, id1)
		dv.setInt16(3, id2)
		dv.setInt8(5, 0)

		for (let i = 0; i < strBuf.length; ++i) {
			dv.setInt8(6 + i, strBuf[i])
		}

		return new Uint8Array(buffer)
	}

	dispatch(msg) {
		let dv = new DataView(msg)
		let size = dv.getUint16(0)
		let id1 = dv.getUint8(2)
		let id2 = dv.getUint16(3)
		let s = dv.getUint8(5)

		let buf = new Uint8Array(msg, 6)
		let [module, oper] = this.getPattern(id1 - 1, id2 - 1)
		console.log('dispatch', module, oper)

		let rootConf = this.getProtobufConf(module)
		let ProtobufRoot = protobuf.Root.fromJSON(rootConf)
		let Root = ProtobufRoot.lookupType(module + '.' + oper)
		let message = Root.decode(buf)

		return [module, oper, message]
	}
}

module.exports = {
	Dispatcher,
}