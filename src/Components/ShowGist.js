import React from 'react'
import axios from 'axios'
import marked from 'marked'

class ShowGist extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			gist: {}
		}
		this.getGist = this.getGist.bind(this);
	}

	getGist(id) {
		const auth = localStorage.getItem('auth');
		const config = {
      headers: {
        'x-custom-auth': auth
      }
    }
    axios.get(`http://myapp.local/app_dev.php/api/v1/gists/${id}`, config)
    	.then(response => {
    		this.setState({ gist: response.data });
    	})
    	.catch(error => {
    		console.warn(error);
    	});
	}

	componentWillReceiveProps(nextProps) {
		this.getGist(nextProps.params.id);
	}
	
	componentWillMount() {
		const id = this.props.routeParams.id;
		const auth = localStorage.getItem('auth');
		const config = {
      headers: {
        'x-custom-auth': auth
      }
    }
    axios.get(`http://myapp.local/app_dev.php/api/v1/gists/${id}`, config)
    	.then(response => {
    		this.setState({ gist: response.data });
    	})
    	.catch(error => {
    		console.warn(error);
    	});
	}

	render() {
		const gist = this.state.gist;
		let gistRender = '';

		if (typeof gist.body !== 'undefined') {
			gistRender = marked(gist.body);
		}

		// let renderer = new marked.Renderer();
  //   renderer.link = function(href, title, text) {
  //     if (this.options.sanitize) {
  //       try {
  //         var prot = decodeURIComponent(unescape(href))
  //                 .replace(/[^\w:]/g, '')
  //                 .toLowerCase();
  //       } catch (e) {
  //         return '';
  //       }
  //       if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0) {
  //         return '';
  //       }
  //     }
  //     var out = '<a target="_blank" class="link-view-gist" href="' + href + '"';
  //     if (title) {
  //       out += ' title="' + title + '"';
  //     }
  //     out += '>' + text + '</a>';
  //     return out;
  //   }
    // console.log(marked(gist.body, { renderer: renderer}));
		return (
			<div className="gistContainer">
				<h2>{gist.title}</h2>
				<div className="body" dangerouslySetInnerHTML={{__html: gistRender}} ></div>
			</div>
		)	
	}

}

export default ShowGist;