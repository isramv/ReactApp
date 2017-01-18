import React from 'react'

class itemOfList extends React.Component {

	render() {
		const gist = this.props.gist;
		return(
			<div>
				<div><a href={`/gist/${gist.id}`}>{gist.title}</a></div>
			</div>
		);
	}
	
}

export default itemOfList
