import {expect} from 'chai'
const webdriver = require('selenium-webdriver')
import {go, sleep, findId, findCSS, findClassName} from './selenium'
import common from './common'

describe('Test Main Page', () => {

    before('should login and direct user to the main page', (done) => {
        go().then(common.login).then(sleep(500)).then(done)
    })

    it('should create a new article and the article should appear in the feed', (done) => {
		const text = 'new article'
		sleep(200)
		.then(findId("main_postarticle").clear())
		.then(findId("main_postarticle").sendKeys(text))
		.then(sleep(200))
		.then(findId("main_post").click())
		.then(sleep(500))
		.then(findCSS(".main_my_articles")
	            .then((articles)=> {
	            	articles[0].getText()
	            		.then(newtext =>
	            			expect(newtext).to.equal(text)
	            		)
	            })
        )
        .then(done)
    })

    it('should count the number of followed users',(done) => {
		sleep(200)
		.then(findCSS('.follower')
			.then(followers =>{
				expect(followers.length).to.be.ok
			}))
		.then(done)
	})

    it('should add the "Follower" user and verify following count increases by one',(done) => {
		let count
		sleep(200)
		.then(findCSS('.follower')
			.then(followers => {
				count = followers.length
				findId("main_newfollower").sendKeys('Follower')
				findId("main_newfollower_btn").click()
				sleep(2000)
				findCSS('.follower')
				.then(followers => {
					expect(followers.length).to.equal(count+1)
				})
			})
			.then(done))	
	})
	it('should remove the Follower user and verify following count decreases by one',(done) => {
		let remove_count, clickflag
		sleep(200)
		.then(findCSS('.follower')
			.then(followers => {
				remove_count = followers.length
				followers.forEach((follower)=>{
					findId('main_follower_name').getText() 
						.then((text)=>{
							if(text==="Follower"){
								findId("main_unfollow_btn").click()
								clickflag = true
							}
							else{
								clickflag = false
							}
						})
				})
			}))
		sleep(1000)
		findCSS('.follower')
		.then(followers => { 
			if (clickflag){
				expect(followers.length).to.equal(remove_count-1)
			}
			else{
				expect(followers.length).to.equal(remove_count)
			}
		})
		.then(done)	
	})


    it('should edit an article and the article text shoud be updated',(done) => {
            const after_edit = "after edit"
            sleep(200)
            .then(findClassName("main_my_articles").getText())
            .then (text => {
                findClassName("main_my_articles").clear()
                sleep(200)
                findClassName("main_my_articles").sendKeys(after_edit)
                findId('main_editarticle').click()	
                sleep(500)		
                findClassName("main_my_articles").getText()
                    .then(newtext => {
                        expect(newtext).to.equal(after_edit)
                    })
            })
            .then(done)
    })

    it("should update the status headline and verify the change", (done) => {
        var new_headline = 'new headline'
		sleep(200)
        .then(findId("main_newheadline").clear())
		.then(findId("main_newheadline").sendKeys(new_headline))
		.then(findId("main_headline_btn").click())
		sleep(2000)
		.then(findId("main_headline").getText()
			.then(text => {
				expect(text).to.equal(new_headline)
			})
			.then(done))
	})

    it('should search for "Only One Article Like This" and verify only one article shows, and verify the author',(done)=>{
		const searchKey="Only One Article Like This"
		sleep(200) 
		.then(findId("main_search").sendKeys(searchKey))
		sleep(200)

		findCSS(".main_my_articles")
		.then(articles=>{
			expect(articles.length).to.equal(1)
		})
		.then(findId("main_article_title").getText()
                .then(title=>{
                    expect(title.split(' ')[0]).to.equal('zy13test')
			    })
		.then(done))

	})



})