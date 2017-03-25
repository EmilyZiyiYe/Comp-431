import React, { Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { removeFollower } from './followingActions'

//The component for the layout of singer follower
const FollowerDiv = ({username, img, headline, removeAct}) => {
    return(
        <div>
            <img src={img} className="img-thumbnail img-responsive" height="150" width="150"/>
            <div>{username}</div>
            <div>{headline}</div>
            <input type='button' value='Unfollow' className="btn btn-danger btn-xs" onClick={() => {removeAct(username)}} />
        </div>
    )
}

FollowerDiv.propTypes = {
    username: PropTypes.string.isRequired,
    img: PropTypes.string,
    headline: PropTypes.string
}

export default connect(null,
  (dispatch) => {
    return {
        removeAct:(username) => removeFollower(username, dispatch)
    }
})(FollowerDiv)