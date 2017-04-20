'use strict';

var Alexa = require('alexa-sdk');
var constants = require('./constants');
var instructionSpeech = "To use this skill, you can say something like, " + 
	"play gee, or, play dee 3 times. What do you want to play?";

var handlers = {
	"LaunchRequest": function(){
		this.emit(':ask', "Welcome to Acoustic. " + instructionSpeech,
			"Please say a note you want to play.");
	},
	"PlayNoteIntent": function(){
		var note = this.event.request.intent.slots.Note.value;
		var audioUrl = getAudioUrl(trimDot(note));

		if(audioUrl == null)
			this.emit('Unhandled');
		else this.emit(':ask', "<audio src = '" + audioUrl + "'/> What do you want to play next?");
	},
	"PlayNoteWithFrequencyIntent": function(){
		var note = this.event.request.intent.slots.Note.value;
		var frequency = parseInt(this.event.request.intent.slots.Frequency.value);

		if(frequency < 1 || frequency > 5){
			this.emit(':ask', "Sorry, frequency should be between 1 and 5. Please try again.");
			return;
		}

		var audioUrl = getAudioUrl(trimDot(note));
		if(audioUrl == null){
			this.emit('Unhandled');
			return;
		}

		var audioTag = "";
		for(var i = 0; i < frequency; i++){
			audioTag += "<audio src = '" + audioUrl + "'/>";
		}
		this.emit(':ask', audioTag + " What do you want to play next?");
	},
	"AMAZON.HelpIntent": function(){
		this.emit(':ask', instructionSpeech);
	},
	"AMAZON.StopIntent": function(){
		this.emit('AMAZON.CancelIntent');
	},
	"AMAZON.CancelIntent": function(){
		this.emit(':tell', "Thank you for using Acoustic");
	},
	"Unhandled": function(){
		var speech = "Sorry, I could not understand. Please say a note you want to play.";
		this.response.speak(speech).listen(speech);
		this.emit(':responseReady');
	}
};

function trimDot(note){
	return note.split('.').join("");
}

function getAudioUrl(note){
	var url = null;
	switch(note.toLowerCase()){
		case 'low ee':
		case 'low e':
			url = constants.audios['low-e'];
			break;
		case 'ay':
		case 'a':
			url = constants.audios['a'];
			break;
		case 'dee':
		case 'd':
			url = constants.audios['d'];
			break;
		case 'gee':
		case 'g':
			url = constants.audios['g'];
			break;
		case 'bee':
		case 'b':
			url = constants.audios['b'];
			break;
		case 'high ee':
		case 'high e':
			url = constants.audios['high-e'];
			break;
	}
	return url;
}

module.exports = handlers;