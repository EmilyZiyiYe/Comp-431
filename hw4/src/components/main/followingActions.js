import Action from '../../actions'

const following = require('../../data/followers.json')

// add a follower
export const addFollower = (username) => {
	return (dispatch) => {
		dispatch({type:Action.ADD_FOLLOWER, username: username})
	}
}
// remove a follower
export const removeFollower = (id) => {
	return (dispatch) => {
		dispatch({type:Action.REMOVE_FOLLOWER, id:id})
	}
}
