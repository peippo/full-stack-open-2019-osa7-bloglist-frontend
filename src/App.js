import React, { useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import LoginForm from "./components/LoginForm";
import Blogs from "./components/Blogs";
import Notification from "./components/Notification";
import UserList from "./components/UserList";
import { initializeLocalStorage } from "./reducers/loginReducer";

const App = ({ initializeLocalStorage, login }) => {
	useEffect(() => {
		initializeLocalStorage();
	}, [initializeLocalStorage]);

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
			<Route path="/users" render={() => <UserList />} />
			<Route exact path="/" render={() => <Blogs />} />
		</Router>
	);
};

const mapStateToProps = state => {
	return {
		login: state.login
	};
};

const mapDispatchToProps = {
	initializeLocalStorage
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
