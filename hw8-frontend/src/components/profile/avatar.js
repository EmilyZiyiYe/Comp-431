import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {uploadImage} from './profileActions'
// Display the current info of user as well as the profile pic
const Avatar = ({profile, uploadAct}) => {
	let birth = new Date(profile.dob)
	let year = birth.getFullYear().toString()
	let month = (birth.getMonth() + 1).toString()
	let date = birth.getDate().toString()
	let birthday =month + '/' + date + '/' + year
	return (
		<div>
			<div className="panel panel-default">
				<div className="panel-heading"><h2>Profile Information</h2></div>
				<div className="panel-body">
					<p><img src={profile.avatar} className="img-thumbnail img-responsive" height="150" width="150"/></p>
	  				<p><label className="btn btn-default btn-file">Upload Image
						<input type="file" style={{display: 'none'}} accept="image/*" 
								onChange={(e) => {
													e.preventDefault()
													const file = e.target.files[0]
													uploadAct(file)
									}} 
						/>
					</label></p>
					<div className="form-group row">
						<b> Displayed Name:</b>
						<div>{profile.displayName}</div>  
					</div>
					<div className="form-group row">
						<b> Date of Birth :</b>
						<div>{birthday}</div>  
					</div>
					<div className="form-group row">
						<b>Phone number:</b>
						<div>{profile.phoneNumber}</div>
					</div>
					<div className="form-group row">
						<b>Email:</b>
						<div id='profile_show_email'>{profile.email}</div>
					</div>
					<div className="form-group row">
						<b>Zipcode:</b>
						<div id='profile_show_zipcode'>{profile.zipcode}</div>  
					</div>
				</div>
			</div>
		</div>


	)
}

Avatar.PropTypes = {
	profile: PropTypes.string.isRequired
}


export default connect(
	(state)=>{
        return {profile: state.profile}
    },
	(dispatch) => {
		return {uploadAct : (file) => uploadImage(file)(dispatch)}

	}
)(Avatar)