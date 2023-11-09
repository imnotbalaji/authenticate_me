import { combineReducers,applyMiddleware, createStore,compose} from 'redux';
import thunk from 'redux-thunk'
import sessionReducer from './session';
// Create a root reducer 

const rootReducer = combineReducers({
    session: sessionReducer
})

// Create an enhancer 

let enhancer;

if (process.env.NODE_ENV === 'production' ){
    enhancer = applyMiddleware(thunk);
} else {
    const logger = require('redux-logger').default;
    const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancer(applyMiddleware(thunk,logger))
}
     


// Create a configure store 

const configureStore = (preloadedState = {}) => {
    return createStore(rootReducer,preloadedState, enhancer)
}

export default configureStore;