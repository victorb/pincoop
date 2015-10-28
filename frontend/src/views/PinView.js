import React from 'react'

import history from '../history'

class PinView extends React.Component {
	constructor(props) {
		super(props)
		if(window.location.pathname === '/') {
			this.props.history.replaceState(null, '/pins')
		}
		this.state = {
			hash: null
		}
	}
	handleOnChange(ev) {
		this.setState({
			hash: ev.target.value.trim()
		})
	}
	handleOnClick() {
		const hash = this.state.hash
		this.setState({hash: null})
		fetch(process.env.API + 'api/pin/' + hash, {method: 'POST'})
		.then(() => {
			this.props.history.replaceState(null, '/pins/'+hash)
		})
	}
	render() {
		return <div className="wrapper">
			<div>
				<h1>Have your content hosted<br/>forever and free</h1>
			</div>
			<div className="content">
				<div className="form">
					<label htmlFor="hash_input">Hash:</label>
					<input id="hash_input" name="hash_input" type="text" value={this.state.hash} onChange={this.handleOnChange.bind(this)}></input>
					<div className="clearfix"></div>
				</div>
				<button onClick={this.handleOnClick.bind(this)}>Pin it forever</button>
			</div>
			<div className="notes">
				<h3>Developer?</h3>
				<p>
					If you rather use the API to pin content,<br/>
					take a look at <a href="https://github.com/VictorBjelkholm/openipfs/wiki/API-Documentation">the API documentation</a>
				</p>
			</div>
		</div>
	}
}

export default PinView
