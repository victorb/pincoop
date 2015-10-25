import { Router, Route, IndexRoute }   from 'react-router';
import React       from 'react';
import CoreLayout  from 'layouts/CoreLayout';
import HomeView from 'views/PinView';
import PinView from 'views/PinView';
import NodesView from 'views/NodesView';
import NodesAddView from 'views/NodesAddView';
import AboutView from 'views/AboutView';
import PinShowView from 'views/PinShowView';

import history from '../history'

export default (
	<Router history={history}>
		<Route path='/' component={CoreLayout}>
			<IndexRoute component={PinView}/>
			<Route path="pins" component={PinView}/>
			<Route path="pins/:hash" component={PinShowView}/>
			<Route path="nodes" component={NodesView}/>
			<Route path="nodes/add" component={NodesAddView}/>
			<Route path="about" component={AboutView}/>
		</Route>
	</Router>
);
