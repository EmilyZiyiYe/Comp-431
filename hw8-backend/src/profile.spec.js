'use strict'

const expect = require('chai').expect
const fetch = require('isomorphic-fetch')

const url = path => `http://localhost:3000${path}`


describe('Validate Profile', () => {
	
	it('should update the status headline and verify the change', (done) => {
        let newheadline = "new headline"
        let username
        fetch(url("/headlines"), {
            "method" : 'GET',
            "headers": {'Content-Type' : 'application/json' }
        })
        .then(res => {
            expect(res.status).to.eql(200)
            return res.json()
        })
        .then(body => {
            username = body.headlines[0].username
        })
        .then(_=>{

            return fetch(url("/headline"), {
                "headers": {'Content-Type': 'application/json'},
                "method": 'PUT',
                "body": JSON.stringify({"headline": newheadline})
            })            
        })
        .then((res)=>{
            expect(res.status).to.eql(200)
            return res.json()
        })
        .then(body => {
            expect(body.headline).to.equal(newheadline)
        })

        .then(_=>{
            return fetch(url("/headlines/" + username), {
                "method": 'GET',
                "headers": {'Content-Type': 'application/json'}
            })
        })
        .then(res => {
            return res.json()
        })
        .then(body => {
            expect(body.headlines[0].headline).to.equal(newheadline)
        })
        .then(done)
        .catch(done)
    
    }, 200)


})