import React from 'react'

var hashCode = function(s){
  return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);              
}

class Node extends React.Component {
	render() {
		const alive = this.props.alive ? 'Online' : 'Offline'
		let id = this.props.id
		if(id !== null || id !== undefined) {
			id = id.substr(0, 16)
		}
		const pinned = this.props.pinned.length
		const to_pin = this.props.to_pin.length
		const retries = this.props.retries

		let alive_classname = this.props.alive ? 'column green' : 'column red'
		let to_pin_classname = 'column green'
		if(to_pin > 3) {
			to_pin_classname = 'column orange'
		}
		if(to_pin > 10) {
			to_pin_classname = 'column red'
		}

		let retries_classname = 'column green'
		if(retries > 0) {
			retries_classname = 'column orange'
		}
		if(retries > 3) {
			retries_classname = 'column red'
		}
		if(retries === 5) {
			retries_classname = 'column red bold'
			alive_classname = 'column red bold'
		}
		return <div className="node">
			<div className="column">
				{id}
			</div>
			<div className={alive_classname}>
				{alive}
			</div>
			<div className={retries_classname}>
				{retries}
			</div>
			<div className="column">
				{pinned}
			</div>
			<div className={to_pin_classname}>
				{to_pin}
			</div>
		</div>
	}
}

class Nodes extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			nodes: [],
			interval: null
		}
	}
	getNodes() {
		fetch('http://localhost:3001/api/daemons').then((res) => {
			return res.json()
		}).then((nodes) => {
			this.setState({nodes})
		})
	}
	componentDidMount() {
		let interval = setInterval(() => {
			this.getNodes()
		}, 1000)
		this.getNodes()
		this.setState({interval})
	}
	componentWillUnmount() {
		clearInterval(this.state.interval)
	}
	render() {
		const nodes = this.state.nodes.map((node) => {
			return <Node
				id={node.id}
				alive={node.alive} 
				retries={node.tries}
				pinned={node.pinned}
				to_pin={node.to_pin}
			/>
		})
		return <div className="nodes">
			<div className="column header">
				ID
			</div>
			<div className="column header">
				Status
			</div>
			<div className="column header">
				Retries
			</div>
			<div className="column header">
				Pinned
			</div>
			<div className="column header">
				Left To Pin
			</div>
			<div className="clearfix"></div>
			{nodes}
		</div>
	}
}

export default Nodes
