import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Login from './login'
import Register from './register'
import ErrorSuccess from '../../error'

//landing page
const Landing = () => {
    return (
        <div className='container'>
            <div className="jumbotron text-center">
                <h1>RiceBook</h1>
                <ErrorSuccess />
                <Register />
                <Login />
            </div>
        </div>
    )
}

export default connect()(Landing)