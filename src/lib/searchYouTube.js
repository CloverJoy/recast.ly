import YOUTUBE_API_KEY from '../config/youtube.js';

var searchYouTube = (options, callback) => {

  $.ajax({
    url: 'https://www.googleapis.com/youtube/v3/search',
    type: 'GET',
    data: {
      key: options.key,
      q: options.query,
      maxResults: options.max,
      part: 'snippet',
      type: 'video',
      videoEmbeddable: true,
    },
    contentType: 'application/json',
    success: function(data) {
      console.log(data);
      callback(data.items);
    },
    error: function(response) {
      console.log('Request Failed', options.key);
      callback(response);
    }
  });
};

export default searchYouTube;
