export const url = 'https://secure-eyrie-54523.herokuapp.com'
import fetch from 'isomorphic-fetch';
const Action = {

     ADD_ARTICLE: 'ADD_ARTICLE'
    ,LOAD_ARTICLES: 'LOAD_ARTICLES'
    ,EDIT_ARTICLE: 'EDIT_ARTICLE'
    ,UPDATE_PROFILEINFO: 'UPDATE_PROFILEINFO'
    ,SEARCH_KEYWORD: 'SEARCH_KEYWORD'
    ,UPDATE_HEADLINE: 'UPDATE_HEADLINE'
    ,UPDATE_DISPLAY: 'UPDATE_DISPLAY'
    ,UPDATE_EMAIL: 'UPDATE_EMAIL'
    ,UPDATE_ZIPCODE: 'UPDATE_ZIPCODE'
    ,UPDATE_PHONE: "UPDATE_PHONE"
    ,UPDATE_PASSWORD: 'UPDATE_PASSWORD'
    ,UPDATE_AVATAR: 'UPDATE_AVATAR'
    ,LOAD_FOLLOWERS:'LOAD_FOLLOWERS'
    ,REMOVE_FOLLOWER: 'REMOVE_FOLLOWER'
    ,ADD_FOLLOWER: 'ADD_FOLLOWER'
    ,CHANGE_FLAG: "CHANGE_FLAG"
    ,COMMENT_FLAG:"COMMENT_FLAG"
    ,FILE_FLAG:"FILE_FLAG"

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

export const resource = (method, endpoint, payload, isJson=true) => {
  const options =  {
    method,
    credentials: 'include',
  }
  if(isJson){
  	options.headers={
      'Content-Type': 'application/json'
    }
    if (payload) options.body = JSON.stringify(payload)
  }
  else{
  	if(payload) options.body=payload
  }

  return fetch(`${url}/${endpoint}`, options)
    .then((r) => {
      if (r.status === 200) {
        return (r.headers.get('Content-Type').indexOf('json') > 0) ? r.json() : r.text()
      } else {
        throw new Error(r.statusText)
      }
    })
}


