'use strict';
app.controller('chatController', ['$scope', '$location', 'chatService', 'authService', function ($scope, $location, chatService, authService) {
    
    $scope.backend = 'http://localhost:41021';

    if (!authService.authentication.isAuth) {
        //no authenticated or not longer authenticated
        alert("U bent niet (langer) aangemeld.")
        $location.path('/login');


    } else {
        $scope.message = '';
        $scope.userName = authService.authentication.userName;
        alert($scope.userName);

        var chat = $.connection.chatHub;
        $.connection.hub.url = $scope.backend +'/signalr/hubs';

        chat.client.broadcastMessage = function (name, message) {

            $('#chatboxfeed').append("<p class=\"row\"><div class=\"col-sm-2 \">" + name + ":</div><div class=\"col-sm-8 \">" + message + "</div><div class=\"col-sm-2 right \">20-10-2014 08:00</div</p>");

        };

        //Have to add jsonp = true for crossdomain requests
        $.connection.hub.start({ jsonp: true }).done(function () {
            alert("Connected!")


            $('#sendmessage').click(function () {
                // Call the Send method on the hub.
                //chat.server.send($scope.userName, $('#chatmessage').val());
                
                $scope.message = chatService.sendMessage($scope.userName, $('#chatmessage').val()).then(
                    function (data, status, headers, config) {
                        $scope.message = "gelukt";
                    },
                    function (data, status, headers, config) {
                        $scope.message = "Niet gelukt";
                    }

                    );
                // Clear text box and reset focus for next comment.
                $('#chatmessage').val('').focus();
            });
        });

    }
    

}]);