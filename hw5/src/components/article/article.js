import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Comment from './comment'
import {showComment} from './articleActions'
import Action, {resource, showError, showSuccess, toMain, toProfile, toLanding} from '../../actions'


//component that contains the layout of single aritcle
export const ArticleDiv = ({_id, text,date,img,author, comments,displayflag, showAct})=>{
  return(   
  <div>
      <div className="panel panel-default">
        <div className="panel-heading">{author} said on {date}:</div>
        <div className="panel-body">
          <p className = "article-text">{text}</p>
          <div>
          <img src={ img } className="img-thumbnail img-responsive"/>
          <br/>
          <button type="button" className="btn btn-primary">Edit</button>
          <button type="button" className="btn btn-primary">Comment</button>
          <button type="button" className="btn btn-primary" 
            onClick = {() => {showAct(_id)}}>{(!displayflag)?"show comments":"hide comments"}</button>
            <div className="card-group">
            { !displayflag?'': 
                comments.map((comment)=>
                <Comment key={comment.commentId} author={comment.author} date={comment.date} text={comment.text}/>
                )
            }
            </div>   

          <br/>
          </div>
        </div>
      </div>          
  </div>


)
     
}

ArticleDiv.PropTypes={
    text: PropTypes.string.isRequired,
    date:PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired
}


export default connect(null,
	(dispatch) => {
		return{
    showAct: (id) => dispatch(showComment(id))
		}
	}
)(ArticleDiv)