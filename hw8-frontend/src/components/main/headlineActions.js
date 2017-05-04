import Action, {resource, showError, showSuccess, toMain, toProfile, toLanding} from '../../actions'

export const updateHeadline = (headline) => (dispatch)=> {
	if (headline){
        //make request to sever to update the headline to the given one
        resource('PUT', 'headline', {headline: headline})
        .then((response) => {
            const line = response.headline
            //dispatch the action of changing headline to reducer
            dispatch({ type: Action.UPDATE_HEADLINE, headline: line})
        })
	}
}

export const toProfilepage = () => {
	return (dispatch) => {
		dispatch({type:Action.NAV_PROFILE})
	}
}


