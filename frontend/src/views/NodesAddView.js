import React from 'react'

class NodesAddView extends React.Component {
	render() {
		return <div className="wrapper">
			<div>
				<h1>Help us help you. Donate a IPFS node and make sure the content stays online forever</h1>
			</div>
			<div className="content">
				<div className="form">
					<label htmlFor="multiaddr">Multiaddr:</label>
					<input type="text"></input>
					<div className="clearfix"></div>
				</div>
				<button>Add</button>
			</div>
			<div className="notes">
				<h3>How to setup?</h3>
				<p>
					If you want to more about how to run the node to be able to
					support OpenIPFS, take a look at <a href="#">the node setup guide</a>
				</p>
			</div>
		</div>
	}
}

export default NodesAddView
