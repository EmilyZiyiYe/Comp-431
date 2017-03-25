export const url = 'https://webdev-dummy.herokuapp.com'
import fetch from 'isomorphic-fetch';
const Action = {

     ADD_ARTICLE: 'ADD_ARTICLE'
    ,LOAD_ARTICLES: 'LOAD_ARTICLES'
    ,UPDATE_PROFILEINFO: 'UPDATE_PROFILEINFO'
    ,SEARCH_KEYWORD: 'SEARCH_KEYWORD'
    ,UPDATE_HEADLINE: 'UPDATE_HEADLINE'
    ,UPDATE_DISPLAY: 'UPDATE_DISPLAY'
    ,UPDATE_EMAIL: 'UPDATE_EMAIL'
    ,UPDATE_ZIPCODE: 'UPDATE_ZIPCODE'
    ,UPDATE_PHONE: "UPDATE_PHONE"
    ,UPDATE_PASSWORD: 'UPDATE_PASSWORD'
    ,LOAD_FOLLOWERS:'LOAD_FOLLOWERS'
    ,REMOVE_FOLLOWER: 'REMOVE_FOLLOWER'
    ,ADD_FOLLOWER: 'ADD_FOLLOWER'
    ,CHANGE_FLAG: "CHANGE_FLAG"

    ,ERROR: 'ERROR'
    ,SUCCESS: 'SUCCESS'

    ,NAV_PROFILE: 'NAV_PROFILE'
    ,NAV_MAIN: 'NAV_MAIN'
    ,NAV_OUT: 'NAV_OUT'

    ,LOGIN: 'LOGIN'
    ,LOGOUT: 'LOGOUT'
}

export default Action


export function showError(msg){
    return {type:Action.ERROR, errormsg: msg}
    }


export function showSuccess(msg){
    return {type:Action.SUCCESS, successmsg: msg}
}

export function toProfile() { 
   return {type:Action.NAV_PROFILE}
}
export function toMain() { 
   return {type:Action.NAV_MAIN}
}
export function toLanding() { 
   return {type:Action.NAV_OUT}
}

export const resource = (method, endpoint, payload) => {
  const options =  {
    method,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  if (payload) options.body = JSON.stringify(payload)

  return fetch(`${url}/${endpoint}`, options)
    .then((r) => {
      if (r.status === 200) {
        return (r.headers.get('Content-Type').indexOf('json') > 0) ? r.json() : r.text()
      } else {
        // useful for debugging, but remove in production
        console.error(`${method} ${endpoint} ${r.statusText}`)
        throw new Error(r.statusText)
      }
    })
}

