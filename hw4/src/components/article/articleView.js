import React, {PropTypes} from 'react'
import {connect} from 'react-redux'

import {addArticle, filterArticle} from './articleActions'
import ArticleDiv from './article'
// the layout of whole area for articles
export const ArticleView = ({articles, keyword, postAct, filterAct}) => {

	let searching, newarticle

	return (
		<div>
			<div className="panel panel-default">
				<div className="panel-body">
					<form className="form">
						<div className="form-group">
							<textarea className="form-control" placeholder="Say something" ref={(node) => {newarticle = node}}></textarea>
							<label className="btn btn-primary"> Upload an image file</label>
							<input type="file" id="imagefile"/>	
							<br/>
							<input type="reset" className="btn btn-primary" value="reset"/>
							<input type="button" className="btn btn-primary" value="post" onClick={() => {
								postAct(newarticle.value)
							}}/>
							<div className="input-group">
								<div className="input-group-addon">Search: </div>
								<input type="text" className="form-control" id="search" placeholder="keywords" 
								ref={(node) => {searching = node}} onChange={() => {filterAct(searching.value)}}/>
							</div>
						</div>
					</form>
				</div>					
			</div>
			//map every article to the component that gives layout for single article
			<div>
             {articles.map((article) => (
             <ArticleDiv key={article._id}
             text={article.text} img={article.img} date={article.date} author={article.author} />
             )
             )}
            </div>
		</div>
	)
}

ArticleView.PropTypes = {
	articles: PropTypes.string.isRequired,
	keyword: PropTypes.string.isRequired,
}

export default connect(
	(state) => {
		return {
			articles: state.articles_shown,
			keyword: state.keyword
		}
	},
	(dispatch) => {
		return{
		postAct: (newarticle) => { 
			console.log(newarticle)
			addArticle(newarticle)(dispatch)},
		filterAct: (keyword) => filterArticle(keyword)(dispatch)
		}
	}
)(ArticleView)






