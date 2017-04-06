import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Comment from './comment'
import {showComment, editArticle, commentArticle} from './articleActions'
import Action, {resource, showError, showSuccess, toMain, toProfile, toLanding} from '../../actions'


//component that contains the layout of single aritcle
export const ArticleDiv = ({_id, text,date,img,author, comments,displayflag, commentflag, current_user, commentAct, showAct, editAct})=>{
  let edit_article
  return(   
  <div>
      <div className="panel panel-default">
        <div id="main_article_title" className="panel-heading">{author} said on {date}:</div>
        <div className="panel-body">
          { author != current_user? 
            <div className = "main_others_articles" contentEditable="false">{text}</div>
            :
            <div id = {_id} className = "main_my_articles" onInput ={(e)=>{edit_article = e.target.innerText}} contentEditable="true">{text}</div>
          }
          <div>
          <img src={ img } width="200" height="40"  className="img-thumbnail img-responsive"/>
          <br/>
          
          <button type="button" className="btn btn-primary" onClick = {() => {commentAct(_id)}} >{(!commentflag)?"comment on the post":"cancel"}</button>
          <button type="button" className="btn btn-primary" 
            onClick = {() => {showAct(_id)}}>{(!displayflag)?"show comments":"hide comments"}</button>
          { author != current_user? "":
            <button id='main_editarticle' type="button" className="btn btn-primary" onClick = {()=> {editAct(_id, edit_article)}}>Edit my post</button>
          }
          <div className="card-group">
          { !commentflag?'': 
              <div>
                <textarea id={_id + "commentText"} placeholder="comment on the post" >
                </textarea>
                <button className="btn btn-primary" onClick = {()=> {commentAct(_id)
                                                                    editAct(_id, document.getElementById(_id + "commentText").value, -1)}}>Post</button>
              </div>
          }
          </div>
          <div className="card-group">
            { !displayflag?'': 
                comments.sort((a,b) => {
                if (a.date < b.date)
                    return 1
                if (a.date > b.date)
                    return -1
                return 0
            }).map((comment)=>
                <Comment key={comment.commentId} article_id={_id} id={comment.commentId} current_user={current_user} author={comment.author} date={comment.date} text={comment.text}/>
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
    showAct: (id) => dispatch(showComment(id)),
    commentAct:(id) => dispatch(commentArticle(id)),
    editAct: (id, text, commentid) => editArticle(id,text, commentid)(dispatch)
		}
	}
)(ArticleDiv)