import VideoList from './VideoList.js';
import VideoPlayer from './VideoPlayer.js';
import exampleVideoData from '../data/exampleVideoData.js';
import YOUTUBE_API_KEY from '../config/youtube.js';
import Search from './Search.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentVideo: exampleVideoData[0],
      videoList: exampleVideoData,
      query: ''
    };
  }

  componentDidMount() {
    _.debounce(function() { this.props.searchYouTube({ key: YOUTUBE_API_KEY, query: this.state.query, max: 5 }, (data) => { this.setState({ currentVideo: data[0], videoList: data }); }); }, 500);
  }

  onClickHandler(event) {

    //if click event is same with current video
    //change the state of currentvideo
    // console.log('hey its clicked');
    console.log(event);
    this.setState({
      currentVideo: event
    });
  }

  onKeyPressHandler(event) {
    console.log(this.state.query);
    this.setState({
      query: this.state.query + event.key
    });
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <div className="col-md-6 offset-md-3">
            <Search onKeyPressHandler={this.onKeyPressHandler.bind(this)}/>
          </div>
        </nav>
        <div className="row">
          <div className="col-md-7">
            <VideoPlayer video={this.state.currentVideo} />
          </div>
          <div className="col-md-5">
            <VideoList videos={this.state.videoList} onClickHandler={this.onClickHandler.bind(this)} />
          </div>
        </div>
      </div>
    );
  }
}

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
export default App;

