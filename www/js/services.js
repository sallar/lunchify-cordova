angular.module('starter.services', [])

    .factory('Restaurants', function($firebaseArray, $firebaseObject) {
        var ref    = new Firebase("https://lunchify.firebaseio.com/areas/keilaniemi/venues"),
            data   = $firebaseArray(ref),
            venues = [],
            menus  = {};

        data.$loaded()
            .then(function() {
                data.forEach(function(item) {
                    venues.push(item);
                });
            })
            .catch(function() {
                console.log('Error');
            });

        return {
            all: function() {
                return venues;
            },
            getMenu: function(venueId) {
                var ref, data;
                if( menus[venueId] ) {
                    return menus[venueId];
                }
                else {
                    ref = new Firebase("https://lunchify.firebaseio.com/areas/keilaniemi/by_date/2015-05-21/" + venueId);
                    data = $firebaseObject(ref);
                    menus[venueId] = data;
                    return data;
                }
            },
            get: function(venueId) {
                for (var i = 0; i < venues.length; i++) {
                    if (venues[i].$id === venueId) {
                        return venues[i];
                    }
                }
                return null;
            }
        };
    });
