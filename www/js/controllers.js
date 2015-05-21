angular.module('starter.controllers', [])

    .controller('RestaurantsCtrl', function($scope, Restaurants) {
        $scope.venues = Restaurants.all();
    })

    .controller('LocationCtrl', function($scope, Chats) {

    })

    .controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
        $scope.chat = Chats.get($stateParams.chatId);
    })

    .controller('SettingsCtrl', function($scope) {
        $scope.settings = {
            enableFriends: true
        };
    });
