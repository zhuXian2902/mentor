/** @format */

const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema({
	name: {
		type: 'String',
		required: true,
	},
	subject: {
		type: 'String',
	},
	task: [],
});

const mentorModel = mongoose.model('Mentor', mentorSchema);

module.exports = mentorModel;
