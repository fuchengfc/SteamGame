import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';
import Dashboard from './Dashboard';
import Recommendations from './Recommendations';
import BestGenres from './BestGenres';
import GameDetail from './gameDetail';
import A from './Requirements';
import B from './SearchTags';

export default class App extends React.Component {

	render() {
		return (
			<div className="App">
				<Router>
					<Switch>
						<Route
							exact
							path="/"
							render={() => (
								<Dashboard />
							)}
						/>
						<Route
							exact
							path="/dashboard"
							render={() => (
								<Dashboard />
							)}
						/>
						<Route
							exact
							path="/gameDetail"
							render={() => (
								<GameDetail />
							)}
						/>
						
						{/* <Route
							path="/recommendations"
							render={() => (
								<Recommendations />
							)}
						/> */}
						{/* <Route
							path="/bestgenres"
							render={() => (
								<BestGenres />
							)}
						/> */}
                        <Route
							path="/requirements"
							render={() => (
								<A />
							)}
						/>
                        <Route
							path="/SearchTags"
							render={() => (
								<B />
							)}
						/>
					</Switch>
				</Router>
			</div>
		);
	}
}