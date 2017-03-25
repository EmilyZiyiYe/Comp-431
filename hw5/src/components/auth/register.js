import React from 'react'
import { connect } from 'react-redux'
import {register} from './authActions'
import Action, {resource, showError, showSuccess, toMain, toProfile, toLanding} from '../../actions'

//the component that gives the layout of register area
const Register = ({registerAction})=>{

    let username,displayName,email,zipcode,password,passwordCon,birth, phone;
    return (
      <div id="panel panel-default">   
            <h2>Register</h2>
            <div id="panel-body text-center">  
                  <div className="form-group row">
                    <b>Account Name(Start with a letter):</b>
                    <input type="text" name="username" ref={(node) => { username = node }}/ >  
                  </div>
                  <div className="form-group row">
                    <b>Display Name(optional):</b>
                    <input type="text" name="displayname" ref={(node) => { displayName = node }}/>
                  </div>
                  <div className="form-group row">
                    <b>Email address: </b>
                    <input type="text" name="email" placeholder="abc@abc.com" ref={(node) => { email = node }}/>  
                  </div>
                  <div className="form-group row">
                    <b>Phone number: </b>
                    <input type="text" name="phone" placeholder="123-123-1234" ref={(node) => { phone = node }}/>   
                  </div>
                  <div className="form-group row">
                    <b>Date of Birth:</b>
                    <input type="Date" name="dateofbirth" id="dob" required ref={(node) => { birth = node }}/>  
                  </div>
                  <div className="form-group row">
                    <b>Zipcode :</b>
                    <input type="text" name="zipcode" id="zipcode" placeholder="#####" ref={(node) => { zipcode = node }} />  
                  </div>
                  <div className="form-group row">
                    <b>Password:</b>
                    <input type="password" name="pwd" id="pwd" required ref={(node) => { password = node }}/>   
                  </div>
                  <div className="form-group row">
                    <b>Password Confirmation:</b>
                    <input type="password" name="pwd_confirm" id="pwdcon" required  ref={(node) => { passwordCon = node }}/>  
                  </div>
                  <input type="reset" className="btn btn-primary" value="reset"/>
                  <input type="submit" value="Submit" className="btn btn-primary" onClick = {() =>{    
                  registerAction(username.value, email.value, phone.value, birth.value, zipcode.value, password.value, passwordCon.value)}} />
           
            </div> 
  
    </div>

    )  
}

export default connect(null,
  (dispatch) => {
    return {
      registerAction: (username, email, phone, birth, zipcode, password, passwordcon)  => register(username, email, phone, birth, zipcode, password, passwordcon)(dispatch)
    }
  }
  )(Register)







