import React from 'react'
import { connect } from 'react-redux'
import Avatar from './avatar'
import ProfileForm from './profileForm'
import {toMainpage} from './profileActions'
import ErrorSuccess from '../../error'
import LinkForm from './linkForm'

//The profile page
const Profile = ({toMainAct}) => {
    return (
        <div className='container'>
            <div className="jumbotron text-center">
             	<h1>RiceBook</h1>
				<ErrorSuccess/>
             	<p><a href="#" onClick={() => {toMainAct()}}>Main Page</a></p>
                <div className="row">

                    <div className="col-xs-6 col-md-6">
                        <Avatar/>
                    </div>

                    <div className="col-xs-6 col-md-6">
                        <div className="panel panel-default">
                            <div className="panel-heading"><h2>Update Profile Information</h2></div>
                            <div className="panel-body">
                                <ProfileForm/>
                                <LinkForm/>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default connect(null,
	(dispatch) => {
		return {
			toMainAct:() => toMainpage()(dispatch)
		}
	}
)(Profile)

