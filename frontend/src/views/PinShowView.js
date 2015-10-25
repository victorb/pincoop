import React from 'react'

class PinShowView extends React.Component {
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
	render() {
		let not_pinned = []
		let pinned = []


		this.state.nodes.forEach((node) => {
			node.pinned.forEach((hash) => {
				if(hash === this.props.params.hash) {
					pinned.push(node)
				}
			})
			node.to_pin.forEach((hash) => {
				if(hash === this.props.params.hash) {
					not_pinned.push(node)
				}
			})
		})
		let pinned_render;
		let not_pinned_render;
		if(pinned.length > 0) {
			pinned_render = pinned.map((node) => {
					return <div className='green'>{node.id}</div>
			})
		} else {
			pinned_render = <div className='red'>No node have pinned your content yet...</div>
		}
		if(not_pinned.length > 0) {
			not_pinned_render = not_pinned.map((node) => {
					return <div className='orange'>{node.id}</div>
			})
		} else {
			not_pinned_render = <div className='green'>Everyone already pinned your content!</div>
		}
		let to_render = <div>
			<h1>Status of pinning</h1>
			<h3>Nodes that have not pinned your content yet</h3>
			{not_pinned_render}
			<h3>Nodes that have pinned!</h3>
			{pinned_render}
			<br/>
			<br/>
			<br/>
			<p>
				Add more content by going <a href="/">home</a>!
			</p>
		</div>

		let warning = ""
		if(pinned.length === 0 && not_pinned.length === 0) {
			warning = <div>
				<h2 className="red">No one have pinned this hash<br/>or is trying to pin it...</h2>
				<p>
					Are you sure you've added this hash?
				</p>
				Go <a href="/">Home</a>
			</div>
			to_render = <div>{warning}</div>
		}

		return <div className="wrapper">
			{to_render}
		</div>
	}
}

export default PinShowView
