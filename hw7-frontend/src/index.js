require('expose?$!expose?jQuery!jquery')
import {initialVisit} from './components/auth/authActions'
import thunkMiddleware from 'redux-thunk'
import React from 'react'
import { render } from 'react-dom'

import { Provider } from 'react-redux'
import createLogger from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import Reducer from './reducers'
import App from './components/app'



let store = createStore(Reducer, applyMiddleware(thunkMiddleware))

store.dispatch(initialVisit())

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
)