/** @format */

import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Mentors from './Mentors';
import Tasks from './Tasks';

function Routes() {
	return (
		<div>
			<BrowserRouter>
				<Switch>
					<Route path="/admin" exact component={Mentors} />
					<Route path="/admin/:id" exact component={Tasks} />
					<Redirect from="/" to="/admin" />
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default Routes;
