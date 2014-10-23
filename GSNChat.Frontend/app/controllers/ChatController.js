'use strict';
app.controller('chatController', ['$scope', '$location', 'chatService', function ($scope, $location, chatService) {

    

    $scope.message = "";

    $scope.login = function () {

        authService.login($scope.loginData).then(function (response) {

            $location.path('/orders');

        },
         function (err) {
             $scope.message = err.error_description;
         });
    };

}]);