import { combineReducers, createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import profileReducer from './reducers/profile'
import chatReducer from './reducers/chat'
import covidReducer from './reducers/covid'
import tokenReducer from './reducers/token'


const persistConfig = {
    key: 'root',
    storage,
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
    profile: profileReducer,
    chatsInfo: chatReducer,
    covid: covidReducer,
    token: tokenReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(thunk))
)

export const persistor = persistStore(store)
