import React from 'react'

class NodesStats extends React.Component {
	static propTypes = {
		nodes: React.PropTypes.array.isRequired
	}
	render() {
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

export default NodesStats
