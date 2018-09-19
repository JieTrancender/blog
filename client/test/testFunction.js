function log(x, y) {
	// y = y || 'World' //false

	if (typeof y === 'undefined') {
		y = 'World'
	}

	console.log(x, y)
}

log('Hello')
log('Hello', 'China')
log('Hello', '')

function log(x, y = 'World') {
	console.log(x, y)
}

log('Hello')
log('Hello', 'China')
log('Hello', '')

function foo({x, y = 5} = {}) {
	console.log(x, y)
}

foo({})
foo({x: 1})
foo({x: 1, y: 2})
// foo()

function throwIfMissing() {
	throw new Error('Missing parameter')
}

function foo(mustBeProvided = throwIfMissing()) {
	return mustBeProvided
}

foo(() => 3)

const sortNumbers = (...numbers) => numbers.sort()

function push(array, ...items) {
	items.forEach(function(item) {
		array.push(item)
		console.log(item)
	})
}

var a = []
push(a, 1, 2, 3)
console.log(a)

var f = function() {}

console.log(f.name, f)


var f = v => v;

console.log(f(23))

var f = () => 4;
var f = function() { return 4 }

var sum = (num1, num2) => num1 + num2
var sum = function(num1, num2) {
	return num1 + num2
}

