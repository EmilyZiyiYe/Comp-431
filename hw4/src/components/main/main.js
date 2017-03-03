import React from 'react'
import { connect } from 'react-redux'

// import Action from '../../actions'
import Headline from './headline'
import Following from './following'
import ArticleView from '../article/articleView'


//the main page
const Main = ({dispatch}) => {


 	return (

 		<div className='container'>
            <div className="jumbotron text-center">
                <h1>RiceBook</h1>
					<Headline/>
					<Following/>
					<ArticleView/>
			</div>
			</div>
	

 	)
 }

export default connect()(Main)