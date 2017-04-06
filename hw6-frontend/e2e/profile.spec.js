import { expect } from 'chai'
import { go, sleep, findId, findCSS,findElements,By,driver } from './selenium'


describe('Test Profile Page', () => {

    before('should update the user email and verify', (done) => {
    	findId("profile_btn").click()
    	.then(sleep(200))
    	.then(done)
    })

    it('should update the user email and verify', (done) =>{
    	const new_email = 'newemail@rice.edu'
    	sleep(200)
    	.then(findId('profile_email').sendKeys(new_email))
        .then(sleep(300))
    	.then(findId("profile_btn").click())
        .then(sleep(300))
    	.then(findId('profile_show_email').getText()
    		.then(text => {
    			expect(text).to.equal(new_email)
    		})
    	.then(done))
    })

    it('should update the user zipcode and verify', (done) =>{
    	var new_zipcode = '77777'
    	sleep(200)
    	.then(findId('profile_zipcode').sendKeys(new_zipcode))
        .then(sleep(300))
    	.then(findId('profile_btn').click())
        .then(sleep(300))
    	.then(findId('profile_show_zipcode').getText()
    		.then(text => {
    			expect(text).to.equal(new_zipcode)
    		})
    	.then(done))
    })

    it('should update the user password and verify', (done) =>{
    	var password = '123'
    	var passwordcon = '123'
    	sleep(200)
    	.then(findId('profile_password').sendKeys(password))
    	.then(findId('profile_passwordcon').sendKeys(passwordcon))
        .then(sleep(200))
    	.then(findId('profile_btn').click())
        .then(sleep(300))
    	.then(findId('successmsg').getText()
    		.then(text => {
    			expect(text).to.equal('Password will not change')
    		})
    	.then(done))
    })
})