 require('expose?$!expose?jQuery!jquery')
require("bootstrap-webpack")


import React from 'react'
import { render } from 'react-dom'

import { Provider } from 'react-redux'
import createLogger from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import Reducer from './reducers'
import App from './components/app'


//const logger = createLogger()
//, applyMiddleware(logger)
const store = createStore(Reducer)


render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
)