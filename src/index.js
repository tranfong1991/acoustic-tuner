var Alexa = require('alexa-sdk');
var constants = require('./constants');
var handlers = require('./handlers');

exports.handler = function(event, context, callback){
	var alexa = Alexa.handler(event, context);
	alexa.appId = constants.appId;
	alexa.registerHandlers(handlers);
	alexa.execute();
};