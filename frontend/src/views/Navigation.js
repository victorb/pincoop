import React from 'react'
import { Link } from 'react-router'

const routes = {
	'Pin': '/pins',
	'Nodes': '/nodes',
	'Add your node': '/nodes/add',
	'About': '/about',
	'Source': 'https://github.com/victorbjelkholm/pincoop',
}

class Navigation extends React.Component {
	handleOnClick(page) {
		window.location.pathname = page
	}
	render() {
		const links = Object.keys(routes).map((key) => {
			const path = routes[key]
			const is_active = window.location.pathname === path;
			let className = null
			if(is_active) {
				className = "active"
			}
			return <Link key={path} to={path} className={className}>{key}</Link>
		})
		return <div className="navigation">
			<div className="brand">
				<a href="/pins">PinCoop</a>
				<span className="beta">BETA</span>
			</div>
			<div className="links">
				{links}
			</div>
			<div className="clearfix"></div>
		</div>
	}
}

export default Navigation
