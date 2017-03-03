import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { updateProfile } from './profileActions'

//Display the form for updating current user info
export const ProfileForm = ({updateAct}) => {

	let displayname, phone, email, zipcode, password, passwordcon;

	return (
		<div>
			<div className="panel panel-default">
				<div className="panel-heading"><h2>Update Profile Information</h2></div>
				<div className="panel-body">
					<form id="update_form">

						<div className="form-group">
							<b>Display Name: </b>
							<input type="text" ref={(node) => {displayname = node}} />
						</div>

						<div className="form-group">
							<b>Phone number: </b>
							<input type="text" pattern="[\d]{3}-[\d]{3}-[\d]{4}" ref={(node) => {phone = node}} />
						</div>

						<div className="form-group">
							<b>Email: </b>
							<input type="text" pattern="[^@]+@[^@]+\.[^@]+" ref={(node) => {email = node}} />
						</div>

						<div className="form-group">
							<b>Zipcode: </b>
							<input type="text" pattern="[\d]{5}" ref={(node) => {zipcode = node}} />
						</div>

						<div className="form-group">
							<b>Password: </b>
							<input type="password" ref={(node) => {password = node}} />
						</div>

						<div className="form-group">
							<b>Password confirmation: </b>
							<input type="password" ref={(node) => {passwordcon = node}} />
						</div>

						<div className="col-sm-offset-5 col">
	          				<input type="reset" className="btn btn-primary" value="reset"/>
	          				//button that calls the actual update function 
	          				<input type="submit" value="Submit" className="btn btn-primary" onClick = {() => 

	           					 {
	           					 	updateAct(displayname.value, phone.value, email.value, zipcode.value, password.value, passwordcon.value)} }/>
	         			</div>

					</form>		
				</div>
			</div>
		</div>
	)
}



export default connect(
	null,
	(dispatch) => {
		return{
			updateAct:(displayname, phone, email, zipcode, password, passwordcon) => 
				updateProfile(displayname, phone, email, zipcode, password, passwordcon)(dispatch)
		}
	}
)(ProfileForm)





