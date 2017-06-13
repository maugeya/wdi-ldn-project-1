/* global gapi:true */
console.log('JS loaded');
const $results = $('.results');

function gapiReady() {
  gapi.client.load('youtube', 'v3')
    .then(() => {
      gapi.client.setApiKey('AIzaSyAEFFCHM2LDlgOQRvsWBiNWAhmV8N2mQRc');
      searchYoutube();
    });
}

const name = $('.poet-name').text();

function searchYoutube() {
  gapi.client.youtube.search.list({
    q: name,
    part: 'snippet',
    maxResults: 4,
    order: 'viewCount',
    type: 'video'
  }).execute((res) => {
    $.each(res.items, (i, item) => $results.append(getOutput(item)));
  });
}

function getOutput(item) {
  // var title = item.snippet.title;
  // var description = item.snippet.description;
  // var thumb = item.snippet.thumbnails.high.url;
  // var channelTitle = item.snippet.channelTitle;

  var output = `
  <iframe width="300" height="200" src="https://www.youtube.com/embed/${item.id.videoId}" frameborder="0" allowfullscreen></iframe>
  `;

  // var output = '<li>' +
  // '<div class="list-left"' +
  // '<img src="'+thumb+'">' +
  // '</div>' +
  // '<div class="list-right"' +
  // '<h3>'+title+'</h3>' +
  // '<small>By <span class="cTitle">'+channelTitle+'</span></small>' +
  // '<p>'+description+'</p>' +
  // '</div>' +
  // '</li>' +
  // '<div class="clearfix"></div>' +
  // '';

  return output;
}
