var Alexa = require('alexa-sdk');

exports.handler = function(event, context, callback){
	var alexa = Alexa.handler(event, context);
	alexa.registerHandlers(handlers);
	alexa.execute();
};

var handlers = {
	"PlayNoteIntent": function(){
		this.emit(':tell', "Play note");
	},
	"PlayNoteWithFrequencyIntent": function(){
		this.emit(':tell', 'Play note with frequency');
	}
};