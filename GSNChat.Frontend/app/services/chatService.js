'use strict';
app.factory('chatService', ['$http', '$q', 'localStorageService', function ($http, $q, localStorageService) {

    var chatStore = [
        { "user":"System", "message":"Welkom bij de GSNChat!", "timestamp":"", "groupId":"" }
        
    ];
    var pmStore = [];
    //[ "user":"username1",chat:[ 
    //                              "user":"username1", "message":"Hello username1", "timestamp":"", "receiver":"username2" },
    //                              "user":"username2", "message":"Hi there username2", "timestamp":"", "receiver":"username1" }],
    //  "user":"username3","chat":[ 
    //                              "user":"username3", "message":"Hello username1", "timestamp":"", "receiver":"username4" },
    //                              "user":"username4", "message":"Hi there username2", "timestamp":"", "receiver":"username3" }]
    //]
    var promise;

    var userStore; 
    //{ "name": "testuser", "connectionId": "123456" },
    //{ "name": "Klei", "connectionId": "123456" }


    return {

        sendMessage: function (name, message) {

            var request =
            $http.post('http://devbackgsnchat.jeroenveldhuijzen.nl/api/chat/sendmessage', { userName: name, message: message })

            return (request.then(handleSuccess, handleError));

        },
        sendPrivateMessage: function (name, message, receiver, connectionIds) {

            var json = { userName: name, message: message, receivers: [] };
            json.receivers = connectionIds;
                        
            var request = $http.post('http://devbackgsnchat.jeroenveldhuijzen.nl/api/chat/sendmessage/pm/' + receiver, json);
           
            return (request.then(handleSuccess, handleError));

        },
        storeMessage: function (chat) {
            //E.g.: { "user": "Test1", "message": "message Content", "timestamp": "14:00", "groupId": "" }
            chatStore.push(chat);
            return true;
        },
        storePMReceived: function (chat) {
            pmStore[chat.user].push(chat);
            pmStore[chat.user].push(chat);
            //pmStore.push(chat);
            alert("chat received \n" + angular.toJson(pmStore));
            return true;
        },
        storePMSent: function (chat) {
            var user = chat.user;
            var key = null;
            if (pmStore.length < 1) {
                pmStore.push({ user: chat.user, chat: [chat] });

            } else{
                $.each(pmStore, function(index, value){
                    if(value.user === chat.user){
                        key = index;
                        value.chat.push(chat);

                        return false;
                    }
                });
                if (key == null) {
                    pmStore.push({ user: chat.user, chat: chat });
                }
                
            }
            alert("chat sent \n" + angular.toJson(pmStore));
    return true;
},
    getStore: function () {
            
        return angular.fromJson(chatStore);
    },
getPMStore: function () {
            
    return angular.fromJson(pmStore);
},
getUsers: function () {

    promise = $http.get('http://devbackgsnchat.jeroenveldhuijzen.nl/api/chat/getconnections').
        then(function (data, status, headers, config) {
            console.log(data)

            return data;

        });
            
    return promise;
            
},
addUser: function (user) {

    userStore.push(user);

}        

}


// Transform the error response, unwrapping the application data from
// the API response payload.
function handleError(response) {

    // The API response from the server should be returned in a
    // nomralized format. However, if the request was not handled by the
    // server (or what not handles properly - ex. server error), then we
    // may have to normalize it on our end, as best we can.
    if (
        !angular.isObject(response.data) ||
        !response.data.message
        ) {

        return ($q.reject("An unknown error occurred."));

    }

    // Otherwise, use expected error message.
    return ($q.reject(response.data.message));

}


// Transform the successful response, unwrapping the application data
// from the API response payload.
function handleSuccess(response) {

    return true;

}

}]);