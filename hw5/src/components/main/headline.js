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
				<p><a href="#" onClick={() => {logoutAct()}}>Logout</a></p>
				<p><a href="#" onClick={() => {profileAct()}}>Profile Page</a></p>
				<img src={img} className="img-thumbnail img-responsive" height="150" width="150"/>
				<p>{displayname}({username})</p>
				<p>{headline}</p>
				<form className="form-inline">
					<div className="form-group">
						<b>Update Status:</b>
						<input type="text" id="status" placeholder="newstatus" ref={(node) => {
							newHeadline = node
						}}/>
						<button type="button" className="btn btn-primary" onClick={() => {
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