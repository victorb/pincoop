import React from 'react'

const routes = {
	'Pin': '/pin',
	'Nodes': '/nodes',
	'Add your node': '/nodes/add',
	'About': '/about',
	'Source': 'https://github.com/victorbjelkholm/openipfs',
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
			return <a href={path} className={className} key={path}>{key}</a>
		})
		return <div className="navigation">
			<div className="brand">
				<a href="/pin">OpenIPFS</a>
			</div>
			<div className="links">
				{links}
			</div>
			<div className="clearfix"></div>
		</div>
	}
}

export default Navigation
