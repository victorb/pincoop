import { combineReducers } from 'redux';
import * as constants from '../constants';

const pages = [
	'pin',
	'nodes',
	'add_node',
	'about'
]

const initialState = {
	hash_to_pin: null,
	current_page: 'pin',
	all_nodes: [],
	node_to_add: null
}

export default function(state = initialState, action) {
	switch(action.type) {
		case constants.ADD_NODE:
			return state
		case constants.PIN_HASH:
			return state
		default:
			return state
	}
}
