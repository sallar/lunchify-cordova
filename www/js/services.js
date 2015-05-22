angular.module('starter.services', [])

    .factory('Restaurants', function($firebaseArray, $firebaseObject, Location, $ionicLoading) {
        var ref    = new Firebase("https://lunchify.firebaseio.com/areas/keilaniemi/venues"),
            data   = $firebaseArray(ref),
            venues = [],
            menus  = {};

        var calcDistance = function(startPoint, endPoint) {
            var RADIANS = Math.PI/180;
            var EARTH_RADIUS = 6371;

            var lat1, lat2, lng1, lng2;
            var x, y, a, c;

            lat1 = parseFloat(startPoint.lat) * RADIANS;
            lat2 = parseFloat(endPoint.lat) * RADIANS;

            lng1 = parseFloat(startPoint.lng) * RADIANS;
            lng2 = parseFloat(endPoint.lng) * RADIANS;

            x = Math.sin((lat2-lat1)/2);
            y = Math.sin((lng2-lng1)/2);

            // Harvesine formula
            a = x * x + Math.cos(lat1) * Math.cos(lat2) *y * y;
            c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

            // distance
            return EARTH_RADIUS * c;
        };

        return {
            all: function() {
                Location.get().then(function(start) {
                    data.$loaded()
                        .then(function() {
                            $ionicLoading.hide();
                            data.forEach(function(item) {
                                item.distance = calcDistance(start, {
                                    lat: item.lat,
                                    lng: item.lng
                                });
                                venues.push(item);
                            });
                            venues.sort(function(a, b) {
                                return (a.distance - b.distance);
                            });
                        })
                        .catch(function() {
                            console.log('Error');
                        });
                });

                return venues;
            },
            getMenu: function(venueId) {
                var ref, data;
                if( menus[venueId] ) {
                    return menus[venueId];
                }
                else {
                    var dateObj = new Date(),
                        dateStr =
                            dateObj.getFullYear() + '-' +
                            (dateObj.getMonth() + 1).toString().lpad('0', 2) + '-' +
                            dateObj.getDate().toString().lpad('0', 2);

                    ref = new Firebase("https://lunchify.firebaseio.com/areas/keilaniemi/meals/" + venueId + "/" + dateStr);
                    data = $firebaseArray(ref);
                    menus[venueId] = data;
                    return data;
                }
            },
            get: function(venueId) {
                for (var i = 0; i < venues.length; i++) {
                    if (venues[i].id === venueId) {
                        return venues[i];
                    }
                }
                return null;
            }
        };
    })

    .factory('Location', function($q) {
        var coords = null;

        return{
            get: function() {
                var _this = this;
                return $q(function(resolve, rejext) {
                    window.setInterval(function() {
                        if( _this.coords ) {
                            resolve(_this.coords);
                        }
                    }, 5);
                });
            },

            set: function(coords) {
                this.coords = coords;
            }
        }
    })

    .factory('AllVenues', function($firebaseArray, Restaurants, $ionicLoading) {
        var ref    = new Firebase("https://lunchify.firebaseio.com/areas/keilaniemi/venues"),
            data   = $firebaseArray(ref),
            menus  = {},
            ret    = [];


        data.$loaded().then(function() {
            data.forEach(function(item, i) {
                var menu = Restaurants.getMenu(item.id);
                menu.$loaded().then(function() {
                    menus[item.id] = {
                        venue: item,
                        meals: menu
                    };

                    if( i == data.length - 1 ) {
                        for(var j in menus) {
                            var obj = menus[j];
                            ret.push({
                                title: obj.venue.name,
                                type: 'venue'
                            })

                            obj.meals.forEach(function(meal) {
                                ret.push({
                                    name: meal.name,
                                    name_fi: meal.name_fi,
                                    type: 'food'
                                });
                            });
                        }
                        $ionicLoading.hide();
                    }
                });
            });
        });

        return {
            all: function() {
                return ret;
            }
        }
    });
