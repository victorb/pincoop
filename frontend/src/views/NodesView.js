import React from 'react'
import Nodes from '../components/nodes'

class NodesView extends React.Component {
	render() {
		return <div className="wrapper">
			<div>
				<h1>A live view of all nodes<br/>currently in the network</h1>
			</div>
			<div className="content">
				<Nodes/>
			</div>
		</div>
	}
}

export default NodesView
