
import React, { Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { addFollower } from './followingActions'
import FollowerDiv from './follower'
// The component for the layout of the whole followers area
const Following =({followers, addFollowerAct}) =>{
        let newFollower;
        return(
		<div className="followers_area">
            <div>
			<input id="main_newfollower" type="text" placeholder="Add People" ref={(node) => newFollower = node}/>
			<input id="main_newfollower_btn" type="button" className="btn btn-primary" value="Add" onClick={() => {
                    	if(newFollower.value !== '') {
                      	  addFollowerAct(newFollower.value)
                     	  newFollower.value=''
                   	    }
        	}}/>
        	</div>
			<div>
             {followers.map((follower) => {
                return (
             <FollowerDiv key = {follower.username}
             username={follower.username} img={follower.avatar} headline={follower.headline} />
             )
             }
             )}
            </div>
        </div>
        )
    }

Following.PropTypes = {
    followers: PropTypes.array.isRequired
}

export default connect(
    (state)=>{
        return {
            followers: state.followers
        }
    }, 
    (dispatch) => {
        return{
        addFollowerAct: (newFollower) => addFollower(newFollower,dispatch)
    }
    }
)(Following)


