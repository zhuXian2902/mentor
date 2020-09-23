/** @format */

import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Mentors from './Mentors';
import Tasks from './Tasks';

function Routes() {
	console.log('hello');
	return (
		<div>
			<BrowserRouter>
				<Switch>
					<Route path="/" exact component={Mentors} />
					<Route path="/:id" exact component={Tasks} />
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default Routes;
