'use strict';
app.factory('chatService', ['$http', '$q', 'localStorageService', function ($http, $q, localStorageService) {
    alert("Loaded")
    var serviceBase = 'http://localhost:41021/';
    var hub = 'http://localhost:41021/';

    var chat = $.connection.chatHub;
    $.connection.hub.url = 'http://localhost:41021/signalr'

    chat.client.broadcastMessage = function (name, message) {
        alert(name, message);
        

    };

    $.connection.hub.start().done(function () {
        alert("Connected!")
        $('#sendmessage').click(function () {
            // Call the Send method on the hub.
            chat.server.send($('#displayname').val(), $('#message').val());
            // Clear text box and reset focus for next comment.
            $('#message').val('').focus();
        });
    });

    //    $(function () {
    //        // Declare a proxy to reference the hub.
    //        var chat = $.connection.chatHub;
    //        // Create a function that the hub can call to broadcast messages.
    //        chat.client.broadcastMessage = function (name, message) {
    //            // Html encode display name and message.
    //            var encodedName = $('<div />').text(name).html();
    //            var encodedMsg = $('<div />').text(message).html();
    //            // Add the message to the page.
    //            $('#discussion').append('<li><strong>' + encodedName
    //                + '</strong>:&nbsp;&nbsp;' + encodedMsg + '</li>');
    //        };
    //        // Get the user name and store it to prepend to messages.
    //        $('#displayname').val(prompt('Enter your name:', ''));
    //        // Set initial focus to message input box.
    //        $('#message').focus();
    //        // Start the connection.

    //    });
    








    //var authServiceFactory = {};

    //var _authentication = {
    //    isAuth: false,
    //    userName: ""
    //};

    //var _saveRegistration = function (registration) {

    //    _logOut();

    //    return $http.post(serviceBase + 'api/account/register', registration).then(function (response) {
    //        return response;
    //    });

    //};

    //var _login = function (loginData) {

    //    var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password;

    //    var deferred = $q.defer();

    //    $http.post(serviceBase + 'token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

    //        localStorageService.set('authorizationData', { token: response.access_token, userName: loginData.userName });

    //        _authentication.isAuth = true;
    //        _authentication.userName = loginData.userName;

    //        deferred.resolve(response);

    //    }).error(function (err, status) {
    //        _logOut();
    //        deferred.reject(err);
    //    });

    //    return deferred.promise;

    //};

    //var _logOut = function () {

    //    localStorageService.remove('authorizationData');

    //    _authentication.isAuth = false;
    //    _authentication.userName = "";

    //};

    //var _fillAuthData = function () {

    //    var authData = localStorageService.get('authorizationData');
    //    if (authData) {
    //        _authentication.isAuth = true;
    //        _authentication.userName = authData.userName;
    //    }

    //}

    //authServiceFactory.saveRegistration = _saveRegistration;
    //authServiceFactory.login = _login;
    //authServiceFactory.logOut = _logOut;
    //authServiceFactory.fillAuthData = _fillAuthData;
    //authServiceFactory.authentication = _authentication;

    //return authServiceFactory;
}]);