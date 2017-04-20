import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'

describe('Validate Authentication (involves mocked requests)', () => {
    let actionfile, Action, actions, url, resource
    beforeEach(() => {
    if(mockery.enable) {
        mockery.enable({warnOnUnregistered: false, useCleanCache:true})
        mockery.registerMock('node-fetch', fetch)
        require('node-fetch')
        }
        actionfile = require('../../actions')
        Action = require('../../actions').default
        actions = require('./authActions') 
        url = actionfile.url
        resource = actionfile.resource

    })

    afterEach(() => {
        if (mockery.enable) {
        mockery.deregisterMock('node-fetch')
        mockery.disable()
        }
    })
// set up the flag to control that the function only tests the first login action which is the one we care about
var flag = true
it('should log in a user',(done)=>{
    const username='zy13'
    const password='small-climbed-joined'
    mock(`${url}/login`, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        json:{username:"zy13",password:"small-climbed-joined"}
    })
    mock(`${url}/avatars/zy13`, {
    method: 'GET',
    headers: {'Content-Type':'application/json'},
    json:{username:'zy13',avatars:[{avatar:'test_avatar'}]}
    })
    mock(`${url}/headlines/zy13`, {
    method: 'GET',
    headers: {'Content-Type':'application/json'},
    json:{username:'zy13',headlines:[{headline:'headline'}]}
    })
    mock(`${url}/email/zy13`, {
    method: 'GET',
    headers: {'Content-Type':'application/json'},
    json:{username:'zy13',email:'zy13@rice.edu'}
    })
    mock(`${url}/zipcode/zy13`, {
    method: 'GET',
    headers: {'Content-Type':'application/json'},
    json:{username:'zy13',zipcode:'77005'}
    })
    mock(`${url}/dob`, {
    method: 'GET',
    headers: {'Content-Type':'application/json'},
    json:{username:'zy13',dob:'11/15/1996'}
    })
    mock(`${url}/articles`, {
    method: 'GET',
    headers: {'Content-Type':'application/json'},
    json:{username:'zy13',dob:'11/15/1996'}
    })
    mock(`${url}/following`, {
    method: 'GET',
    headers: {'Content-Type':'application/json'},
    json:{username:'zy13',following:["zy13"]}
    })
    actions.login(username,password)(
        (action) => {
            if (flag){
                expect(action).to.eql({ type: Action.LOGIN, username: username})
                flag = false
            }
        }
    )
    done()
})

// set up the flag to control that the function only tests the fist login action which is the one we care about
flag = true
it('should not log in an invalid user',(done)=>{
    const username='invalid'
    const password='branch-report-their'
    mock(`${url}/login`, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        json: {username:username,password:password},
        status: 401
    })
    actions.login(username,password)(
        (action) => {
                expect(action).to.eql({ type:Action.ERROR, errormsg:`There was an error logging in`})
                done()
            }
    )
    
})

it('should log out a user (state should be cleared)',(done)=>{
  mock(`${url}/logout`, {
    method: 'PUT',
    headers: {'Content-Type':'application/json'},
  })
  
  actions.logout()(
        (fn) => fn((action) => {
            expect(action).to.eql({ 
            type:Action.NAV_OUT
            })
        })
    )
  done()
})


})