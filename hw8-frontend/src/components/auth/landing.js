import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Login from './login'
import Register from './register'
import ErrorSuccess from '../../error'

//landing page
const Landing = () => {
    return (
        <div className="container-fluid">
            <div className="jumbotron">
            
                <div className="row row-header">
                    <div className="text-center">
                        <h1><strong>RiceBook</strong></h1>
                    </div>
                </div>
                
                <ErrorSuccess />

                <div className='container'>
                    <div className="row">
                        <div className="col-xs-4 col-md-4">
                            <img wide = "50" className="img-responsive" alt="Responsive image" src="http://i.imgur.com/VIGmMLo.png"/>
                        </div>
                        <div className="col-xs-4 col-md-4">
                            <Register/>
                        </div>
                        <div className="col-xs-4 col-md-4">
                            <Login/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default connect()(Landing)