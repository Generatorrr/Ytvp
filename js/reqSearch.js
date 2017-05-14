import {viewResult} from './reqVideo';
import {changeNumberOfPages} from './changeNumberOfPages';
import {getYouTubeApi} from './fetchFunc';

export function req(pages, resultDiv, search, obj) {
    const url = "https://www.googleapis.com/youtube/v3/search";
    const params = { 
        queryParams: {
            part: 'snippet',
            maxResults: 15, 
            q: search.value,
            type: 'video',
            key: 'AIzaSyBoFvH0H-NtvQ-dsB6cFs8QXDKREZhFi68'
        } 
    };
    if(obj.nextPageToken !== ''){
        params.queryParams.pageToken = obj.nextPageToken;
    }
    const responseHandler = function(result) {
        const previousCount = obj.countResult;
        const previousNumberOfPages = obj.numberOfPages;
        obj.countResult = previousCount + result.items.length;
        obj.numberOfPages = Math.floor(obj.countResult / obj.resultPerPage);
        if(obj.nextPageToken === '' && obj.countResult === 0) {
            alert('Поиск не дал результатов');
        } else {
            obj.nextPageToken = result.nextPageToken;
            console.log(obj);
            changeNumberOfPages(pages, previousNumberOfPages, obj.numberOfPages);
            pages.childNodes[obj.currentPage - 1].classList.add('active');
            result.items.forEach(function(item, i, arr) {
                viewResult(item, previousCount + i, resultDiv);
            });
        }
    }

    const errorHandler = function(error) {
      alert(error.message);
    }

    getYouTubeApi(url, params, responseHandler, errorHandler);

    return obj;
}