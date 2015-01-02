﻿'use strict';
app.controller('accountController', ['$scope', '$location', '$timeout', 'authService', function ($scope, $location, $timeout, authService) {

    $scope.savedSuccessfully = false;
    $scope.message = "";
    $scope.userStore;

    $scope.account = {
        userName: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "Member"
    };

    $scope.updateUser = function () {
        ///save user
        authService.updateUser($scope.account).then(function (response) {

            $scope.savedSuccessfully = true;
            $scope.message = "User has been updated successfully.";
            //startTimer();

        },
         function (response) {
             var errors = [];
             for (var key in response.data.modelState) {
                 for (var i = 0; i < response.data.modelState[key].length; i++) {
                     errors.push(response.data.modelState[key][i]);
                 }
             }
             $scope.message = "Failed to update user due to:" + errors.join(' ');
         });

    }

    $scope.removeUser = function () {
        ///save user
        authService.removeUser($scope.account).then(function (response) {

            $scope.savedSuccessfully = true;
            $scope.message = "User has been deleted successfully.";
            //startTimer();

        },
         function (response) {
             var errors = [];
             for (var key in response.data.modelState) {
                 for (var i = 0; i < response.data.modelState[key].length; i++) {
                     errors.push(response.data.modelState[key][i]);
                 }
             }
             $scope.message = "Failed to delete user due to:" + errors.join(' ');
         });
    }

    $scope.createUser = function (account) {

            authService.saveRegistration($scope.account).then(function (response) {

                $scope.savedSuccessfully = true;
                $scope.message = "User has been Created successfully.";
                $scope.account = {
                    userName: "",
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                    role: "Member"
                };

            },
             function (response) {
                 var errors = [];
                 for (var key in response.data.modelState) {
                     for (var i = 0; i < response.data.modelState[key].length; i++) {
                         errors.push(response.data.modelState[key][i]);
                     }
                 }
                 $scope.message = "Failed to register user due to:" + errors.join(' ');
             });

    };


    $scope.getUsers = function () {
        authService.getUsers().then(function (response) {
            $scope.userStore = response.data.results;
        });

    }

    $scope.getUsers();
    console.log($scope.userStore)

}]);