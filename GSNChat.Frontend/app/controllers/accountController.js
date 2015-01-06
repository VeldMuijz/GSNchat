'use strict';
app.controller('accountController', ['$scope', '$location', '$timeout', 'authService', function ($scope, $location, $timeout, authService) {

    $scope.savedSuccessfully = false;
    $scope.message = "";
    $scope.userStore;
    $scope.selectedUser = {};
    $scope.selectedUser.value = {};
    $scope.selectedUser.value.UserName = '';
    $scope.changePass = false;

    $scope.account = {
        userName: "",
        firstName: "",
        lastName: "",
        email: "",
        changePass : false,
        password: "",
        confirmPassword: "",
        role: "Member"
    };
    $scope.setChangepass = function () {
        if ($scope.changePass) {
            $scope.changePass = false;
        }else{
            $scope.changePass = true;
        };
    }
    $scope.updateUser = function (account) {
        ///save user
        authService.updateUser(account).then(function (response) {
            account.changePass = $scope.changePass;
            $scope.savedSuccessfully = true;
            $scope.message = "User: "+ account.UserName +" has been updated successfully.";
            
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
                $scope.message = "User "+ $scope.account.userName + " has been created successfully.";
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

    };

    $scope.setSelectedUser = function (user) {
            $scope.selectedUser.value.UserName = user;
            console.log($scope.selectedUser);
    };
   
    $scope.getUsers();
    console.log($scope.userStore)

}]);