function cacheLabels(ids) {
    for(var key in ids) {
        localStorage.setItem(key, ids[key]);
    }
}

function cacheLabel(key, id) {
    localStorage.setItem(key, id);
}

function isLabelLocalAvailable(key) {
    return localStorage.getItem(key);
}

function setNextPageTokenForThreads(token) {
    localStorage.setItem(NEXT_PAGE_TOKEN_THREADS, token);
}

function getNextPageTokenForThreads() {
    return localStorage.getItem(NEXT_PAGE_TOKEN_THREADS);
}


function setNextPageTokenForMsgs(token) {
    localStorage.setItem(NEXT_PAGE_TOKEN_MSGS, token);
}

function getNextPageTokenForMsgs() {
    return localStorage.getItem(NEXT_PAGE_TOKEN_MSGS);
}