import React from 'react'
import { connect } from 'react-redux'
import Login from './login'
import Register from './register'

//landing page
const Landing = () => {
    return (
        <div className='container'>
            <div className="jumbotron text-center">
                <h1>RiceBook</h1>
                <Register />
                <Login />
            </div>
        </div>
    )
}

export default connect()(Landing)