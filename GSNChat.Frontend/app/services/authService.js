'use strict';
app.factory('authService', ['$http', '$q', 'localStorageService', function ($http, $q, localStorageService) {

    var serviceBase = 'http://devbackgsnchat.jeroenveldhuijzen.nl/';
    var authServiceFactory = {};
    var userStore = [];

    var _getUsers = function () {
        return $http.get(serviceBase + 'api/account/getusers').then(function (response) {
                console.log(response.data.results);
                userStore = response.data.results;
                
                return response;
            });
        
    };

    var _authentication = {
        isAuth: false,
        userName: ""
    };

    var _saveRegistration = function (registration) {

        _logOut();

        return $http.post(serviceBase + 'api/account/register', registration).then(function (response) {
            return response;
        });

    };

    var _updateUser = function (account) {

        return $http.put('http://localhost:41021/' + 'api/account/', account).then(function (response) {
            return response;
        });
    }

    var _removeUser = function (account) {

        return $http.delete(serviceBase + 'api/account/', account).then(function (response) {
            return response;
        });
    }

    var _login = function (loginData) {

        var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password;

        var deferred = $q.defer();

        $http.post('http://localhost:41021/' + 'token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

            localStorageService.set('authorizationData', { token: response.access_token, userName: loginData.userName });

            _authentication.isAuth = true;
            _authentication.userName = loginData.userName;

            deferred.resolve(response);

        }).error(function (err, status) {
            _logOut();
            deferred.reject(err);
        });

        return deferred.promise;

    };

    var _logOut = function () {

        localStorageService.remove('authorizationData');

        _authentication.isAuth = false;
        _authentication.userName = "";

    };

    var _fillAuthData = function () {

        var authData = localStorageService.get('authorizationData');
        if (authData) {
            _authentication.isAuth = true;
            _authentication.userName = authData.userName;
        }

    }

    authServiceFactory.saveRegistration = _saveRegistration;
    authServiceFactory.updateUser = _updateUser;
    authServiceFactory.removeUser = _removeUser;
    authServiceFactory.login = _login;
    authServiceFactory.logOut = _logOut;
    authServiceFactory.fillAuthData = _fillAuthData;
    authServiceFactory.authentication = _authentication;
    authServiceFactory.getUsers = _getUsers;
    return authServiceFactory;
}]);