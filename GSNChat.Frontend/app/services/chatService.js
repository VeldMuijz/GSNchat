'use strict';
app.factory('chatService', ['$http', '$q', 'localStorageService', function ($http, $q, localStorageService) {

    var chatStore = [
        { "user":"System", "message":"Welkom bij de GSNChat!", "timestamp":"", "groupId":"" },
        
    ];
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
        storeMessage: function (chat) {
            //E.g.: { "user": "Test1", "message": "message Content", "timestamp": "14:00", "groupId": "" }
            chatStore.push(chat);
            return true;
        },
        getStore: function () {
            
            return angular.fromJson(chatStore);
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