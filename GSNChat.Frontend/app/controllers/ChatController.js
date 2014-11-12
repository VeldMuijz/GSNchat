'use strict';
app.controller('chatController', ['$scope','$window', '$location', 'chatService', 'authService', function ($scope, $window, $location, chatService, authService) {

    

    if (!authService.authentication.isAuth) {
        //no authenticated or not longer authenticated
        alert("U bent niet (langer) aangemeld.")
        $location.path('/login');

    } else {

        $scope.userName = authService.authentication.userName;
        $scope.connected = false;
        var chat = $.connection.chatHub;
        $.connection.hub.qs = 'user=' + $scope.userName;
        $scope.backend = 'http://devbackgsnchat.jeroenveldhuijzen.nl/';
        $.connection.hub.url = $scope.backend + '/signalr/hubs';
        $scope.message = '';
        $scope.chatStore = chatService.getStore();
        $scope.userStore;             
        $scope.audio = new Audio('../../Content/sounds/receive.wav');


        $scope.playsound = function () {
           $scope.audio.play();
        }
        

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

            if (message.toLowerCase().indexOf($scope.userName.toLowerCase()) >= 0)
            {
                show($scope.userName, message, '');
            }            
            if ($scope.userName !== name) {
                $scope.playsound();
            }
            
            
        };

        //Make connection to SignalR backend
        //Have to add jsonp = true for crossdomain requests
        $.connection.hub.start({ jsonp: true }).done(function () {
            $scope.connected = true;

        });

        $.connection.hub.reconnecting(function () {
            alert("Trying to reconnect.");
            $scope.connected = false;
        });

        $.connection.hub.disconnected(function () {
            $scope.connected = false;
            if ($.connection.hub.lastError)
            { alert("Disconnected. Reason: " + $.connection.hub.lastError.message); }
        });


    }


    //Notifications for direct messages
    //source: https://developer.cdn.mozilla.net/media/uploads/demos/e/l/elfoxero/c17223c414d8ddafb7808972b5617d9e/html5-notifications_1400214081_demo_package/index.html

	$scope.Notification = window.Notification || window.mozNotification || window.webkitNotification;

    Notification.requestPermission(function (permission) {
        // console.log(permission);
    });

    function show(username, message, icon) {
        
        var instance = new $scope.Notification(
			username, {
			    body: message,
			    icon: icon

			}
		);

        instance.onclick = function () {
            // Something to do
            $window.focus();
        };
        instance.onerror = function () {
            // Something to do
        };
        instance.onshow = function () {
            // Something to do
        };
        instance.onclose = function () {
            // Something to do
        };

        return false;
    }

    

}]);