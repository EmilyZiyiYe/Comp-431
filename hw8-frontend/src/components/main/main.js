import React from 'react'
import { connect } from 'react-redux'
import Headline from './headline'
import Following from './following'
import ArticleView from '../article/articleView'
import ErrorSuccess from '../../error'

//the main page
const Main = ({dispatch}) => {


 	return (

 		<div className='jumbotron container'>
		 	<div className="text-center">
				<h1>RiceBook</h1>
				<ErrorSuccess/>
				<div className="jumbotron col-md-8 col-xs-8">
					<ArticleView/>
				</div>
				<div className="jumbotron col-md-3 col-xs-3">
					<Headline/>
					<Following/>
				</div>
			</div>		
		</div>
	

 	)
 }

export default connect()(Main)