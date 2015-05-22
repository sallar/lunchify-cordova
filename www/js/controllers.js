angular.module('starter.controllers', [])

    .controller('RestaurantsCtrl', function($scope, Restaurants, $ionicLoading) {
        $scope.venues = Restaurants.all();
        // Show Loading
        $ionicLoading.show({
            template: 'Loading...'
        });
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

    .controller('MapCtrl', function($scope, $stateParams, Restaurants, $ionicLoading) {
        // Show Loadin
        //$ionicLoading.show({
        //    template: 'Loading...'
        //});
        //$scope.venue = Restaurants.get($stateParams.venueId);
        //
        //var div = document.getElementById("map");
        ////map = plugin.google.maps.Map.getMap(div);
    })

    .controller('TodayCtrl', function($scope, $ionicLoading, AllVenues) {
        // Show Loading
        $ionicLoading.show({
            template: 'Loading...'
        });
        $scope.items = AllVenues.all();
    });
