import React from 'react'
import { connect } from 'react-redux'
import Avatar from './avatar'
import ProfileForm from './profileForm'
import {toMainpage} from './profileActions'
import ErrorSuccess from '../../error'

//The profile page
const Profile = ({toMainAct}) => {
    return (
        <div className='container'>
            <div className="jumbotron text-center">
             	<h1>RiceBook</h1>
				 <ErrorSuccess/>
             	<p><a href="#" onClick={() => {toMainAct()}}>Main Page</a></p>
        		<Avatar/>
        		<ProfileForm/>
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

