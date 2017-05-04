import React from 'react'
import {connect} from 'react-redux'
import {login, thirdParty} from './authActions'

//the component that gives the layout of login area
const Login = ({ loginAction, thirdpartyAct })=> {
    let username, password
    return (
        <div id="panel panel-default ">   
            <h2>Login</h2>
            <div id="panel-body text-center">  
                <div className="form-group row">
                    <b>Username: </b>
                    <input type="text" id="login_username" required ref={(node) => { username = node }}/>
                </div>
                <div className="form-group row">
                    <b>Password: </b>
                    <input type="password" id="login_password" required ref={(node) => { password = node }}/>
                </div>
                <input type="submit" id="login_btn" value="Login" className="btn btn-primary" onClick={() => loginAction(username.value, password.value)} />
                <div className="form-group row">
                <input type="image" width="200" src="https://drmqjozm1bc8u.cloudfront.net/images/responsive/fb_login_button.png" id="third party" onClick = { () => thirdpartyAct() }/>
                </div>
            </div>
        </div>
    )
}


export default connect(null,
  (dispatch) => {
    return {
      loginAction: (username, password) => login(username, password)(dispatch),
      thirdpartyAct: () => thirdParty()(dispatch)
    }
  }
  )(Login)