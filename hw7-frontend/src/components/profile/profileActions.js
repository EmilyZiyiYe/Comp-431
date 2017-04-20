import Action, {resource, showError, showSuccess, toMain, toProfile, toLanding} from '../../actions'


export const updateProfile = (displayname, phone, email, zipcode, password, passwordcon) => (dispatch) => {
	if (displayname) {
		dispatch({type:Action.UPDATE_DISPLAY,  displayName: displayname})
	}
	if (phone) {
		dispatch({type:Action.UPDATE_PHONE,  phoneNum: phone})
	}
	if (email) {
		resource('PUT', 'email', {email: email})
		.then((response) => {
			const result = response.email
			dispatch({ type: Action.UPDATE_EMAIL, email: result})
		})
	}
	if (zipcode) {
		resource('PUT', 'zipcode', {zipcode: zipcode})
		.then((response) => {
			const result = response.zipcode
			dispatch({ type: Action.UPDATE_ZIPCODE, zipcode: result})
		})
	}
	if (passwordcon === password) {
		resource('PUT', 'password', {password: password})
		.then((response) => {
			const result = response.password
			dispatch({type: Action.UPDATE_PASSWORD, password: result})
			dispatch(showSuccess("Password will not change"))
		})
	}
	if (passwordcon !== password) {
		dispatch(showError("passwords does not match"))
	}
}

export const toMainpage = () => {
	return (dispatch) => {
		dispatch({type:Action.NAV_MAIN})
	}
}

export const uploadImage = (file) =>(dispatch) => {
	if (file) {
		const fd = new FormData()
		fd.append('image', file)
		resource('PUT', 'avatar', fd, false)
		.then((response) => {
			dispatch({ type: Action.UPDATE_AVATAR, avatar: response.avatar })
		})
	}
}


