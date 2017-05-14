import {changePage} from './changePage';

function swipeTouch(wrapper, pages, resultDiv, search, obj) {
    let resultDivPostionX = 0, mousedownX = 0;

    const moveHandler = function(e) {
        resultDiv.style.left = parseInt(resultDiv.style.left, 10) + (e.pageX - mousedownX) + 'px';
        mousedownX = e.pageX;
    }

    const mouseUpHandler = function(e) {
        pages.childNodes[obj.currentPage - 1].classList.remove('active');
        resultDiv.style.transition = 'left 2s';
        const changePosition = resultDivPostionX - parseInt(resultDiv.style.left, 10);
        if(changePosition > obj.chageForSwipe) {
            obj.currentPage++;
        } else if(changePosition < -obj.chageForSwipe) {
            if(obj.currentPage > 1) {
                obj.currentPage--;
            }
        }
        changePage(obj.currentPage, pages, resultDiv, search, obj);
        mousedownX = 0;
        wrapper.removeEventListener('touchmove', moveHandler);
        wrapper.removeEventListener('touchend', mouseUpHandler);
    }

    wrapper.addEventListener('touchstart', function(e) {
        mousedownX = e.pageX;
        resultDivPostionX = parseInt(resultDiv.style.left);
        resultDiv.style.transition = 'left .1s';
        wrapper.addEventListener('touchmove', moveHandler);
        wrapper.addEventListener('touchend', mouseUpHandler);
    });
}

export {swipeTouch};