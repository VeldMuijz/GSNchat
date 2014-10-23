'use strict';
app.controller('homeController', ['$scope', function ($scope) {

    alert("Loaded")
    var serviceBase = 'http://localhost:41021/';
    var hub = 'http://localhost:41021/';

    var chat = $.connection.chatHub;
    $.connection.hub.url = 'http://localhost:41021/signalr';

    chat.client.broadcastMessage = function (name, message) {
        alert(name, message);


    };

    //Have to add jsonp = true for crossdomain requests
    $.connection.hub.start({ jsonp: true }).done(function () {
        alert("Connected!")
        $('#sendmessage').click(function () {
            // Call the Send method on the hub.
            chat.server.send($('#displayname').val(), $('#message').val());
            // Clear text box and reset focus for next comment.
            $('#message').val('').focus();
        });
    });

    $scope.loginData = {
        userName: "",
        password: ""
    };


    $scope.receiveMessage = function () {

    };

}]);