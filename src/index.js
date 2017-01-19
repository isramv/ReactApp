import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory } from 'react-router'
import App from './App';
import ShowGist from './Components/ShowGist';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import './index.css';

render((
	<Router history={hashHistory}>
		<Route path="/" component={App}>
			<Route path="/gist/:id" component={ShowGist}/>
		</Route>
	</Router>
), document.getElementById('root'));
