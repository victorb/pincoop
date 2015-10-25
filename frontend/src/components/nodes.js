import React from 'react'

var hashCode = function(s){
  return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);              
}

class Stats extends React.Component {
	render() {
		console.log(this.props)
		let alive_nodes = 0
		let pinned_content = 0
		let pinning_content = 0
		let content_to_pin = 0
		this.props.nodes.forEach((node) => {
			if(node.alive) {
				alive_nodes++
			}
			pinned_content = pinned_content + node.pinned.length
			pinning_content = pinning_content + node.pinning.length
			content_to_pin = content_to_pin + node.to_pin.length
		})
		let column_style = {
			width: '25%',
			float: 'left'
		}
		let column_header_style = {
			...column_style,
			fontWeight: 'bold'
		}
		return <div style={{width: '50%', marginLeft: '25%', marginBottom: '2em'}}>
				<h3 className="bold">Summary</h3>
				<div>
					<div style={column_header_style}>Alive Nodes</div>
					<div style={column_header_style}>Pinned</div>
					<div style={column_header_style}>Pinning</div>
					<div style={column_header_style}>To Pin</div>
				</div>
				<div>
					<div style={column_style}>{alive_nodes}</div>
					<div style={column_style}>{pinned_content}</div>
					<div style={column_style}>{pinning_content}</div>
					<div style={column_style}>{content_to_pin}</div>
				</div>
			<div className="clearfix"></div>
		</div>
	}
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
		const pinning = this.props.pinning.length

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
			<div className="column">
				{pinning}
			</div>
			<div className={to_pin_classname}>
				{to_pin}
			</div>
			<div className="clearfix"/>
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
				pinning={node.pinning}
				pinned={node.pinned}
				to_pin={node.to_pin}
			/>
		})
		return <div>
			<Stats nodes={this.state.nodes}/>
			<h3 className="bold">Node details</h3>
			<div className="nodes">
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
					Pinning
				</div>
				<div className="column header">
					Left To Pin
				</div>
				<div className="clearfix"></div>
				{nodes}
			</div>
		</div>
	}
}

export default Nodes
