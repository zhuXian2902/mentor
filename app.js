/** @format */

const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
const mentorRouter = require('./routes/mentorRoutes');
const cors = require('cors');
app.use(cors());
require('dotenv').config();
const path = require('path');
// console.log(process.env);
const pass = process.env.DB_PASSWORD;

mongoose
	.connect(
		`mongodb+srv://mentor:${pass}@cluster0.58x36.mongodb.net/mentor?retryWrites=true&w=majority`,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false,
		}
	)
	.then((con) => {
		console.log('database connected');
	})
	.catch(() => {
		console.log('server is down');
	});
app.use(express.static(path.join(__dirname, '/client/build')));

app.use('/admin', mentorRouter);

app.use((err, req, res, next) => {
	if (err.code === 11000) err.message = `value already exists`;
	else {
		for (let errorName in err.errors) {
			if (err.errors[errorName].message)
				err.message = err.errors[errorName].message;
			// console.log(err.message, errorName);
		}
	}
	return res.status(err.status || 400).json({
		status: 'fail',
		message: err.message ? err.message : 'something went wrong.',
	});
});

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const PORT = process.env.PORT || 2902;

app.listen(PORT, () => {
	console.log(`server running on port ${PORT}`);
});
