import {expect} from 'chai'
import {findId, sleep} from './selenium'

exports.creds = {
    username: 'zy13test',
    password: 'branch-report-their'
}

exports.newUser = {
    username: 'ziyi',
    displayname:"emily",
    email: 'zy13@rice.edu',
    phone: "346-212-0646",
    dob: '11/15/1996',
    zipcode: '77005',
    password: "test",
    passwordcon: 'test'
}
exports.login = () =>
    sleep(500)
        .then(findId('login_username').clear())
        .then(findId('login_password').clear())
        .then(findId('login_username').sendKeys(exports.creds.username))
        .then(findId('login_password').sendKeys(exports.creds.password))
        .then(findId('login_btn').click())
        .then(sleep(2000))

exports.register= () =>
    sleep(500)
        .then(findId('register_username').clear())
        .then(findId('register_displayname').clear())
        .then(findId('register_email').clear())
        .then(findId('register_phone').clear())
        .then(findId('register_zipcode').clear())
        .then(findId('register_password').clear())
        .then(findId('register_passwordcon').clear())
        .then(findId('register_username').sendKeys(exports.newUser.username))
        .then(findId('register_displayname').sendKeys(exports.newUser.displayname))
        .then(findId('register_email').sendKeys(exports.newUser.email))
        .then(findId('register_phone').sendKeys(exports.newUser.phone))
        .then(findId('register_dob').sendKeys(exports.newUser.dob))
        .then(findId('register_zipcode').sendKeys(exports.newUser.zipcode))
        .then(findId('register_password').sendKeys(exports.newUser.password))
        .then(findId('register_passwordcon').sendKeys(exports.newUser.passwordcon))
        .then(findId('register_btn').click())
        .then(sleep(2000))
