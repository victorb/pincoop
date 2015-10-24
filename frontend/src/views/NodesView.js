import React from 'react'

class NodesView extends React.Component {
	render() {
		return <div className="wrapper">
			<div>
				<h1>A live view of all nodes<br/>currently in the network</h1>
			</div>
			<div className="content">
				List of all nodes with live status...
			</div>
		</div>
	}
}

export default NodesView
