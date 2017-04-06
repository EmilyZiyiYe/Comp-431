import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import ErrorSuccess from '../../error'
import {addArticle, filterArticle,changeFileflag} from './articleActions'
import ArticleDiv from './article'
// the layout of whole area for articles
export const ArticleView = ({articles, keyword, postAct, filterAct, profile}) => {

	let searching, newarticle, file

	return (
		<div>
			<div className="panel panel-default">
				<div className="panel-body">
					<form className="form">
						<div className="form-group">
							<textarea id="main_postarticle" className="form-control" placeholder="Say something" ref={(node) => {newarticle = node}}></textarea>
							<p><label className="btn btn-default btn-file">Upload Image
								<input type="file" style={{display: 'none'}}accept="image/*" 
									onChange={(e) => {
														e.preventDefault()
														file = e.target.files[0]
										}} 
								/>
							</label></p>
							
							<br/>
							<input type="reset" className="btn btn-primary" value="reset"/>
							<input id="main_post" type="button" className="btn btn-primary" value="post" onClick={() => {
								postAct(newarticle.value, file)
							}}/>
							<div className="input-group">
								<div className="input-group-addon">Search: </div>
								<input type="text" className="form-control" id="main_search" placeholder="keywords" 
								ref={(node) => {searching = node}} onChange={() => {filterAct(searching.value)}}/>
							</div>
						</div>
					</form>
				</div>					
			</div>
			<div>
             {articles.sort((a,b) => {
                if (a.date < b.date)
                    return 1
                if (a.date > b.date)
                    return -1
                return 0
            }).map((article) => { 
			 	return (
					<ArticleDiv 
					key={article._id}
					_id = {article._id}
					text={article.text} 
					img={article.img} 
					current_user = {profile.username}
					date={article.date} 
					author={article.author} 
					comments = {article.comments} 
					commentflag = {article.commentflag}
					displayflag={article.displayflag}  />
				)}
				)
			 }
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
			fileflag:state.fileflag,
			articles: state.articles_shown,
			profile:state.profile,
			keyword: state.keyword
		}
	},
	(dispatch) => {
		return{
		postAct: (newarticle, file) => { 
			addArticle(newarticle, file)(dispatch)},
		filterAct: (keyword) => filterArticle(keyword)(dispatch)
		}
	}
)(ArticleView)






