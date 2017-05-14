export function changeNumberOfPages(pages, previousNumberOfPages, numberOfPages) {
    if(numberOfPages > previousNumberOfPages) {
        for(let i = previousNumberOfPages; i < numberOfPages; i++) {
            pages.innerHTML += `<button class="page">${i + 1}</button>`;
        }
    } else if(numberOfPages < previousNumberOfPages) {
        for(let i = previousNumberOfPages - 1; i >= numberOfPages; i--) {
            pages.childNodes[i].remove();
        }
    }
}