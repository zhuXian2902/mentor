/** @format */

import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';
import { set } from 'mongoose';

export default function FormDialog(props) {
	const { open, setOpen, change, setChange, id } = props;
	// const [open, setOpen] = React.useState(false);
	const [name, setName] = React.useState('');
	const [subject, setSubject] = React.useState('');

	const getMentors = async () => {
		const res = await axios.get(`/admin/${id}`);
		setName(res.data.data.name);
		setSubject(res.data.data.subject);
	};

	useEffect(() => {
		getMentors();
	}, [change]);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleClose1 = async () => {
		if (name && subject) {
			const data = await axios.patch(`/admin/${id}`, { name, subject });
			setChange(!change);
		}
		setOpen(false);
	};

	return (
		<div>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="form-dialog-title"
			>
				<DialogTitle id="form-dialog-title">Create New Mentor</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						value={name}
						onChange={(e) => setName(e.target.value)}
						margin="dense"
						id="name"
						label="Name"
						fullWidth
					/>
					<TextField
						value={subject}
						onChange={(e) => setSubject(e.target.value)}
						margin="dense"
						id="course"
						label="subject"
						fullWidth
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
					<Button onClick={handleClose1} color="primary">
						Update
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
