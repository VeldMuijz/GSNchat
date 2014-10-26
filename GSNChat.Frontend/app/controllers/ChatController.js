'use strict';
app.controller('chatController', ['$scope', '$location', 'chatService', 'authService', function ($scope, $location, chatService, authService) {

    

    if (!authService.authentication.isAuth) {
        //no authenticated or not longer authenticated
        alert("U bent niet (langer) aangemeld.")
        $location.path('/login');

    } else {

        var chat = $.connection.chatHub;
        $scope.backend = 'http://localhost:41021';
        $.connection.hub.url = $scope.backend + '/signalr/hubs';
        $scope.message = '';
        $scope.chatStore = chatService.getStore();
        $scope.userName = authService.authentication.userName;

        $scope.sendMessage = function () {
            chatService.sendMessage($scope.userName, $('#chatmessage').val());
            // Clear text box and reset focus for next comment.
            $('#chatmessage').val('').focus();
        }

        chat.client.broadcastMessage = function (name, message) {
            var chatObject = { "user": name, "message": message, "timestamp": "14:00", "groupId": "" };

            //use apply to update view immediately
            $scope.$apply(function () {
                chatService.storeMessage(chatObject);
                $scope.chatStore = chatService.getStore();

            });

        };

        //Make connection to SignalR backend
        //Have to add jsonp = true for crossdomain requests
        $.connection.hub.start({ jsonp: true }).done(function () {


        });

    }


}]);