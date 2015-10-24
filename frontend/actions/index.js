import * as constants from '../constants'

export function pinHash(hash) {
	return {
		type: constants.PIN_HASH,
		hash
	}
}

export function addNode(multiaddr) {
	return {
		type: constants.ADD_NODE,
		multiaddr
	}
}
