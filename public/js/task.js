var TaskClass = "taskClass";

function createTask(deadline, callback) {
    var Task = Parse.Object.extend(TaskClass);
    var task = new Task();
    task.save({status: TASK_STATUS.PENDING, deadline: deadline}).then(callback);
}

function completeTask(object, callback) {
    var Task = Parse.Object.extend(TaskClass);
    object.set("status", TASK_STATUS.COMPLETED);
    object.save().then(callback);
}

function incompleteTask(object, callback) {
    var Task = Parse.Object.extend(TaskClass);
    object.set("status", TASK_STATUS.PENDING);
    object.save().then(callback);
}

function trashTask(object, callback) {
    var Task = Parse.Object.extend(TaskClass);
    object.set("status", TASK_STATUS.TRASHED);
    object.save().then(callback);
}

function getTask(objectId, callback) {
    var Task = Parse.Object.extend(TaskClass);
    var query = new Parse.Query(Task);
    query.get(objectId).then(callback);
}

function deleteTask(object, callback) {
    var Task = Parse.Object.extend(TaskClass);
    object.destroy().then(callback);
}

function isATask(subject) {
    if(parseTaskIdFromSubject(subject)) {
        return true;
    }
    return false;
}