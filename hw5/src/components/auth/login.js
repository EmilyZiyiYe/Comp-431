import React from 'react'
import {connect} from 'react-redux'
import {login} from './authActions'

//the component that gives the layout of login area
const Login = ({ loginAction })=> {
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
                    <input type="password" id="index_login_password" required ref={(node) => { password = node }}/>
                </div>
                <input type="submit" id="login_btn" value="Login" className="btn btn-primary" onClick={() => loginAction(username.value, password.value)} />
            </div>
        </div>
    )
}


export default connect(null,
  (dispatch) => {
    return {
      loginAction: (username, password) => login(username, password)(dispatch)
    }
  }
  )(Login)