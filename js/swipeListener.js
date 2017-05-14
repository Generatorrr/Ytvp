import {changePage} from './changePage';

function swipe(wrapper, pages, resultDiv, search, obj) {
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
        wrapper.removeEventListener('mousemove', moveHandler);
        wrapper.removeEventListener('mouseup', mouseUpHandler);
    }

    wrapper.addEventListener('mousedown', function(e) {
        mousedownX = e.pageX;
        resultDivPostionX = parseInt(resultDiv.style.left);
        resultDiv.style.transition = 'left .1s';
        wrapper.addEventListener('mousemove', moveHandler);
        wrapper.addEventListener('mouseup', mouseUpHandler);
    });
}

export {swipe};