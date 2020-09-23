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
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import { Link } from 'react-router-dom';
import Form from './Form';
import UpdateForm from './UpdateForm';
import { toast, ToastContainer } from 'react-toastify';

const useRowStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			borderBottom: 'unset',
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

function Mentors() {
	const [mentors, setMentors] = useState([]);
	const [change, setChange] = useState(false);
	const [loading, setLoading] = useState(false);
	const [id, setId] = useState('');
	const classes = useRowStyles();
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = (id) => {
		setOpen(true);
		setId(id);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const showTasks = () => {};

	const getMentors = async () => {
		const res = await axios.get('/admin');

		setMentors(res.data.data);
	};

	const deleteProduct = async (id) => {
		try {
			setLoading(true);
			const res = await axios.delete(`admin/${id}`);
			setChange(!change);
			getMentors();
			setLoading(false);
			toast.success('product deleted successfully', {
				position: 'top-center',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		} catch (err) {
			toast.error(err.response.data.message, {
				position: 'top-center',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		}
	};

	useEffect(() => {
		getMentors();
	}, [change]);

	return (
		<TableContainer component={Paper}>
			{open && (
				<UpdateForm
					change={change}
					setChange={setChange}
					open={open}
					setOpen={setOpen}
					handleClose={handleClose}
					id={id}
				/>
			)}
			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-between',
				}}
			>
				<h3 style={{ paddingLeft: '30px' }}>All mentors</h3>

				<Form setChange={setChange} change={change} />
			</div>
			<ToastContainer />
			<Divider />
			<Table aria-label="collapsible table">
				<TableBody>
					{mentors.map((mentor) => (
						<React.Fragment key={mentor._id}>
							<TableRow className={classes.root}>
								<TableCell component="th" scope="row">
									{mentor.name}
								</TableCell>
								<TableCell align="right">
									<Chip
										color="primary"
										onClick={() => handleClickOpen(mentor._id)}
										label="Update"
										clickable
									/>
								</TableCell>
								<TableCell align="right">
									<Chip
										onClick={() => deleteProduct(mentor._id)}
										color="secondary"
										label="Delete"
										clickable
									/>
								</TableCell>
								<TableCell align="right">
									<Link to={`/admin/${mentor._id}`}>
										<Chip color="primary" label="show tasks" clickable />
									</Link>
								</TableCell>
							</TableRow>
						</React.Fragment>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

export default Mentors;
