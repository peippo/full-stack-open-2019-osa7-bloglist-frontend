import React, { useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import LoginForm from "./components/LoginForm";
import Blogs from "./components/Blogs";
import UserDetails from "./components/UserDetails";
import Notification from "./components/Notification";
import UserList from "./components/UserList";
import { initializeLocalStorage } from "./reducers/loginReducer";
import { initializeUsers } from "./reducers/usersReducer";

const App = ({ initializeLocalStorage, initializeUsers, login }) => {
	useEffect(() => {
		initializeLocalStorage();
		initializeUsers();
	}, [initializeLocalStorage, initializeUsers]);

	if (login === null) {
		return (
			<>
				<Notification />
				<LoginForm />
			</>
		);
	}

	return (
		<Router>
			<Navigation />
			<Notification />
			<Route exact path="/users" render={() => <UserList />} />
			<Route exact path="/" render={() => <Blogs />} />
			<Route
				path="/users/:id"
				render={({ match }) => <UserDetails userId={match.params.id} />}
			/>
		</Router>
	);
};

const mapStateToProps = state => {
	return {
		login: state.login
	};
};

const mapDispatchToProps = {
	initializeLocalStorage,
	initializeUsers
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
