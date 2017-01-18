import React from 'react'
import ItemOfList from './ItemOfList'

class ListOfGists extends React.Component {

	render() {
		const items = [];
		this.props.gists.forEach((element, index) => {
			items.push(<ItemOfList key={index} gist={element.gist}/>);
		});
		return(
			<div className="list_of_gists">
				<button onClick={this.props.getGists}>Fetch Gists</button>
				{items}
			</div>
		)
	}

}

export default ListOfGists
