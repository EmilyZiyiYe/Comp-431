import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'



describe('Validate actions', () => {

  let Action, actions, resource, url
  beforeEach(() => {
    if(mockery.enable) {
      mockery.enable({warnOnUnregistered: false, useCleanCache:true})
      mockery.registerMock('node-fetch', fetch)
      require('node-fetch')
      }
      Action = require('./actions').default
      actions = require('./actions') 
      url=actions.url
      resource=actions.resource
  })

  afterEach(() => {
      if (mockery.enable) {
      mockery.deregisterMock('node-fetch')
      mockery.disable()
      }
  })


  it('resource should be a resource',(done)=>{
  mock(`${url}/sample`, {
    method: 'GET',
    headers: {'Content-Type':'application/json'},
    json:{articles:[{id:1,author:'emily'}]}
  })
  resource('GET','sample')
    .then((response)=>{
      expect(response.articles).to.exist
    })
    .then(done)
    .catch(done)
  })

  it('resource should give he http error',(done)=>{
  mock(`${url}/headline`, {
      method: 'PUT',
      headers: {'Content-Type':'application/json'},
      json: { username: 'Scott', headline: 'Happy' }
    })
    resource('PUT','testheadline')
      .catch((e)=>{
        expect(e).to.exist
      })
      .then(done)
  })

  it('resource should be POSTable',(done)=>{
  mock(`${url}/login`, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    json:{username: "zy13test", result: "success" }
  })
  resource('POST','login',{username: "zy13test", password: "branch-report-their" })
    .then((r)=>{
      expect(r).to.eql({username:'zy13test',result:"success"})
    })
    .then(done)
    .catch(done)
  })

  it('should update error message',()=>{
    expect(actions.showError('test error')).to.eql({type:Action.ERROR, errormsg:'test error'})

  })
  it('should update success message',()=>{
    expect(actions.showSuccess('test success')).to.eql({type:Action.SUCCESS, successmsg:'test success'})

  })
  it('should navigate (to profile, main, or landing)',()=>{
    expect(actions.toMain()).to.eql({type:Action.NAV_MAIN})
    expect(actions.toProfile()).to.eql({type:Action.NAV_PROFILE})
    expect(actions.toLanding()).to.eql({type:Action.NAV_OUT})
  })

})