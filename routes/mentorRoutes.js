/** @format */
const router = require('express').Router();
const Mentor = require('../models/mentorModel');

router.get('/', async (req, res, next) => {
	try {
		const data = await Mentor.find();
		res.status(200).json({
			status: 'success',
			data,
		});
	} catch (err) {
		next({ status: 400, message: 'server error' });
	}
});

router.post('/', async (req, res, next) => {
	try {
		const data = await Mentor.create(req.body);
		res.status(201).json({
			status: 'success',
			data,
		});
	} catch (err) {
		next(err);
	}
});

router.get('/:id', async (req, res, next) => {
	try {
		const data = await Mentor.findById(req.params.id);
		res.status(200).json({
			status: 'success',
			data,
		});
	} catch (err) {
		next({ status: 400, message: 'server error' });
	}
});

router.patch('/:id', async (req, res, next) => {
	try {
		let data;
		if (!req.body.task) {
			data = await Mentor.findByIdAndUpdate(req.params.id, req.body, {
				new: true,
			});
		} else {
			const { task } = req.body;
			data = await Mentor.findByIdAndUpdate(
				req.params.id,
				{ $push: { task } },
				{ new: true }
			);
		}

		return res.status(200).json({
			status: 'success',
			data,
		});
	} catch (err) {
		next(err);
	}
});

router.delete('/:id', async (req, res, next) => {
	try {
		await Mentor.findByIdAndRemove(req.params.id);
		res.status(200).json({
			status: 'success',
			data: null,
		});
	} catch (err) {
		next({ status: 400, message: 'failed to delete todo' });
	}
});

module.exports = router;
