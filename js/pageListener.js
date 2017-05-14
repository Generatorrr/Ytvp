import {changePage} from './changePage';

export function pageListener(pages, resultDiv, search, obj) {
    pages.addEventListener('click', function(e) {
        if(e.target.classList.contains('page')) {
            pages.childNodes[obj.currentPage - 1].classList.remove('active');
            obj.currentPage = parseInt(e.target.innerHTML, 10);
            changePage(obj.currentPage, pages, resultDiv, search, obj);
        }
    });
    return obj.currentPage;
}