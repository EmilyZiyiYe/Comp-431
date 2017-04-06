import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'
import {updateHeadline} from '../main/headlineActions'

describe('Validate Profile actions (mocked requests)', () => {
let Action, actions, resource, url, actionfile, getInfo
  beforeEach(() => {
    if(mockery.enable) {
      mockery.enable({warnOnUnregistered: false, useCleanCache:true})
      mockery.registerMock('node-fetch', fetch)
      require('node-fetch')
      }
      actionfile = require('../../actions')
      Action = require('../../actions').default
      actions = require('./profileActions')
      getInfo = require('../auth/authActions').getUserInfo
      url=actionfile.url
      resource=actionfile.resource

  })

  afterEach(() => {
      if (mockery.enable) {
      mockery.deregisterMock('node-fetch')
      mockery.disable()
      }
  })
it("should fetch the user's profile information",(done)=>{
  const action_test = {type: Action.UPDATE_PROFILEINFO, headline:'headline', avatar: 'test_avatar', email:'zy13@rice.edu', zipcode:'77005', dob: '11/15/1996'}
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
  getInfo("zy13")(
      (action) => {
        expect(action).to.eql(action_test)
        done()
     })

 })

it('should update headline',(done)=>{
  const username = 'zy13test'
  const headline = 'test headline'
  mock(`${url}/headline`, {
    method: 'PUT',
    headers: {'Content-Type':'application/json'},
    json:{username,headline}
  })
  updateHeadline('does not matter')(
    (fn) => fn((action) => {
    expect(action).to.eql({ 
       type: Action.UPDATE_HEADLINE, headline: headlinetest
    })
    }))
  done()
})
})