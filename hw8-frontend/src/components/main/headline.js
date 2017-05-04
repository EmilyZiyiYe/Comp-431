import React, {PropTypes} from 'react'
import { connect } from 'react-redux'
import Action from '../../actions'
import { toProfilepage, updateHeadline } from './headlineActions'
import {logout} from '../auth/authActions'

export const Headline = ({img, headline, username, displayname, logoutAct, profileAct, updateHeadlineAction,dispatch}) => {
	let newHeadline
	return (
		<div>
			<div className="panel-body">
				<p><a href="#" id="logout_btn" onClick={() => {logoutAct()}}>Logout</a></p>
				<p><a href="#" id="profile_btn" onClick={() => {profileAct()}}>Profile Page</a></p>
				<img src={img} className="img-thumbnail img-responsive" height="200" width="200"/>
				<p>{displayname}</p>
				<b>username:</b>
				<p id="main_user">{username}</p>
				<p id="main_headline">{headline}</p>
				<form className="form-inline">
					<div className="form-group">
						<b>Update Status:</b>
						<input type="text" id="main_newheadline" placeholder="newstatus" ref={(node) => {
							newHeadline = node
						}}/>
						<button id="main_headline_btn" type="button" className="btn btn-primary" onClick={() => {
							updateHeadlineAction(newHeadline.value, dispatch)
							newHeadline.value = ''
						}}>Update</button>
					</div>
				</form>
			</div>
		</div>
	)
}

Headline.PropTypes = {
	username: PropTypes.string.isRequired,
	displayname: PropTypes.string.isRequired,
	img: PropTypes.string.isRequired,
	headline: PropTypes.string.isRequired
}

export default connect(
	(state) => {
		return {
		username: state.profile.username,
		displayname: state.profile.displayName,
		img: state.profile.avatar,
		headline: state.profile.headline
	}
	}, (dispatch) => {
	return {
		updateHeadlineAction: (headline) => updateHeadline(headline)(dispatch),
		logoutAct: () => logout()(dispatch),
		profileAct: () => toProfilepage()(dispatch)
	}
})(Headline)