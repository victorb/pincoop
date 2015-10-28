import React from 'react'

class AboutView extends React.Component {
	render() {
		return <div className="wrapper">
			<div>
				<h1>A open network of IPFS<br/>nodes that all help each<br/>other to rehost content</h1>
			</div>
			<div className="content about">
				<h6>Our mission</h6>
				<p>
					Bring together groups of nodes that are all sharing and rehosting content from each other.
				</p>
				<h6>About</h6>
				<p>
					IPFS is a protocol that enables a permanent web. But without nodes rehosting the content, we are still doing the same as the web we have today.
				</p>
				<p>
					By bringing nodes together, we can enable a API for sharing content in an easy way.
				</p>
				<p>
					Contribute a node to rehost content or donate money for others to handle the maintaince. Either way, you help us build a permanent web.
				</p>
				<p>
					More information can be found in <a href="https://github.com/VictorBjelkholm/openipfs/wiki">the Github Wiki</a> or at <a href="https://github.com/VictorBjelkholm/openipfs">the source itself</a>.
				</p>
				<p>
					OpenIPFS was built and is maintained by<br/>
					Victor Bjelkholm (<a href="https://twitter.com/victorbjelkholm">Twitter</a>, <a href="shttps://github.com/victorbjelkholm">Github</a>)<br/>
					and a group of <a href="https://github.com/VictorBjelkholm/openipfs/graphs/contributors">contributers</a>
				</p>
			</div>
		</div>
	}
}

export default AboutView
