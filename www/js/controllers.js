angular.module('starter.controllers', [])

    .controller('RestaurantsCtrl', function($scope, Restaurants, $ionicLoading) {
        // Show Loading
        $ionicLoading.show({
            template: 'Loading...'
        });
        $scope.venues = Restaurants.all();
    })

    .controller('VenueDetailCtrl', function($scope, $stateParams, Restaurants, $ionicLoading) {
        $scope.venue = Restaurants.get($stateParams.venueId);
        $scope.info  = Restaurants.getMenu($stateParams.venueId);

        // Show Loading
        $ionicLoading.show({
            template: 'Loading...'
        });

        // Hide Loading
        $scope.info.$loaded()
            .then(function() {
                $ionicLoading.hide();
            });

    })

    .controller('SettingsCtrl', function($scope) {
        $scope.settings = {
            enableFriends: true
        };
    });
