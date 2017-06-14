var chatroomApp = angular.module('chatroom', ["ngRoute"]);


// router
chatroomApp.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        redirectTo: '/fullControl'
    })
    .when("/readOnly", {
        templateUrl : "/partials/message-list.html",
        controller: "chatroomController"
    })
    .when("/fullControl", {
        templateUrl : "/partials/full-control.html",
        controller: "chatroomController"
    })
});






// the controller
chatroomApp.controller('chatroomController', function($scope, $route, $location, $routeParams, $http, $interval) {

    $scope.$location = $location;

    if(!$scope.messages) {
        $scope.messages = [];
        $scope.name = "John Doe"
    }


  $scope.retrieveMessages = function() {
      $http.get("/messages").then(function (response) {

          // update only if messages change
          if(response.data && response.data.length != $scope.messages.length) {
              $scope.messages = response.data;
          }
      });
  }


  $scope.submitMessage = function() {
      var data = { "name": $scope.name, "message": $scope.message };
      $http.post("/messages", data).then(function (response) {
          $scope.messages = response.data;
      });
      $scope.message = "";
  }



  $scope.removeMessage = function(id) {
      var data = {"id": id };

      $http.delete("/messages/" + id, data).then(function (response) {
          $scope.messages = response.data;
      });
      $scope.message = "";
  }



  // update view every 1 sec
  $interval($scope.retrieveMessages, 1000);


});
