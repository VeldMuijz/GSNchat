'use strict';
app.factory('chatService', ['$http', '$q', 'localStorageService', function ($http, $q, localStorageService) {

    var chatStore = [
        { "user":"System", "message":"Welkom bij de GSNChat!", "timestamp":"14:00", "groupId":"" },
        { "user":"Test1", "message":"testbericht uit chatStore", "timestamp":"14:00", "groupId":"" },
        { "user":"Test1", "message":"testbericht uit chatStore2", "timestamp":"14:00", "groupId":"" },
        { "user":"Test2", "message":"testbericht uit chatStore2", "timestamp":"14:00", "groupId":"" }
    ];


    return {

        sendMessage: function (userName, message) {

            // Simple POST request example (passing data) :

            var request =
            $http.post('http://localhost:41021/api/chat/sendmessage', { userName: userName, message: message })

            return (request.then(handleSuccess, handleError));

        },
        storeMessage: function (chat) {
            //E.g.: { "user": "Test1", "message": "message Content", "timestamp": "14:00", "groupId": "" }
            chatStore.push(chat);
            
        },
        getStore: function () {
            
            return angular.fromJson(chatStore);
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


    // I transform the successful response, unwrapping the application data
    // from the API response payload.
    function handleSuccess(response) {

        return true;

    }

}]);