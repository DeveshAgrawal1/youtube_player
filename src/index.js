import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
import _ from 'lodash';
const API_KEY = "your key here";



class App extends Component{

	constructor(props){
		super(props);

		this.state = {
		 videos: [],
		 selectedVideo : null
		};

		this.videoSearch('');
	}

	videoSearch(term)
	{
		YTSearch({key: API_KEY, term: term}, (videos) => {
			this.setState({
			 	videos: videos,
			 	selectedVideo : videos[0]
			 }); //when the key and value are same they can be condensed
				 // eg: this statement this.setState{videos} implies this.setState({videos:videos})
				 //dsfskdjfkj
		});
	}

	render() {

		const videoSearch = _.debounce((term) => {this.videoSearch(term) }, 300)

		return (
			<div>
				<SearchBar onSearchTermChange={videoSearch} />
				<VideoDetail video={this.state.selectedVideo} />
				<VideoList
				 onVideoSelect = {selectedVideo => this.setState({selectedVideo})}
				 videos={this.state.videos} />
			</div>	
		);
	}
};

ReactDOM.render(<App />, document.querySelector(".container"));
