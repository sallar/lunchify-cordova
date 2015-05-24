String.prototype.lpad = function(padString, length) {
    var str = this;
    while (str.length < length)
        str = padString + str;
    return str;
};

angular.module('starter', ['ionic', 'firebase', 'ngCordova', 'starter.controllers', 'starter.services'])

    .run(function($ionicPlatform, $cordovaGeolocation, Location, Restaurants) {
        $ionicPlatform.ready(function() {
            if (window.StatusBar) {
                StatusBar.styleLightContent();
            }

            $cordovaGeolocation.getCurrentPosition()
                .then(function(pos) {
                    Restaurants.updateCoords({lat: pos.coords.latitude, lng: pos.coords.longitude});
                });
        });
    })

    .config(function($stateProvider, $urlRouterProvider) {

        $stateProvider

            // setup an abstract state for the tabs directive
            .state('tab', {
                url: "/tab",
                abstract: true,
                templateUrl: "templates/tabs.html"
            })

            // Each tab has its own nav history stack:

            .state('tab.restaurants', {
                url: '/restaurants',
                views: {
                    'tab-restaurants': {
                        templateUrl: 'templates/tab-restaurants.html',
                        controller: 'RestaurantsCtrl'
                    }
                }
            })
            .state('tab.venue-detail', {
                url: '/venue/:venueId',
                views: {
                    'tab-restaurants': {
                        templateUrl: 'templates/venue-detail.html',
                        controller: 'VenueDetailCtrl'
                    }
                }
            })
            .state('tab.venue-map', {
                url: '/map/:venueId',
                views: {
                    'tab-restaurants': {
                        templateUrl: 'templates/venue-map.html',
                        controller: 'MapCtrl'
                    }
                }
            })

            .state('tab.today', {
                url: '/today',
                views: {
                    'tab-today': {
                        templateUrl: 'templates/tab-today.html',
                        controller: 'TodayCtrl'
                    }
                }
            })

            .state('tab.favorites', {
                url: '/favorites',
                views: {
                    'tab-favorites': {
                        templateUrl: 'templates/tab-favorites.html',
                        controller: 'FavoritesCtrl'
                    }
                }
            })

            .state('tab.settings', {
                url: '/settings',
                views: {
                    'tab-settings': {
                        templateUrl: 'templates/tab-settings.html',
                        controller: 'SettingsCtrl'
                    }
                }
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/tab/restaurants');

    })

    .filter('removeHref', function () {
        return function (value) {
            return (value || "").replace(/href\=\"(\#\w+)+\"/g, '');
        };
    })

    .filter('distance', function () {
        return function (value) {
            return (value < 1) ? parseInt(value * 1000) + ' m' : value.toPrecision(2) + ' km';
        };
    });
