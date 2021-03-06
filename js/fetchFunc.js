function fetchFunc(url, options={}) {
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

export function getYouTubeApi(url, params, youtubeResponseHandler, errorHandler) {
    fetchFunc( url, params )
        .then(r => r.json())
        .then(youtubeResponseHandler)
        .catch(errorHandler)
}