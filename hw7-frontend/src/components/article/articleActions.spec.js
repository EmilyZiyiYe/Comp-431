import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'


describe('Validate Article actions', () => {

    let Action, actions, articleActions, resource, url
    beforeEach(() => {
        if(mockery.enable) {
        mockery.enable({warnOnUnregistered: false, useCleanCache:true})
        mockery.registerMock('node-fetch', fetch)
        require('node-fetch')
        }
        Action = require('../../actions').default
        actions = require('../../actions') 
        url=actions.url
        resource=actions.resource
        articleActions = require('./articleActions')

    })

    afterEach(() => {
        if (mockery.enable) {
        mockery.deregisterMock('node-fetch')
        mockery.disable()
        }
    }) 


    it('should fetch articles', (done)=>{
        const article_test = [{_id: 1, author: 'emily', avatar:"", comments: [] }]
        mock(`${url}/articles`,{
            method:'GET',
            headers: {'Content-Type':'application/json'},
            json: { articles: article_test}
        })

        articleActions.getArticles()(
            action => {
            expect(action).to.eql({type: Action.LOAD_ARTICLES, articles: article_test})
            done()}
            )
            
    })

    it('should update the search keyword', ()=>{
        articleActions.filterArticle("keyword")((action)=>{
            expect(action).to.eql({type:Action.SEARCH_KEYWORD, keyword:"keyword"})
        })
        
    })



})