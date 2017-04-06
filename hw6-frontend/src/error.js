
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

const ErrorSuccess = ({error, success}) => {
return (
    <div className="row">
        <div className="card">
            { error.length == 0 ? '' :
                <div className="row formRow alert alert-danger"> {error} </div>
            }

            { success.length == 0 ? '' :
                <div id="successmsg" className="row formRow alert alert-success"> {success} </div>
            }
        </div>
    </div>
)
}
ErrorSuccess.propTypes = {
    error: PropTypes.string.isRequired,
    success: PropTypes.string.isRequired
}
export default connect((state) => {
    return { error: state.errormsg, success: state.successmsg }
}, null)(ErrorSuccess)
