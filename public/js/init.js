// Initialize Parse
Parse.initialize("chekmaark-1508");
Parse.serverURL = 'http://169.44.65.212:1337/parse';


/*
    GLOBAL Variables
*/

var CLIENT_ID = '82837447820-hdcjh1bssfhjp5b296njde78t52dsc8i.apps.googleusercontent.com';
var SCOPES = [
    'https://www.googleapis.com/auth/gmail.readonly',
    'https://www.googleapis.com/auth/gmail.modify',
    'https://www.googleapis.com/auth/gmail.send',
    'https://www.googleapis.com/auth/gmail.labels'
];
var TASK_PREFIX = "CMK";

var NEXT_PAGE_TOKEN_THREADS = "NPT4Threads";
var NEXT_PAGE_TOKEN_MSGS = "NPT4Msgs";

var TASK_STATUS = {
    PENDING: 0,
    COMPLETED: 1,
    TRASHED: 2
}

var TASK_STATUS_NAME = [ "Pending", "Completed", "Trashed"]

var GMAIL_LABELS = {
    inbox: "INBOX",
    personal: "CATEGORY_PERSONAL",
    inbox: "INBOX",
    sent: "SENT",
    trash: "TRASH",
    important: "IMPORTANT",
    starred: "STARRED"
}

var USER_ID = 'me';

var THREAD_LIMIT = 20;
