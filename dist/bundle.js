/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.changePage = changePage;

var _reqSearch = __webpack_require__(1);

function changePage(number, pages, resultDiv, search, obj) {
    pages.childNodes[obj.currentPage - 1].classList.add('active');
    resultDiv.style.left = '-' + obj.offsetWrapper * (number - 1) + 'px';
    if (number % 3 === 0 && number + 3 > obj.numberOfPages || number === obj.numberOfPages) {
        (0, _reqSearch.req)(pages, resultDiv, search, obj);
    }
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.req = req;

var _reqVideo = __webpack_require__(10);

var _changeNumberOfPages = __webpack_require__(2);

var _customFetch = __webpack_require__(3);

function req(pages, resultDiv, search, obj) {
    var url = "https://www.googleapis.com/youtube/v3/search";
    var params = {
        queryParams: {
            part: 'snippet',
            maxResults: 15,
            q: search.value,
            type: 'video',
            key: 'AIzaSyBoFvH0H-NtvQ-dsB6cFs8QXDKREZhFi68'
        }
    };
    if (obj.nextPageToken !== '') {
        params.queryParams.pageToken = obj.nextPageToken;
    }
    var responseHandler = function responseHandler(result) {
        var previousCount = obj.countResult;
        var previousNumberOfPages = obj.numberOfPages;
        obj.countResult = previousCount + result.items.length;
        obj.numberOfPages = Math.floor(obj.countResult / obj.resultPerPage);
        if (obj.nextPageToken === '' && obj.countResult === 0) {
            alert('Поиск не дал результатов');
        } else {
            obj.nextPageToken = result.nextPageToken;
            console.log(obj);
            (0, _changeNumberOfPages.changeNumberOfPages)(pages, previousNumberOfPages, obj.numberOfPages);
            pages.childNodes[obj.currentPage - 1].classList.add('active');
            result.items.forEach(function (item, i, arr) {
                (0, _reqVideo.viewResult)(item, previousCount + i, resultDiv);
            });
        }
    };

    var errorHandler = function errorHandler(error) {
        alert(error.message);
    };

    (0, _customFetch.getDataFromYoutube)(url, params, responseHandler, errorHandler);

    return obj;
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.changeNumberOfPages = changeNumberOfPages;
function changeNumberOfPages(pages, previousNumberOfPages, numberOfPages) {
    if (numberOfPages > previousNumberOfPages) {
        for (var i = previousNumberOfPages; i < numberOfPages; i++) {
            pages.innerHTML += "<button class=\"page\">" + (i + 1) + "</button>";
        }
    } else if (numberOfPages < previousNumberOfPages) {
        for (var _i = previousNumberOfPages - 1; _i >= numberOfPages; _i--) {
            pages.childNodes[_i].remove();
        }
    }
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getDataFromYoutube = getDataFromYoutube;
function customFetch(url) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (options.queryParams) {
        url += (url.indexOf('?') === -1 ? '?' : '&') + queryParams(options.queryParams);
        delete options.queryParams;
    }

    return fetch(url, options);
}

function queryParams(params) {
    return Object.keys(params).map(function (k) {
        return encodeURIComponent(k) + '=' + encodeURIComponent(params[k]);
    }).join('&');
}

function getDataFromYoutube(url, params, youtubeResponseHandler, errorHandler) {
    customFetch(url, params).then(function (r) {
        return r.json();
    }).then(youtubeResponseHandler).catch(errorHandler);
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var searchDiv = exports.searchDiv = document.createElement('div');
searchDiv.className = 'search';
document.body.appendChild(searchDiv);
var searchLabel = exports.searchLabel = document.createElement('label');
searchLabel.innerHTML = '<i class="fa fa-search" aria-hidden="true"></i>';
searchDiv.appendChild(searchLabel);
var search = exports.search = document.createElement('input');
search.setAttribute('id', 'stringSearch');
search.setAttribute('type', 'text');
search.setAttribute('placeholder', 'Search');
searchDiv.appendChild(search);
searchLabel.setAttribute('for', 'stringSearch');
var wrapper = exports.wrapper = document.createElement('div');
wrapper.setAttribute('id', 'wrapper');
document.body.appendChild(wrapper);
var resultDiv = exports.resultDiv = document.createElement('div');
resultDiv.setAttribute('id', 'result');
wrapper.appendChild(resultDiv);
var pages = exports.pages = document.createElement('div');
pages.setAttribute('id', 'pages');
document.body.appendChild(pages);

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.pageListener = pageListener;

var _changePage = __webpack_require__(0);

function pageListener(pages, resultDiv, search, obj) {
    pages.addEventListener('click', function (e) {
        if (e.target.classList.contains('page')) {
            pages.childNodes[obj.currentPage - 1].classList.remove('active');
            obj.currentPage = parseInt(e.target.innerHTML, 10);
            (0, _changePage.changePage)(obj.currentPage, pages, resultDiv, search, obj);
        }
    });
    return obj.currentPage;
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.addSearchListener = addSearchListener;

var _reqSearch = __webpack_require__(1);

function addSearchListener(search, resultDiv, pages, obj) {
    search.addEventListener('keydown', function (e) {
        if (e.keyCode === 13) {
            resultDiv.innerHTML = '';
            resultDiv.style.left = '0px';
            pages.innerHTML = '';
            obj.numberOfPages = 0;
            obj.countResult = 0;
            obj.currentPage = 1;
            obj.nextPageToken = '';
            obj = (0, _reqSearch.req)(pages, resultDiv, search, obj);
        }
    });

    return obj;
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.swipe = undefined;

var _changePage = __webpack_require__(0);

function swipe(wrapper, pages, resultDiv, search, obj) {
    var resultDivPostionX = 0,
        mousedownX = 0;

    var moveHandler = function moveHandler(e) {
        resultDiv.style.left = parseInt(resultDiv.style.left, 10) + (e.pageX - mousedownX) + 'px';
        mousedownX = e.pageX;
    };

    var mouseUpHandler = function mouseUpHandler(e) {
        pages.childNodes[obj.currentPage - 1].classList.remove('active');
        resultDiv.style.transition = 'left 2s';
        var changePosition = resultDivPostionX - parseInt(resultDiv.style.left, 10);
        if (changePosition > obj.chageForSwipe) {
            obj.currentPage++;
        } else if (changePosition < -obj.chageForSwipe) {
            if (obj.currentPage > 1) {
                obj.currentPage--;
            }
        }
        (0, _changePage.changePage)(obj.currentPage, pages, resultDiv, search, obj);
        mousedownX = 0;
        wrapper.removeEventListener('mousemove', moveHandler);
        wrapper.removeEventListener('mouseup', mouseUpHandler);
    };

    wrapper.addEventListener('mousedown', function (e) {
        mousedownX = e.pageX;
        resultDivPostionX = parseInt(resultDiv.style.left);
        resultDiv.style.transition = 'left .1s';
        wrapper.addEventListener('mousemove', moveHandler);
        wrapper.addEventListener('mouseup', mouseUpHandler);
    });
}

exports.swipe = swipe;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.swipeTouch = undefined;

var _changePage = __webpack_require__(0);

function swipeTouch(wrapper, pages, resultDiv, search, obj) {
    var resultDivPostionX = 0,
        mousedownX = 0;

    var moveHandler = function moveHandler(e) {
        resultDiv.style.left = parseInt(resultDiv.style.left, 10) + (e.pageX - mousedownX) + 'px';
        mousedownX = e.pageX;
    };

    var mouseUpHandler = function mouseUpHandler(e) {
        pages.childNodes[obj.currentPage - 1].classList.remove('active');
        resultDiv.style.transition = 'left 2s';
        var changePosition = resultDivPostionX - parseInt(resultDiv.style.left, 10);
        if (changePosition > obj.chageForSwipe) {
            obj.currentPage++;
        } else if (changePosition < -obj.chageForSwipe) {
            if (obj.currentPage > 1) {
                obj.currentPage--;
            }
        }
        (0, _changePage.changePage)(obj.currentPage, pages, resultDiv, search, obj);
        mousedownX = 0;
        wrapper.removeEventListener('touchmove', moveHandler);
        wrapper.removeEventListener('touchend', mouseUpHandler);
    };

    wrapper.addEventListener('touchstart', function (e) {
        mousedownX = e.pageX;
        resultDivPostionX = parseInt(resultDiv.style.left);
        resultDiv.style.transition = 'left .1s';
        wrapper.addEventListener('touchmove', moveHandler);
        wrapper.addEventListener('touchend', mouseUpHandler);
    });
}

exports.swipeTouch = swipeTouch;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _elements = __webpack_require__(4);

var _searchListener = __webpack_require__(6);

var _reqSearch = __webpack_require__(1);

var _pageListener = __webpack_require__(5);

var _changePage = __webpack_require__(0);

var _swipeListener = __webpack_require__(7);

var _swipeTouchListener = __webpack_require__(8);

var _changeNumberOfPages = __webpack_require__(2);

window.onload = function () {

    var obj = {
        currentPage: 1,
        countResult: 0,
        resultPerPage: 4,
        numberOfPages: 0,
        nextPageToken: '',
        chageForSwipe: 300,
        offsetWrapper: 1480
    };

    var sizeObj = {
        searchWidth: _elements.search.style.width,
        searchDivWidth: _elements.searchDiv.style.width,
        wrapperWidth: _elements.wrapper.style.width
    };

    function resize() {
        if (window.innerWidth < 710 || screen.width < 710) {
            sizeObj.searchWidth = 250;
            sizeObj.searchDivWidth = 300;
            sizeObj.wrapperWidth = 320;
            obj.resultPerPage = 1;
            obj.chageForSwipe = 20;
            obj.offsetWrapper = 370;
        } else if (window.innerWidth < 1080 || screen.width < 1080) {
            sizeObj.searchWidth = 450;
            sizeObj.searchDivWidth = 500;
            sizeObj.wrapperWidth = 690;
            obj.resultPerPage = 2;
            obj.chageForSwipe = 80;
            obj.offsetWrapper = 740;
        } else if (window.innerWidth < 1450 || screen.width < 1450) {
            sizeObj.searchWidth = 550;
            sizeObj.searchDivWidth = 600;
            sizeObj.wrapperWidth = 1060;
            obj.resultPerPage = 3;
            obj.chageForSwipe = 170;
            obj.offsetWrapper = 1110;
        } else {
            sizeObj.searchWidth = 650;
            sizeObj.searchDivWidth = 700;
            sizeObj.wrapperWidth = 1430;
            obj.resultPerPage = 4;
            obj.chageForSwipe = 300;
            obj.offsetWrapper = 1480;
        }
        _elements.search.style.width = sizeObj.searchWidth + 'px';
        _elements.searchDiv.style.width = sizeObj.searchDivWidth + 'px';
        _elements.wrapper.style.width = sizeObj.wrapperWidth + 'px';
    }

    resize();

    obj = (0, _searchListener.addSearchListener)(_elements.search, _elements.resultDiv, _elements.pages, obj);

    obj.currentPage = (0, _pageListener.pageListener)(_elements.pages, _elements.resultDiv, _elements.search, obj);

    (0, _swipeListener.swipe)(_elements.wrapper, _elements.pages, _elements.resultDiv, _elements.search, obj);

    window.onresize = function () {
        var previousNumberOfPages = obj.numberOfPages;
        var currentResult = (obj.currentPage - 1) * obj.resultPerPage + 1;
        resize();
        obj.numberOfPages = Math.floor(obj.countResult / obj.resultPerPage);
        (0, _changeNumberOfPages.changeNumberOfPages)(_elements.pages, previousNumberOfPages, obj.numberOfPages);
        _elements.pages.childNodes[obj.currentPage - 1].classList.remove('active');
        obj.currentPage = Math.ceil(currentResult / obj.resultPerPage);
        _elements.pages.childNodes[obj.currentPage - 1].classList.add('active');
    };
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.viewResult = viewResult;

var _customFetch = __webpack_require__(3);

function viewResult(item, number, resultDiv) {
    var url = "https://www.googleapis.com/youtube/v3/videos";
    var params = {
        queryParams: {
            part: 'snippet, statistics',
            id: item.id.videoId,
            key: 'AIzaSyBoFvH0H-NtvQ-dsB6cFs8QXDKREZhFi68'
        }
    };

    var responseHandler = function responseHandler(resultVideo) {
        var itemDiv = document.createElement('div');
        var urlYoutube = 'https://www.youtube.com/watch?v=' + item.id.videoId;
        itemDiv.className = 'item ' + number;
        itemDiv.innerHTML = '<a href=' + urlYoutube + ' class="title">' + resultVideo.items[0].snippet.title + '</a>\n                            <img src=' + resultVideo.items[0].snippet.thumbnails.medium.url + ' alt="preview image" />\n                            <div class="information">\n                                <div>\n                                    <i class="fa fa-user" aria-hidden="true"></i>\n                                    <span class="channel">' + resultVideo.items[0].snippet.channelTitle + '</span>\n                                </div>\n                                <div>\n                                    <i class="fa fa-calendar" aria-hidden="true"></i>\n                                    <span class="date">' + resultVideo.items[0].snippet.publishedAt.slice(0, 10) + '</span>\n                                </div>\n                                <div>\n                                    <i class="fa fa-eye" aria-hidden="true"></i>\n                                    <span class="date">' + resultVideo.items[0].statistics.viewCount + '</span>\n                                </div>\n                            </div>\n                            <p class="description">' + item.snippet.description + '</p>';
        resultDiv.appendChild(itemDiv);
        itemDiv.style.left = 370 * number + 'px';
    };

    var errorHandler = function errorHandler(error) {
        alert(error.message);
    };
    (0, _customFetch.getDataFromYoutube)(url, params, responseHandler, errorHandler);
}

/***/ })
/******/ ]);