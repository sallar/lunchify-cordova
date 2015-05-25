angular.module('starter.controllers', [])

    .controller('RestaurantsCtrl', function($scope, Restaurants, $ionicLoading, $cordovaGeolocation) {
        $scope.venues = Restaurants.all();

        // Show Loading
        $ionicLoading.show({
            template: 'Loading...'
        });

        $scope.doRefresh = function() {
            $cordovaGeolocation.getCurrentPosition()
                .then(function(pos) {
                    $scope.$broadcast('scroll.refreshComplete');
                    Restaurants.updateCoords({lat: pos.coords.latitude, lng: pos.coords.longitude});
                });
        };
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
        // Show Loading
        //$ionicLoading.show({
        //    template: 'Loading...'
        //});

        $scope.venue = Restaurants.get($stateParams.venueId);
        console.log($scope.venue);

        var myLatlng = new google.maps.LatLng($scope.venue.lat,$scope.venue.lng);

        var mapOptions = {
            center: myLatlng,
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            panControl: false,
            scaleControl: false
        };

        var map = new google.maps.Map(document.getElementById("map"), mapOptions);

        var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            title: $scope.venue.name
        });

        $scope.map = map;
    })

    .controller('TodayCtrl', function($scope, $ionicLoading, AllVenues) {
        // Show Loading
        $ionicLoading.show({
            template: 'Loading...'
        });
        $scope.items = AllVenues.all();
    })

    .controller('FavoritesCtrl', function($scope) {

    })

    .controller('SettingsCtrl', function($scope) {

    });
