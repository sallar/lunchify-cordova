angular.module('starter.services', [])

    .factory('Restaurants', function($firebaseArray) {
        var ref    = new Firebase("https://lunchify.firebaseio.com/areas/keilaniemi/venues"),
            data   = $firebaseArray(ref),
            venues = [];

        data.$loaded()
            .then(function() {
                data.forEach(function(item) {
                    venues.push(item);
                    console.log(item);
                });
            })
            .catch(function() {
                console.log('Error');
            });

        return {
            all: function() {
                return venues;
            },
            remove: function(venue) {
                venues.splice(venues.indexOf(venue), 1);
            },
            get: function(venueId) {
                for (var i = 0; i < venues.length; i++) {
                    if (venues[i].id === parseInt(venueId)) {
                        return venues[i];
                    }
                }
                return null;
            }
        };
    });
