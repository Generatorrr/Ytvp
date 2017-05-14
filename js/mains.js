var url = "https://www.googleapis.com/youtube/v3/search";

var param = { queryParams: {part: 'snippet, id', maxResults: 5, q: 'hearthstone', type: 'video', key: 'AIzaSyBoFvH0H-NtvQ-dsB6cFs8QXDKREZhFi68'} };

function fetch2(url, options={}) {
    
    if(options.queryParams) {
        url += (url.indexOf('?') === -1 ? '?' : '&') + queryParams(options.queryParams);
        delete options.queryParams;
    }

    return fetch(url, options);
}

function queryParams(params) {
    return Object.keys(params)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
        .join('&');
}

fetch2(url,  param)
	.then(r => r.json())
	.then(data => console.log(data))
	.catch(e => console.log('Something was wrong.'))

function init() {
	gapi.client.setApiKey('AIzaSyBoFvH0H-NtvQ-dsB6cFs8QXDKREZhFi68');
	gapi.client.load('youtube', 'v3', function() {
		// yt api is ready
	});
}

