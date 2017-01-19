import React from 'react'
import { Link } from 'react-router'

class itemOfList extends React.Component {

	render() {
		const gist = this.props.gist;
		return(
			<div>
				<div><Link to={`/gist/${gist.id}`}>{gist.title}</Link></div>
			</div>
		);
	}
	
}

export default itemOfList
