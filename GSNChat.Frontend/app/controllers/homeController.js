'use strict';
app.controller('homeController', ['$scope', function ($scope) {

    //alert("Loaded")
    //var serviceBase = 'http://localhost:41021/';
    //var hub = 'http://localhost:41021/';

    //var chat = $.connection.chatHub;
    //$.connection.hub.url = 'http://localhost:41021/signalr';

    //chat.client.broadcastMessage = function (name, message) {
    //    $('#chatboxfeed').append("<p class=\"row\"><div class=\"col-sm-2 \">" + name + ":</div><div class=\"col-sm-8 \">" + message + "</div><div class=\"col-sm-2 right \">20-10-2014 08:00</div</p>");


    //};

    ////Have to add jsonp = true for crossdomain requests
    //$.connection.hub.start({ jsonp: true }).done(function () {
    //    alert("Connected!")


    //    $('#sendmessage').click(function () {
    //        // Call the Send method on the hub.
    //        chat.server.send('Chatclient', $('#chatmessage').val());
    //        // Clear text box and reset focus for next comment.
    //        $('#chatmessage').val('').focus();
    //    });
    //});

    $scope.loginData = {
        userName: "",
        password: ""
    };


    $scope.receiveMessage = function () {

    };

}]);