import Action, {showError} from '../../actions'

//this function is for login 
export function login(username, password) {
    return (dispatch) => {
        if (username && password){
            dispatch({type: Action.LOGIN, username: username})
            dispatch({type:Action.NAV_MAIN})
        }
        else{
            dispatch(showError('Username or password is missing'))
        }
    }
}

