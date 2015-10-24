import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import * as reducers from '../reducers';
import PinView from '../views/PinView'
import NodesView from '../views/NodesView'
import NodesAddView from '../views/NodesAddView'
import AboutView from '../views/AboutView'
import Navigation from '../views/Navigation'

const reducer = combineReducers(reducers);
const store = createStore(reducer);

const routes = {
	'/pin': PinView,
	'/nodes': NodesView,
	'/nodes/add': NodesAddView,
	'/about': AboutView
}


if(window.location.pathname === '/') {
	window.location.pathname = '/pin'
}

window.routes = routes

const ToRender = routes[window.location.pathname]

export default class App extends Component {
    render() {
				return <Provider store={store}>
					<div>
						<Navigation/>
						<ToRender/>
						<div className="scroller"></div>
					</div>
				</Provider>
    }
}

