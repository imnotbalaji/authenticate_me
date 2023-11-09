import React from 'react';
import ReactDOM, { render } from 'react-dom'
import './index.css';
import App from './App';
import configureStore from './store';
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import csrfFetch, { restoreCSRF } from './store/csrf';
import * as sessionActions from './store/session';



const render_application = () => {
const store = configureStore();
if (process.env.NODE_ENV !== 'production'){
window.store = store;
window.csrfFetch  = csrfFetch;
window.sessionActions = sessionActions
}
const Root = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
      <App />
      </BrowserRouter>
    </Provider>
    
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Root/>
  </React.StrictMode>,
  document.getElementById('root')
);
}
// render_application();

if (sessionStorage.getItem('X-CSRF-Token')===null) {
  restoreCSRF().then(render_application)
  // render_application()
} else {
  render_application()
}