/** @format */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const useRowStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			borderBottom: 'unset',
		},
		root1: {
			padding: '10px',
		},
	},
}));

const toastOptions = {
	position: 'top-center',
	autoClose: 5000,
	hideProgressBar: true,
	closeOnClick: true,
	pauseOnHover: false,
	draggable: false,
	progress: undefined,
};

function Tasks(props) {
	console.log(props);

	const [tasks, setTasks] = useState([]);
	const [task, setTask] = useState('');
	const [change, setChange] = useState(false);
	const id = props.match.params.id;
	const classes = useRowStyles();

	const getTasks = async () => {
		const res = await axios.get(`/admin/${id}`);
		console.log(res);
		setTasks(res.data.data.task);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const res = await axios.patch(`/admin/${id}`, { task });
		setChange(!change);
		setTask('');
		setTasks(res.data.data.task);
	};

	useEffect(() => {
		getTasks();
	}, [change]);

	return (
		<TableContainer component={Paper}>
			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-between',
				}}
			>
				<Link to="/admin">
					<Button variant="outlined" style={{ paddingLeft: '30px' }}>
						Back
					</Button>
				</Link>
			</div>
			<form
				onSubmit={handleSubmit}
				className={classes.root1}
				noValidate
				autoComplete="off"
			>
				<TextField
					value={task}
					onChange={(e) => setTask(e.target.value)}
					fullWidth
					label="type your task here"
					variant="outlined"
				/>
			</form>

			<Table aria-label="collapsible table">
				<TableBody>
					{tasks.map((task, idx) => (
						<React.Fragment key={idx}>
							<TableRow className={classes.root}>
								<TableCell component="th" scope="row">
									{task}
								</TableCell>
							</TableRow>
						</React.Fragment>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

export default Tasks;
