var AuthListener = null;

/*
    GMAIL Authentication
*/
function authorize() {
  gapi.auth.authorize(
  {
    'client_id': CLIENT_ID,
    'scope': SCOPES.join(' '),
    'immediate': true
  }, handleAuth);
}

function handleAuth(authResult) {
    if (authResult && !authResult.error) {
        AuthListener(true, authResult);
    } else {
        AuthListener(false, authResult);
    }
}

function performAuth(event) {
    gapi.auth.authorize(
      {client_id: CLIENT_ID, scope: SCOPES.join(' '), immediate: false}, handleAuth);
    return false;
}

function logout(event) {
    gapi.auth.signOut();
    return false;
}


/*
    Required functions
*/

// Profile - Get
function getProfileFromServer(callback) {
    gapi.client.load('gmail', 'v1', function() {
      var request = gapi.client.gmail.users.getProfile({
        'userId': USER_ID
      });
      request.execute(callback);
    });
}
// Threads - List
function listAllThreadsFromInbox(nextPageToken, callback) {
  gapi.client.load('gmail', 'v1', function() { //Loads all from inbox
      var body = {
        'userId': USER_ID,
        'labelIds': [GMAIL_LABELS.inbox],
        'maxResults': THREAD_LIMIT
      }
      if(nextPageToken != "null") {
          body.pageToken = nextPageToken;
      }
      var request = gapi.client.gmail.users.threads.list(body);
      request.execute(callback);
  });
}

function listAllThreadsFromSent(nextPageToken, callback) {  
  gapi.client.load('gmail', 'v1', function() { //Loads all from sent
      var body = {
        'userId': USER_ID,
        'labelIds': [GMAIL_LABELS.sent],
        'maxResults': THREAD_LIMIT
      }
      if(nextPageToken != "null") {
          body.pageToken = nextPageToken;
      }
      var request = gapi.client.gmail.users.threads.list(body);
      request.execute(callback);
  });
}

// Threads - Get
function getThread(threadId, callback) {
  gapi.client.load('gmail', 'v1', function() {
      var request = gapi.client.gmail.users.threads.get({
        'userId': USER_ID,
        'id': threadId
      });
      request.execute(callback);
  });
}

// Threads - Modify
function modifyThread(threadId, labelsToAdd, labelsToRemove, callback) {
  gapi.client.load('gmail', 'v1', function() {
      var request = gapi.client.gmail.users.threads.modify({
        'userId': USER_ID,
        'id': threadId,
        'addLabelIds': labelsToAdd,
        'removeLabelIds': labelsToRemove
      });
      request.execute(callback);
  });
}

// Message - Modify
function modifyMessage(msgId, labelsToAdd, labelsToRemove, callback) {
  gapi.client.load('gmail', 'v1', function() {
      var request = gapi.client.gmail.users.messages.modify({
        'userId': USER_ID,
        'id': msgId,
        'addLabelIds': labelsToAdd,
        'removeLabelIds': labelsToRemove
      });
      request.execute(callback);
  });
}

// Message - Send
function sendMessage(email, callback) {
  gapi.client.load('gmail', 'v1', function() {
      var base64EncodedEmail = btoa(email).replace(/\+/g, '-').replace(/\//g, '_');
      var request = gapi.client.gmail.users.messages.send({
        'userId': USER_ID,
        'resource': {
          'raw': base64EncodedEmail
        }
      });
      request.execute(callback);
  });
}

// Message - Reply
function replyMessage(email, threadId, callback) {
  gapi.client.load('gmail', 'v1', function() {
      var base64EncodedEmail = btoa(email).replace(/\+/g, '-').replace(/\//g, '_');
      var request = gapi.client.gmail.users.messages.send({
        'userId': USER_ID,
        'resource': {
          'raw': base64EncodedEmail,
          'threadId': threadId 
        }
      });
      request.execute(callback);
  });
}

// Message - Get

function getMessage(messageId, callback) { 
  gapi.client.load('gmail', 'v1', function() {
      var request = gapi.client.gmail.users.messages.get({
        'userId': USER_ID,
        'id': messageId
      });
      request.execute(callback);
  });
}

// Label - Create

function createLabel(newLabelName, callback) {
  gapi.client.load('gmail', 'v1', function() {
      var request = gapi.client.gmail.users.labels.create({
        'userId': USER_ID,
        'label': {
          'name': newLabelName,
          'labelListVisibility': 'labelShow',
          'messageListVisibility': 'show'
        }
      });
      request.execute(callback);
  });
}

// Label - List

function listLabels(callback) {
  gapi.client.load('gmail', 'v1', function() {
      var request = gapi.client.gmail.users.labels.list({
        'userId': USER_ID
      });
      request.execute(function(resp) {
        var labels = resp.labels;
        callback(labels);
      });
  });
}


/*
    HELPER Functions
*/

// Make email
function makeEmail(from, to, cc, subject, message) {
    var email = '';
    if(from) {
        email += 'From: ' + from + '\r\n';
    }
    if(to)
        email += 'To: ' + to + '\r\n';
    if(cc)
        email += 'Cc: ' + cc + '\r\n';
    if(subject)
        email += 'Subject: ' + subject + '\r\n';
    if(message) {
        email += '\r\n';
        email += message;
    }
    return email;
}

// Get Headers, Body and Html
function getHeader(headers, index) {
    var header = '';
    $.each(headers, function(){
      if(this.name.toLowerCase() === index.toLowerCase()){
        header = this.value;
      }
    });
    return header;
}

function getBody(message) {
    var encodedBody = '';
    if(typeof message.parts === 'undefined') {
        encodedBody = message.body.data;
    } else {
      encodedBody = getHTMLPart(message.parts);
    }
    encodedBody = encodedBody.replace(/-/g, '+').replace(/_/g, '/').replace(/\s/g, '');
    return decodeURIComponent(escape(window.atob(encodedBody)));
}

function getHTMLPart(arr) {
    for(var x = 0; x <= arr.length; x++) {
      if(typeof arr[x].parts === 'undefined') {
        if(arr[x].mimeType === 'text/html') {
          return arr[x].body.data;
        }
      } else {
        return getHTMLPart(arr[x].parts);
      }
    }
    return '';
}

function getTimeRemaining(endtime){
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor( (t/1000) % 60 );
  var minutes = Math.floor( (t/1000/60) % 60 );
  var hours = Math.floor( (t/(1000*60*60)) % 24 );
  var days = Math.floor( t/(1000*60*60*24) );
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}

// Parser - Parse Task from mail

function parseTaskIdFromSubject(subject) {
    var subs = subject.split("#");
    for(i = 0; i < subs.length; i++) {
        if(subs[i].startsWith(TASK_PREFIX)) {
            return subs[i].substring(3, subs[i].length);
        }
    }
    return false;
}

// Validator - Check if email is valid
function isValidEmailAddresses(emailAddresses) {
    for(var i = 0; i < emailAddresses.length; i++) {
        var email = emailAddresses[i].trim();
        console.log(email, isValidEmailAddress(email));
        if(!isValidEmailAddress(email)) {
            return false;
        }
    }
    return true;
}

function isValidEmailAddress(emailAddress) {
    var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return pattern.test(emailAddress);
};

// Escape HTML Chars
function escapeHtml(unsafe) {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
 }