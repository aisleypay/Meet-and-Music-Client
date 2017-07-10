import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';

import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Router>
  <div>
    <Route path="/" component={App}/>
  </div>
</Router>, document.getElementById('root'));
registerServiceWorker();
