import React from 'react'

class NodesAddView extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			multiaddr: null
		}
	}
	handleOnChange(ev) {
		const multiaddr = ev.target.value.trim()
		this.setState({multiaddr})
	}
	handleOnClick() {
		const multiaddr = this.state.multiaddr
		this.setState({multiaddr: null})
		const body = {multiaddr}

		fetch(process.env.API + 'api/daemons', {
			method: 'POST',
			body: JSON.stringify(body),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(() => {
			this.props.history.replaceState(null, '/nodes')
		})
	}
	render() {
		return <div className="wrapper">
			<div>
				<h1>Help us help you. Donate a IPFS node and make sure the content stays online forever</h1>
			</div>
			<div className="content">
				<div className="form">
					<label htmlFor="multiaddr">Multiaddr:</label>

					<input type="text" value={this.state.multiaddr} onChange={this.handleOnChange.bind(this)}></input>

					<div className="clearfix"></div>
				</div>
				<button onClick={this.handleOnClick.bind(this)}>Add</button>
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
