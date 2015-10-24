import React from 'react'

class PinView extends React.Component {
	render() {
		return <div className="wrapper">
			<div>
				<h1>Have your content hosted<br/>forever and free</h1>
			</div>
			<div className="content">
				<div className="form">
					<label htmlFor="hash">Hash</label>
					<input type="text"></input>
					<div className="clearfix"></div>
				</div>
				<button>Pin it forever</button>
			</div>
			<div className="notes">
				<h3>Developer?</h3>
				<p>
					If you rather use the API to pin content,<br/>
					take a look at <a href="#">the API documentation</a>
				</p>
			</div>
		</div>
	}
}

export default PinView
