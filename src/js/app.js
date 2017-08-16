/* global gapi:true */

console.log('JS loaded');
const $results = $('.results');
const $wiki =$('.wiki');

function gapiReady() {
  gapi.client.load('youtube', 'v3')
    .then(() => {
      gapi.client.setApiKey('AIzaSyAEFFCHM2LDlgOQRvsWBiNWAhmV8N2mQRc');
      searchYoutube();
    });
}

const name = $('.artist-name').text();

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
  var title = item.snippet.title;
  var description = item.snippet.description;
  // var thumb = item.snippet.thumbnails.high.url;
  // var channelTitle = item.snippet.channelTitle;

  const output = `
  <iframe width="400" height="300" src="https://www.youtube.com/embed/${item.id.videoId}" frameborder="0" allowfullscreen></iframe>

  `;


  return output;
}


$.ajax({
  url: '/wikipedia',
  method: 'GET',
  data: { name }
})
.then((data) => {
  console.log(data);
  const pageId = (Object.keys(data.query.pages)[0]);


  const wikiURL = `https://en.wikipedia.org/wiki?curid=${pageId}`;

  if(pageId !== '-1') {
    $wiki.append(`<a href="${wikiURL}" target="_blank">Wikipedia Page</a>`);

  }
});
