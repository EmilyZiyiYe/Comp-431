import Action, {resource, showError, showSuccess, toMain, toProfile, toLanding} from '../../actions'

export function removeFollower(username, dispatch) { updateFollowers('DELETE', username, dispatch) }
export function addFollower(username, dispatch) { updateFollowers('PUT', username, dispatch) }
export function getFollower(dispatch) {updateFollowers('GET', '', dispatch)}
 
export function updateFollowers(method, name, dispatch) {
	//make request to server based on the input(add, remove or just get followers)
	resource(method, 'following' + (name ? '/' + name : ''))
	.then((response) => {
		//to check whether the user is valid by checking whether this user is in the follower list in the response
		if (method == 'PUT' && response.following.indexOf(name) < 0){
                dispatch(showError(`User does not exist`))
            }
		//map each follower an array to later contain its headline and avatar and eventually pass the data
		//to reducer
		const followers = response.following.map((name)=>({username:name}))
		//turn the list of followers to string so that can be used as the endpoint
		//when requesting headlines and avatars
		const followers_string= response.following.join(',')
		//make request to server to get every follower's headline
		resource('GET', `headlines/${followers_string}`)
			.then((response) => { 
				response.headlines.forEach((line) => {
					followers.forEach((person) => {
						//add the headline info to the corresponding user
						(person.username === line.username)? person.headline = line.headline:null
					})
				})
				//make request to server to get every follower's avatar
				resource('GET', `avatars/${followers_string}`)
					.then((response) => {
						response.avatars.forEach((img) => {
							followers.forEach((person) => {
								//add the avatar info to the corresponding user
								(person.username === img.username)? person.avatar = img.avatar:null
							})
						})
					})
					.then(() => {
						dispatch({type: Action.LOAD_FOLLOWERS, followers: followers})
					})
					.then(() => {
						resource('GET', 'articles')
        				.then((response) => {
            					dispatch({ type: Action.LOAD_ARTICLES, articles: response.articles})
						})
					})
			})
	})
	.catch((err) => {
		dispatch(showError(`There was an error getting your follower(s)`))
	})
}




