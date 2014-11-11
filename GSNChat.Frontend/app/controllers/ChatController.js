'use strict';
app.controller('chatController', ['$scope', '$location', 'chatService', 'authService', function ($scope, $location, chatService, authService) {

    

    if (!authService.authentication.isAuth) {
        //no authenticated or not longer authenticated
        alert("U bent niet (langer) aangemeld.")
        $location.path('/login');

    } else {
        $scope.userName = authService.authentication.userName;
        var chat = $.connection.chatHub;
        $.connection.hub.qs = 'user=' + $scope.userName;
        $scope.backend = 'http://devbackgsnchat.jeroenveldhuijzen.nl/';
        $.connection.hub.url = $scope.backend + '/signalr/hubs';
        $scope.message = '';
        $scope.chatStore = chatService.getStore();
        $scope.userStore;

        $scope.sendMessage = function () {
            chatService.sendMessage($scope.userName, $('#chatmessage').val());
            // Clear text box and reset focus for next comment.
            $('#chatmessage').val('').focus();
        }

        chat.client.userLogin = function () {

            chatService.getUsers().then(function (response) {
                alert(angular.toJson(response.data));
                $scope.userStore = response.data;
                console.log($scope.userStore[0].name)
            });

            
            }

        chat.client.userLogOff = function (){
            chatService.getUsers().then(function (response) {
                alert(angular.toJson(response.data));
                $scope.userStore = response.data;
                console.log($scope.userStore[0].name)
            });
        }


        chat.client.broadcastMessage = function (name, message) {
          
            var chatObject = { "user": name, "message": message, "timestamp": new Date().timeNow('hh:mm:ss'), "groupId": "" };

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

        $.connection.hub.reconnecting(function () {
            alert("Trying to reconnect.");
        });

        $.connection.hub.disconnected(function () {
            if ($.connection.hub.lastError)
            { alert("Disconnected. Reason: " + $.connection.hub.lastError.message); }
        });


    }


}]);