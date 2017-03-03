import Action, {showError} from '../../actions'

// This function updates user's personal info
export const updateProfile = (displayname, phone, email, zipcode, password, passwordcon) => (dispatch) => {

			if (displayname) {
				dispatch({type:Action.UPDATE_DISPLAY,  displayName: displayname})
			}
			if (phone) {
				dispatch({type:Action.UPDATE_PHONE,  phoneNum: phone})
			}
			if (email) {
				dispatch({type:Action.UPDATE_EMAIL,  emailAdd: email})
			}
			if (zipcode) {
				dispatch({type:Action.UPDATE_ZIPCODE,  zipCode: zipcode})
			}
			if (passwordcon === password) {
				dispatch({type:Action.UPDATE_PASSWORD, passWord: password})
			}
			if (passwordcon !== password) {
				showError("passwords does not match")
			}
		}

export const toMain = () => {
	return (dispatch) => {
		dispatch({type:Action.NAV_MAIN})
	}
}



