import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { linkAccount, unlinkAccount } from './profileActions'

export const LinkForm = ({ linkAct, unlinkAct, currentUser}) => {
	let database_username, database_password
	return(
		<div>
			{!currentUser.split('@')[1]?'':
			<form id="update_link_form" onSubmit= {(e) =>	{e.preventDefault()
    														linkAct(database_username.value, database_password.value)
													}}>
				<div className="form-group">
					<b>account username: </b>
					<input type="text" ref={(node) => {database_username = node}} />
				</div>

				<div className="form-group">
					<b>account password: </b>
					<input type="password" ref={(node) => {database_password = node}} />
				</div>

				<div className="form-group row">
					<input type="submit" value="Link my account" className="btn btn-primary" />
				</div>
			</form>}	

			{currentUser.split('@')[1]?'':
			<div className="form-group row">
                <input type="button" className="btn btn-primary" id="unlink" value="unlink Account" onClick = {() => unlinkAct()}/>
            </div>}
		</div>
	)
}

export default connect(
	(state)=>{
        return {currentUser: state.profile.username}
    },
	(dispatch) => {
		return{
			linkAct:(username, password) => linkAccount(username, password)(dispatch),
			unlinkAct: () => unlinkAccount()(dispatch)
		}
	}
)(LinkForm)
