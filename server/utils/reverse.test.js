const reverse = require('./fortesting.js').reverse
const average = require('./fortesting.js').average
const myApiCheck = require('./fortesting.js').apiCheck
const fetch = require('node-fetch')

test('reverse of a ', () => {
	const result = reverse('a')
	expect(result).toBe('a')
})

test('palindrome of react', () => {
	const result = reverse('react')
	expect(result).toBe('tcaer')
})

describe('average', () => {
	test('of many is calculated right', () => {
		expect(average([1, 2, 3, 4, 5, 6])).toBe(3.5)
	})
})

test('dummy return one', () => {
	const blogs = []
	fetch('http://localhost:3002/api/notes/blog/list')
		.then((res) => res.json())
		.then((data) => blogs.push(data))
	const result = myApiCheck.apiCheck(blogs)
	expect(result).toBe(1)
})

// test('average of number',()=>{

//     const average=average([1,2,8,1]);

//     expect(average).toBe(3);
// })

// test('reverse of b',()=>{
//     const result
// })
