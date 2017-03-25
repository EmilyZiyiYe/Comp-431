import { expect } from 'chai'
import mockery from 'mockery'
import Action from './actions'
import Reducer from './reducers'

const initial_state = {
	location: "", errormsg:"",successmsg:"",keyword:"",followers: [],
    profile: {username:'', headline: '', avatar: '', zipcode: '', email: '', dob: ''},
    articles: [],articles_shown: []
	}

describe('Validate reducer', ()=> {
	it('should initialize state', ()=>{
		expect(Reducer(undefined,{})).to.eql(initial_state)
	})

	it('should state success',()=> {
		expect(Reducer(undefined, {type:Action.SUCCESS, successmsg:"test sucess"}))
		.to.eql({...initial_state, successmsg:"test sucess"})
	})

	it('should state error',()=> {
		expect(Reducer(undefined, {type:Action.ERROR, errormsg:"test error"}))
		.to.eql({...initial_state, errormsg:"test error"})

	})
	it('should set the articles',()=> {
		const test_articles = [{id : "1", text : 'I am emily', date : "today", img : null, comments : "comments", author :"emily", displayflag : false},
								{id : "2", text : 'I am ziyi', date : "today", img : null, comments : "comments", author :"emily", displayflag : false}
							]		
		expect(Reducer(undefined,{type:Action.LOAD_ARTICLES, articles: test_articles}))
		.to.eql({ ...initial_state, articles_shown: test_articles, articles: test_articles})
	})
	it('should set the search keyword',()=> {
		expect(Reducer(undefined,{type:Action.SEARCH_KEYWORD, keyword:'test keyword'}))
		.to.eql({ ...initial_state, keyword: 'test keyword'})
	})

	it('should filter displayed articles by the search keyword',()=> {
		const test_articles = [{id : "1", text : 'I am emily', date : "today", img : null, comments : "comments", author :"emily", displayflag : false},
								{id : "2", text : 'I am ziyi', date : "today", img : null, comments : "comments", author :"emily", displayflag : false}
							]
		const state_test = {
							location: "", errormsg:"",successmsg:"",keyword:"",followers: [],
							profile: {username:'', headline: '', avatar: '', zipcode: '', email: '', dob: ''},
							articles: test_articles,articles_shown: test_articles
							}

		expect(Reducer(state_test,{type:Action.SEARCH_KEYWORD, keyword:'emily'}))
		.to.eql({ ...initial_state, 
			keyword: "emily", 
			articles:test_articles,
			articles_shown: 
			[{id : "1", text : 'I am emily', date : "today", img : null, comments : "comments", displayflag : false, author :"emily"}]
		})
	})
})





