import {getDataFromYoutube} from './customFetch';

export function viewResult(item, number, resultDiv) {
    const url = "https://www.googleapis.com/youtube/v3/videos";
    const params = {
        queryParams : {
            part: 'snippet, statistics',
            id :  item.id.videoId,
            key: 'AIzaSyBoFvH0H-NtvQ-dsB6cFs8QXDKREZhFi68'
        }
    }

    const responseHandler = function(resultVideo) {
        const itemDiv = document.createElement('div');
        const urlYoutube = `https://www.youtube.com/watch?v=${item.id.videoId}`;
        itemDiv.className = `item ${number}`;
        itemDiv.innerHTML = `<a href=${urlYoutube} class="title">${resultVideo.items[0].snippet.title}</a>
                            <img src=${resultVideo.items[0].snippet.thumbnails.medium.url} alt="preview image" />
                            <div class="information">
                                <div>
                                    <i class="fa fa-user" aria-hidden="true"></i>
                                    <span class="channel">${resultVideo.items[0].snippet.channelTitle}</span>
                                </div>
                                <div>
                                    <i class="fa fa-calendar" aria-hidden="true"></i>
                                    <span class="date">${resultVideo.items[0].snippet.publishedAt.slice(0, 10)}</span>
                                </div>
                                <div>
                                    <i class="fa fa-eye" aria-hidden="true"></i>
                                    <span class="date">${resultVideo.items[0].statistics.viewCount}</span>
                                </div>
                            </div>
                            <p class="description">${item.snippet.description}</p>`;
        resultDiv.appendChild(itemDiv);
        itemDiv.style.left = 370 * number + 'px';
    }

    const errorHandler = function(error) {
        alert(error.message);
    }
    getDataFromYoutube(url, params, responseHandler, errorHandler);
}