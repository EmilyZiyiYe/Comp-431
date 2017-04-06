import { expect } from 'chai'
import { go, sleep, findId} from './selenium'
import common from './common'

describe('Test Landing Page', () => {

    before('should register a new user', (done) => {
        go().then(common.register).then(done)
    })
    it('should register new user',(done)=>{
        sleep(200)
            .then(findId('successmsg').getText()
            .then(text => {
                expect(text).to.equal("You have successfully registered")
            })
            .then(done))
    })
    it('should login as test user', (done) => {
    const user = common.creds.username
    sleep(200)
    .then(common.login)
    .then(findId('main_user').getText()
        .then(text => {
            expect(text).to.equal(user)
        })
        .then(done))
    })

})