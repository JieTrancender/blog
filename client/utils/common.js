function array_del(arr, value) {
	let [j, length] = [0, arr.length]
	for (let i = 0; i < length; ++i) {
		if (arr[i] !== value) {
			arr[j] = arr[i]
			++j
		}
	}

	for (let i = j; i < length; ++i) {
		arr.pop()
	}
}

function array_del_if(arr, func) {
	let [j, length] = [0, arr.length]
	for (let i = 0; i < length; ++i) {
		if (!func(arr[i])) {
			arr[j] = arr[i]
			++j
		}
	}

	for (let i = j; i < length; ++i) {
		arr.pop()
	}
}

export {array_del, array_del_if}