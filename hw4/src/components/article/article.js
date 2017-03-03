import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

//component that contains the layout of single aritcle
const ArticleDiv = ({text,date,img,author})=>{
  return(   
  <div>
      <div className="panel panel-default">
        <div className="panel-heading">{author} said on {date}:</div>
        <div className="panel-body">
          <p>{text}</p>
          <div>
          <img src={ img } className="img-thumbnail img-responsive"/>
          <br/>
          <button type="button" className="btn btn-primary">Edit</button>
          <button type="button" className="btn btn-primary">Comment</button>
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

export default ArticleDiv