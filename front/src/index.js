import './index.css'
import '@fontsource/roboto'
import React from 'react'
import ReactDOM from 'react-dom'
import Router from './components/Router/Router'
import { persistor, store } from './store'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.render(
    <Provider store={store}>
        <PersistGate persistor={persistor} loading={<div>Loading...</div>}>
            <BrowserRouter>
                <Router />
            </BrowserRouter>
        </PersistGate>
    </Provider>,
    document.getElementById('root')
)
