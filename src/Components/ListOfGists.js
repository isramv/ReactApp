import React from 'react'
import axios from 'axios'

class ListOfGists extends React.Component {

	constructor(props) {
		super(props);
	}
	// componentWillMount() {
	// 	console.log('component will mount')
	// }
	render() {

		return(
			<div className="list_of_gists">
				<button onClick={this.props.getGists}>Fetch Gists</button>
			</div>
		)
	}

}


export default ListOfGists