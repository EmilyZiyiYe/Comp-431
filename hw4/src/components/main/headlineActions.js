import Action from '../../actions'

// logout and navigate to landing page
export const logOut = () => {
	return (dispatch) => {
		dispatch({type:Action.NAV_OUT})
	}
}
// update the headline 
export const updateHeadline = (headline) => {
	return (dispatch) => {
		if (headline){
		dispatch({type: Action.UPDATE_HEADLINE, headline:headline})
		}
	}
}
//navigate to profile page
export const toProfile = () => {
	return (dispatch) => {
		dispatch({type:Action.NAV_PROFILE})
	}
}
