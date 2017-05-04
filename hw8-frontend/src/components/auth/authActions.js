import Action, {resource, showError, showSuccess, toMain, toProfile, toLanding} from '../../actions'
import Promise from 'bluebird'
import {getArticles} from '../article/articleActions'
import {getFollower} from '../main/followingActions'

export const getUserInfo = (username) => (dispatch) => {
    //initialize the action of updating profile info that will eventially be dispatched to reducer
    const action = {type: Action.UPDATE_PROFILEINFO}
    //request to the sever to get given user's info
    const headline = resource('GET', 'headlines/'+ username)
    .then((r) => {
        action.headline = r.headlines[0].headline
    })
    const avatar = resource('GET', 'avatars/'+ username)
    .then((r) => {
        action.avatar = r.avatars[0].avatar
    })
    const email = resource('GET', 'email/'+ username)
    .then((r) => {
        action.email = r.email
    })
    const zipcode = resource('GET', 'zipcode/'+ username)
    .then((r) => {
        action.zipcode = r.zipcode
    })
    const dob = resource('GET', 'dob')
    .then((r) => {
        action.dob = r.dob
    })
    //dispatch the action defined before to the reducer
    Promise.all([headline, avatar, email, zipcode, dob]).then(() => {
        dispatch(action)
    })
}

export function initialVisit() {
    return (dispatch) => {
        //make a random request to server just to see whether the user is logged in or not
        resource('GET', 'email').then((response) => {
            dispatch(toMain())
            dispatch({type: Action.LOGIN, username: response.username})
            getUserInfo(response.username)(dispatch)
            getArticles()(dispatch)
            getFollower(dispatch)
        }).catch((err) => {
        })
    }
}

export function login(username, password) {
    return (dispatch) => {
        resource('POST', 'login', { username: username, password: password })
        .then((r) => {
            //send the action of login and directing to main page to reducer
            dispatch({type: Action.LOGIN, username: r.username})
            dispatch(toMain())
        })
        .then(() => {
            //fetch articles, loggedin user info as well as user's followers
            getArticles()(dispatch)
            getUserInfo(username)(dispatch)
            getFollower(dispatch)
        })
        .catch((err) => {
            dispatch(showError(`There was an error logging in`))
        })
    }
}

export function thirdParty() {
    return (dispatch) => {
        window.top.location = "https://quiet-eyrie-63276.herokuapp.com/login/facebook"
    }
}

export function logout() {
    return (dispatch) => {
        resource('PUT', 'logout')
        .then((r) => {
            dispatch(toLanding())
        
        })
        .catch((err) => {
            dispatch(toLanding())
        })
    }
}

export const register = (username, email, phone, birth, zipcode, password, passwordCon) => (dispatch) => {
    //variable flag indicates whether there is missing information
    var flag = true
    //to check whether there is missing information
    var info = [username, email, phone, birth, zipcode, password, passwordCon]
    info.forEach((info)=>{
        if((info)===""){
            flag = false
            dispatch(showError("Please complete all the required fields"))
            return 
        }
    })
    //validate whether the input information matches with the format
    if (username) {
        if (!username.match('^[a-zA-Z][a-zA-Z0-9]+')) {
            dispatch(showError("Invalid username.Can't start with a number"))
            return
        }
    }
    if (email) {
        if (!email.match('^[a-zA-Z0-9]+@[a-zA-Z0-9]+\\.[a-zA-Z][a-zA-Z]+$')) {
            dispatch(showError("Invalid email. Follow the format:abc@abc.abc"))
            return
        }
    }
    if (zipcode) {
        if (!zipcode.match('^[0-9]{5}$')) {
            dispatch(showError("Invalid zipcode. Must be five digits"))
            return
        }
    }
    if (phone) {
        if (!phone.match("[0-9]{3}-[0-9]{3}-[0-9]{4}")){
            dispatch(showError("Invalid phone.Follow the format: 123-123-1234"))
            return
        }
    }
    if (birth){
        if (!birth.match("^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$")){
            dispatch(showError("Invalid day of birth.Follow the format: MM/DD/YYYY"))
            return
        }

    }
    //turn birthday info from string to date object
    var dateParts = birth.split("/");
    var bd = new Date(dateParts[2], dateParts[1] - 1, dateParts[0])
    var today = new Date()
    //get the age 
  	var age = today.getFullYear() - bd.getFullYear()
  	var age_month = today.getMonth() - bd.getMonth()
  	var age_day = today.getDate() - bd.getDate()
    if (age_month < 0 || (age_month === 0 && age_day < 0)) {
      age--;
    }
	if(age < 18){
		dispatch(showError("Minimum age for registration is 18"))
        return 
	}
    if (password != passwordCon) {
    	dispatch(showError("passwords do not match"))
        return
    } 
    // if the information in the form passes validation
    if (flag && (age >= 18)&&(password == passwordCon)){
        const dob = birth;
        resource('POST', 'register', {username, email, dob, zipcode, password})
        .then((response) => {
            dispatch(showSuccess("You have successfully registered"))
        })
        .catch((error) => {
            dispatch(showError("There was an error registering"))
        })
    }
}
