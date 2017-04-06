import React from 'react'
import TestUtils from 'react-addons-test-utils'
import { findDOMNode } from 'react-dom'
import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'
import { ArticleDiv }  from './article'

const findByClassname = (children, classname) => {
    const result = Array.prototype.filter.call(children, (it) => it.className.indexOf(classname) >= 0)
    return result.length ? result[0] : null
}
describe('ArticlesView', () => {
    let actionfile, Action, actions, url, resource
    beforeEach(() => {
    if(mockery.enable) {
        mockery.enable({warnOnUnregistered: false, useCleanCache:true})
        mockery.registerMock('node-fetch', fetch)
        require('node-fetch')
        }
        actionfile = require('../../actions')
        Action = require('../../actions').default
        actions = require('./articleActions') 
        url = actionfile.url
        resource = actionfile.resource

    })

    afterEach(() => {
        if (mockery.enable) {
        mockery.deregisterMock('node-fetch')
        mockery.disable()
        }
    })
    it('should render articles', () => {
     const node = TestUtils.renderIntoDocument(
        <div>
        <ArticleDiv key={1} _id={1} text={"hello"} img = {"test img"} date={"today"}  author='emily' displayflag={false} showAct={()=>{}} comments={[]}  ></ArticleDiv>
        </div>)
    const elements = findDOMNode(node).children[0]
    expect(elements.children).to.have.length(1)
    const content=findByClassname(elements.children[0].children[1].children,"article-text")
    expect(content.innerHTML).to.eql("hello")
    })
    it('should dispatch actions to create a new article',()=>{
        const article_test = [{_id: 1, author: 'emily', avatar:"", comments: [] }]
        mock(`${url}/article`, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        json: {articles: article_test}
    })
    actions.addArticle("hello")(
        (action) => {
            expect(action).to.eql({type: Action.ADD_ARTICLES, article:{_id: 1, author: 'emily', avatar:"", comments: [], text: "hello", displayflag:false } })
            }
        
    )
    })
})