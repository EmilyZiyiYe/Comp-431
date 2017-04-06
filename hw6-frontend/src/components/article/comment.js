import React from 'react'
import { connect } from 'react-redux'
import {editArticle} from './articleActions'

const Comment = ({article_id, id, author, date, text, current_user, editAct}) => {
    let new_comment
    return (
    <div className='row card'>
        <strong><h5> {author} commented on {date} </h5></strong>
        <div className='className="panel-body"'>
        {(current_user != author)?
            <div className = "main_comment" contentEditable="false">{text}</div>
            :
            <div id = {id} className = "main_comment" onInput ={(e)=>{new_comment = e.target.innerText}} contentEditable="true">{text}</div>

        }
        </div>
        {(current_user != author)? "" :
           <button type="button" className="btn btn-primary" onClick = {()=> 
               { editAct(article_id, new_comment, id)}}>Edit my comment</button> 
        }
    </div>
    )
}


export default connect(null,
	(dispatch) => {
		return{
            editAct: (id, text, commentid) => editArticle(id, text, commentid)(dispatch)
		}
	}
)(Comment)