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

function setProfile(email) {
    return sessionStorage.setItem("email", email);
}

function getProfile() {
    return sessionStorage.getItem("email");
}

function saveTodo(list) {
    localStorage.setItem("todo", list);
}

function getTodo() {
    return localStorage.getItem("todo");
}

function addToTodo(value) {
    var todo = [];
    if(getTodo()) {
        todo = JSON.parse(getTodo());
    }
    todo.push(value);
    saveTodo(JSON.stringify(todo));
    return todo.length - 1;
}

function removeFromTodo(index) {
    if(getTodo()) {
        var todo = JSON.parse(getTodo());
        if (index > -1) {
            todo.splice(index, 1);
            saveTodo(JSON.stringify(todo));
        }
    }
}