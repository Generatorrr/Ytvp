import {changePage} from './changePage';

export function swipe(wrapper, pages, resultDiv, search, obj) { 
    let resultDivPostionX = 0, mousedownX = 0; 

    const moveHandler = function(e) { 
        var clientX = e.clientX || (e.touches.length ? e.touches[0].clientX : null); 
        resultDiv.style.left = parseInt(resultDiv.style.left, 10) + (clientX - mousedownX) + 'px'; 
        mousedownX = clientX; 
    }; 

    const mouseUpHandler = function(e) { 
        pages.childNodes[obj.currentPage - 1].classList.remove('active'); 
        resultDiv.style.transition = 'left 0.5s'; 
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
    }; 

    wrapper.addEventListener('mousedown', function(e) { 
        mousedownX = e.clientX ; 
        resultDivPostionX = parseInt(resultDiv.style.left); 
        resultDiv.style.transition = 'left .1s'; 
        wrapper.addEventListener('mousemove', moveHandler); 
        wrapper.addEventListener('mouseup', mouseUpHandler); 
    }); 

    wrapper.addEventListener('touchstart', function(e) { 
        mousedownX = e.touches[0].clientX; 
        resultDivPostionX = parseInt(resultDiv.style.left); 
        resultDiv.style.transition = 'left .1s'; 
        wrapper.addEventListener('touchmove', moveHandler); 
        wrapper.addEventListener('touchend', mouseUpHandler); 
    }); 
}
