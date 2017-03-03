
import React, { Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { addFollower } from './followingActions'
import FollowerDiv from './follower'
// The component for the layout of the whole followers area
const Following =({followers, addFollowerAct}) =>{
        let newFollower;
        return(
		<div className="followers_area">
        //display every follower by mapping each of them to the component of single follower
			<div>
             {followers.map((follower) => (
             <FollowerDiv key={follower.id} id={follower.id} 
             username={follower.username} img={follower.img} headline={follower.headline} />
             )
             )}
            </div>
			<div>
			<input type="text" placeholder="Add People" ref={(node) => newFollower = node}/>
			<input type="button" className="btn btn-primary" value="Add" onClick={() => {
                    	if(newFollower.value !== '') {
                      	  addFollowerAct(newFollower.value)
                     	  newFollower.value=''
                   	    }
        	}}/>
        	</div>
        </div>
        )
    }

Following.PropTypes = {
    followers: PropTypes.array.isRequired,
}

export default connect(
    (state)=>{
        return {
            followers: state.followers
        }
    }, 
    (dispatch) => {
        return{
        addFollowerAct: (newFollower) => addFollower(newFollower)(dispatch)
    }
    }
)(Following)


