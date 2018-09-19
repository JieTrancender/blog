const app = getApp();

var util = require('../weichatPb/src/util.js');
var protobuf = require('../weichatPb/protobuf.js');
app.globalData._protobuf = protobuf;

//awesome
var awesomeConfig = require('../js/awesome');
var AwesomeRoot = protobuf.Root.fromJSON(awesomeConfig);
var AwesomeMessage = AwesomeRoot.lookupType("AwesomeMessage");

//test
var testConfig = require('../js/test');
var TestRoot = protobuf.Root.fromJSON(testConfig);

var Simple1 = TestRoot.lookupType('jspb.test.Simple1');

function getMessageFromJspbTest(messageName) {
	return TestRoot.lookupType('jspb.test.' + messageName);
}

var testMap = {};

function printDump(className, obj, buffer) {
	console.log(className, obj, "\n buffer", buffer);
}

function testIt(testName, testProcess) {
	testMap[testName] = testProcess;
}

function testWithName(testName) {
	var testProcess = testMap[testName];
	console.log("现在测试:", testName);
	testProcess ? testProcess() : console.warn('没有' + testName + '的测试过程');
}

function testAll() {
	for (var testName in testMap) {
		if (!testMap.hasOwnProperty(testName)) continue;

		testWithName(testName);
	}
}

function test1() {
	var payload = {awesomeField: '我是test1'};
	var message = AwesomeMessage.create(payload);
	var buffer = AwesomeMessage.encode(message).finish();
	console.log("buffer", buffer);

	var deMessage = AwesomeMessage.decode(buffer);
	console.log("deMessage:", message);
}

function test2() {
	var payload = {awesomeField: '我是test2'};
	var message = AwesomeMessage.create(payload);
	var buffer = AwesomeMessage.encode(message).finish();
	console.log('buffer', buffer);

	var deMessage = AwesomeMessage.decode(buffer);
	console.log("deMessage:", deMessage);
}

function test3() {
	var simple1 = Simple1.create();
	simple1['aString'] = 'foo';
	simple1.aRepeatedString = ['1', '2'];
	simple1.aBoolean = true;

	var buffer = simple1.encode().finish();
	printDump('encode simple1:', simple1, buffer);

	var deMessage = Simple1.decode(buffer);
	printDump('decode simple1:', deMessage, buffer)
}

testIt('test1', test1);
testIt('test2', test2);
testIt('test3', test3);


testIt('testEmpty', function() {
	var Empty = getMessageFromJspbTest('Empty');
	var empty1 = Empty.create();

	console.log('empty1 to Object', empty1.toObject());
});

testIt('testExtensions', function() {
	var IsExtension = getMessageFromJspbTest('IsExtension');
	var extension = IsExtension.create();

	extension.ext1 = 'ext1fieldhgvvffsd';
	console.log('extension:', extension);

	var HasExtensions = getMessageFromJspbTest('HasExtensions');
	var hasExtensions = HasExtensions.create();
	hasExtensions.str1 = 'v1';
	hasExtensions.str2 = 'v2';
	hasExtensions.str3 = 'v3';
	hasExtensions['.jspb.test.IsExtension.extField'] = extension;

	var buffer = hasExtensions.encode().finish();
	printDump('encode hasExtensions', hasExtensions, buffer);

	var deMessage = HasExtensions.decode(buffer);
	printDump('decode hasExtensions', deMessage, buffer);
});


testAll();


