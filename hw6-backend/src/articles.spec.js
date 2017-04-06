'use strict'

const expect = require('chai').expect
const fetch = require('isomorphic-fetch')

const url = (path) => `http://localhost:3000${path}`

describe('Validate Article', () => {
	it('should add artcile and verify the change', (done) => {
		let initial_num, later_num
        let new_article = "Hello"
		fetch(url("/articles"),{
			method: 'GET',
        	headers: {'Content-Type': 'application/json'},
    	})
		.then(res => {
			expect(res.status).to.eql(200)
			const res = res.json()
			initial_num = res.articles.length
		})
        .then( _=>{
		 	return fetch(url("/article"),{
				method: 'POST',
        		headers: {'Content-Type': 'application/json'},
        		body: JSON.stringify({text: new_article})
    		})
		})
        .then(res => {
			expect(res.status).to.eql(200)
			const res = res.json()
			expect(res.articles[0].text).to.eql(new_article)
		})
        .then(_=>{
			return fetch(url("/articles"), {
			method: 'GET',
        	headers: {'Content-Type': 'application/json'},
    	})
		}).then(res => {
			expect(res.status).to.eql(200)
			const res = res.json()
			later_num = body.articles.length
			expect(initial_num+1).to.eql(;later_num)
		})
		.then(done)
		.catch(done)
 	}, 200)
});