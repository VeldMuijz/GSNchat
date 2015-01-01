'use strict';
app.controller('chatController', ['$scope', '$window', '$location', 'chatService', 'authService', function ($scope, $window, $location, chatService, authService) {



    if (!authService.authentication.isAuth) {
        //no authenticated or not longer authenticated
        alert("U bent niet (langer) aangemeld.")
        $location.path('/login');

    } else {

        $scope.userName = authService.authentication.userName;
        $scope.receiver = "";
        $scope.connected = false;
        $scope.showChatbox = true;
        var chat = $.connection.chatHub;
        $.connection.hub.qs = 'user=' + $scope.userName;
        $scope.backend = 'http://devbackgsnchat.jeroenveldhuijzen.nl/';
        $.connection.hub.url = $scope.backend + '/signalr/hubs';
        $scope.message = '';
        $scope.chatStore = chatService.getStore();
        $scope.pmStore = chatService.getPMStore();
        $scope.userStore;

        $scope.setReceiver = function (name) {
            $scope.receiver = name;
            if (!$scope.receiver.trim()) {
                $scope.showChatbox = true;
            } else {
                $scope.showChatbox = false;
            }
        };

        $scope.sendMessage = function () {

            if (!$scope.receiver.trim()) {
                chatService.sendMessage($scope.userName, $('#chatmessage').val());
            } else {
                $scope.sendPrivateMessage();
            }


            chatService.sendMessage($scope.userName, $('#chatmessage').val());
            // Clear text box and reset focus for next message.
            $('#chatmessage').val('').focus();
        };

        $scope.sendPrivateMessage = function () {
            var connectionIds = [];

            $.each($scope.userStore, function (index, value) {
                if (value.name === $scope.userName || value.name === $scope.receiver) {
                    $.each(value.connectionID, function (index, value) {
                        connectionIds.push(value);
                    });

                }
            });

            chatService.sendPrivateMessage($scope.userName, $('#chatprivatemessage').val(), $scope.receiver, connectionIds);

            // Clear text box and reset focus for next message.
            $('#chatprivatemessage').val('').focus();
        };

        chat.client.userLogin = function () {

            chatService.getUsers().then(function (response) {
                $scope.userStore = response.data;
            });
        }

        chat.client.userLogOff = function () {
            chatService.getUsers().then(function (response) {
                $scope.userStore = response.data;
            });
        }


        chat.client.broadcastMessage = function (name, message) {

            var chatObject = { "user": name, "message": message, "timestamp": new Date().timeNow('hh:mm:ss') };

            //use apply to update view immediately
            $scope.$apply(function () {
                chatService.storeMessage(chatObject);
                $scope.chatStore = chatService.getStore();

            });

            if (message.toLowerCase().indexOf($scope.userName.toLowerCase()) >= 0) {
                showNotification(name, message, '');
            }
        };

        chat.client.sendPrivateMessage = function (name, message, receiver) {

            var chatObject = { "user": name, "message": message, "timestamp": new Date().timeNow('hh:mm:ss'), "receiver": receiver, "read":false };

            //use apply to update view immediately
            $scope.$apply(function () {
                //chatService.storePM(chatObject);
                if (chatObject.user === $scope.userName) {
                    //send pm to someone
                    chatService.storePMSent(chatObject);
                } else {
                    //received pm from someone
                    chatService.storePMReceived(chatObject);
                }
                $scope.pmStore = chatService.getPMStore();
            });
            if (name.toLowerCase() !== $scope.userName.toLowerCase()) {
                showNotification(name, message, '');
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
    });

    function showNotification(username, message, icon) {

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