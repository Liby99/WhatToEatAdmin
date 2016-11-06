var Parse = require("parse/node");
var Config = require("../data/config.json");
Parse.initialize(Config["parse_app_id"]);
Parse.serverURL = Config["parse_server_url"];

module.exports = function (req, res, callback) {
    var GameScore = Parse.Object.extend("GameScore");
    var gameScore = new GameScore();

    gameScore.set("score", 1337);
    gameScore.set("playerName", "Sean Plott");
    gameScore.set("cheatMode", false);

    gameScore.save(null, {
      success: function(gameScore) {
        // Execute any logic that should take place after the object is saved.
        callback({
            text: 'New object created with objectId: ' + gameScore.id
        });
      },
      error: function(gameScore, error) {
        // Execute any logic that should take place if the save fails.
        // error is a Parse.Error with an error code and message.
        callback({
            text: 'Failed to create new object, with error code: ' + error.message
        });
      }
    });
}
