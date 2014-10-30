'use strict';
app.factory('chatService', ['$http', '$q', 'localStorageService', function ($http, $q, localStorageService) {

    var chatStore = [
        { "user":"System", "message":"Welkom bij de GSNChat!", "timestamp":"14:00", "groupId":"" },
        { "user":"Test1", "message":"testbericht uit chatStore", "timestamp":"14:00", "groupId":"" },
        { "user":"Test1", "message":"testbericht uit chatStore2", "timestamp":"14:00", "groupId":"" },
        { "user":"Test2", "message":"testbericht uit chatStore2", "timestamp":"14:00", "groupId":"" }
    ];

    var userStore = [
        //{ "name": "testuser", "connectionId": "123456" },
        //{ "name": "Klei", "connectionId": "123456" }

    ];

    return {

        sendMessage: function (name, message) {

            var request =
            $http.post('http://localhost:41021/api/chat/sendmessage', { userName: name, message: message })

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

            var request = $http.get('http://localhost:41021/api/chat/sendmessage').
                success(function (data, status, headers, config) {
                    userStore = data;
            }).
             error(function(data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
            

            return angular.fromJson(userStore);
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