import {req} from './reqSearch';

export function addSearchListener(search, resultDiv, pages, obj) {
    search.addEventListener('keydown', function(e) {
        if(e.keyCode === 13) {
            resultDiv.innerHTML = '';
            resultDiv.style.left = '0px';
            pages.innerHTML = '';
            obj.numberOfPages = 0;
            obj.countResult = 0;
            obj.currentPage = 1;
            obj.nextPageToken = '';
            obj = req(pages, resultDiv, search, obj);
        }
    });

    return obj;
}