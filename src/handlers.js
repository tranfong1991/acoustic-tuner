'use strict';

var Alexa = require('alexa-sdk');

var handlers = {
	"LaunchRequest": function(){
		this.emit(':ask', "Welcome to Tune. Please say a note name with its optional frequency.",
			"Please say a note name with its optional frequency");
	},
	"PlayNoteIntent": function(){
		var note = this.event.request.intent.slots.Note.value;

		this.emit(':tell', "Playing note " + note);
	},
	"PlayNoteWithFrequencyIntent": function(){
		var note = this.event.request.intent.slots.Note.value;
		var frequency = parseInt(this.event.request.intent.slots.Frequency.value);

		this.emit(':tell', "Playing note " + note + " " + frequency + " times");
	},
	"AMAZON.HelpIntent": function(){
		this.emit(':tell', "To use this skill, please say a note name with its optional frequency.");
	},
	"AMAZON.StopIntent": function(){
		this.emit(':tell', "Thank you for using Tune");
	},
	"AMAZON.CancelIntent": function(){
		this.emit(':tell', "Thank you for using Tune");
	},
	"Unhandled": function(){
		var speech = "Sorry, I could not understand. Please say a note you want to play.";
		this.response.speak(speech).listen(speech);
		this.emit(':responseReady');
	}
};

module.exports = handlers;