var Parse = require("parse/node");
var Config = require("../data/config.json");
Parse.initialize(Config["parse_app_id"]);
Parse.serverURL = Config["parse_server_url"];

module.exports = {
    get_restaurant: function (req, res) {
        if (req.body["objectId"]) {
            var restaurant = Parse.Object.extend("Restaurant");
            var query = new Parse.Query(restaurant);
            console.log(restaurant);
            console.log(req.body["objectId"]);
            query.get(req.body["objectId"], {
                success: function (restaurant) {
                    res.success(restaurant);
                },
                error: function (object, error) {
                    console.log(error);
                    res.error(1, "Object Fetch Error");
                }
            });
        }
        else {
            res.error(1, "No Restaurant ID Specified");
        }
    },
    submit_restaurant: function (req, res) {
        if (req.body["objectId"]) {
            updateRestaurant(req.body, function (success) {
                if (success) {
                    res.success({});
                }
                else {
                    res.error(1, "Server Error");
                }
            });
        }
        else {
            newRestaurant(req.body, function (success) {
                if (success) {
                    res.success({});
                }
                else {
                    res.error(1, "Server Error");
                }
            });
        }
    },
    delete_restaurant: function (req, res) {
        var restaurant = Parse.Object.extend("Restaurant");
        var query = new Parse.Query(restaurant);
        query.get(id, {
            success: function (restaurant) {
                restaurant.destroy({});
            },
            error: function (object, error) {
                console.log(error);
                res.error(1, "Object Fetch Error");
            }
        });
    }
}

function updateRestaurant(obj, callback) {
    var restaurant = Parse.Object.extend("Restaurant");
    var query = new Parse.Query(restaurant);
    query.get(obj["objectId"], {
        success: function (restaurant) {
            for (var i in obj) {
                restaurant.set(i, obj[i]);
            }
            callback(true);
        },
        error: function (object, error) {
            console.log('Failed to update restaurant: ' + error.message);
            callback(false);
        }
    });
}

function newRestaurant(obj, callback) {
    var Restaurant = Parse.Object.extend("Restaurant");
    var restaurant = new Restaurant();
    console.log(obj);
    restaurant.save(obj, {
        success: function(rest) {
            console.log('New restaurant created with objectId: ' + rest.objectId);
            callback(true);
        },
        error: function(rest, error) {
            console.log(rest);
            console.log('Failed to create new restaurant: ');
            console.log(error);
            throw error;
            callback(false);
        }
    });
}
