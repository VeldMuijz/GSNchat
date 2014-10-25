'use strict';
app.controller('chatController', ['$scope', '$location', 'chatService', 'authService', function ($scope, $location, chatService, authService) {

    $scope.backend = 'http://localhost:41021';

    if (!authService.authentication.isAuth) {
        //no authenticated or not longer authenticated
        alert("U bent niet (langer) aangemeld.")
        $location.path('/login');


    } else {
        $scope.message = '';
        $scope.chatStore = chatService.getStore();

        $scope.userName = authService.authentication.userName;

        var chat = $.connection.chatHub;
        $.connection.hub.url = $scope.backend + '/signalr/hubs';

        chat.client.broadcastMessage = function (name, message) {

            var chatObject = { "user": name, "message": message, "timestamp": "14:00", "groupId": "" };

            chatService.storeMessage(chatObject);
            $scope.apply;
            // Old logic to append to chatfeed:$('#chatboxfeed').append("<p class=\"row\"><div class=\"col-sm-2 \">" + name + ":</div><div class=\"col-sm-8 \">" + message + "</div><div class=\"col-sm-2 right \">20-10-2014 08:00</div</p>");

        };

        //Have to add jsonp = true for crossdomain requests
        $.connection.hub.start({ jsonp: true }).done(function () {

            $('#sendmessage').click(function () {
                // Call the Send method on the hub.
                //chat.server.send($scope.userName, $('#chatmessage').val());

                $scope.message = chatService.sendMessage($scope.userName, $('#chatmessage').val());

                // Clear text box and reset focus for next comment.
                $('#chatmessage').val('').focus();
            });
        });

    }


}]);