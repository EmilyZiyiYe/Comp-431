import React from 'react'
import { connect } from 'react-redux'

import Main from './main/main'
import Landing from './auth/landing'
import Profile from './profile/profile'


let App = ({location}) => {
	if (location === 'MAIN_PAGE') {
		return (<Main/>)
	} 
	else if (location === 'PROFILE_PAGE') {
		return (<Profile/>)
	} 
	else{
		return (<Landing/>)
	}
}

export default connect(
	(state) => {
		return {location: state.location}
}, null)(App)