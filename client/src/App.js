/** @format */

import React from 'react';
import Mentors from './components/Mentors';
import Route from './components/Routes';
import './App.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const options = {
	position: 'top-center',
	autoClose: 3000,
	hideProgressBar: false,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
	progress: undefined,
};

axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;

axios.interceptors.response.use(null, (error) => {
	console.log(error.response.data.message);
	if (error && error.response && error.response.data)
		toast.error(error.response.data.message, options);
	return Promise.reject(error);
});

function App() {
	return (
		<div id="container">
			<header className="App-header" />
			<Route />
		</div>
	);
}

export default App;
