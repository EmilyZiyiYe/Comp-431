import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
// Display the current info of user as well as the profile pic
const Avatar = ({profile}) => {
	let birth = new Date(profile.birthdateTimestamp)
	let year = birth.getFullYear().toString()
	let month = (birth.getMonth() + 1).toString()
	let date = birth.getDate().toString()
	let birthday =month + '/' + date + '/' + year
	return (
		<div>
			<div className="panel panel-default">
				<div className="panel-heading"><h2>Profile Information</h2></div>
				<div className="panel-body">
					<p><img src={profile.img} className="img-thumbnail img-responsive" height="150" width="150"/></p>
	  				<p><input type="file" id="imagefile"/></p>
					<label className="btn btn-primary">Upload</label>
					//current info
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
						<div>{profile.email}</div>
					</div>
					<div className="form-group row">
						<b>Zipcode:</b>
						<div>{profile.zipcode}</div>  
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
        return {
            profile: state.profile
        }
    }

	)(Avatar)