import React, { useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import LoginForm from "./components/LoginForm";
import Blogs from "./components/Blogs";
import BlogDetails from "./components/BlogDetails";
import UserDetails from "./components/UserDetails";
import Notification from "./components/Notification";
import UserList from "./components/UserList";
import { initializeLocalStorage } from "./reducers/loginReducer";
import { fetchUsers } from "./reducers/usersReducer";
import { fetchBlogs } from "./reducers/blogReducer";

const App = ({ initializeLocalStorage, fetchUsers, fetchBlogs, login }) => {
	useEffect(() => {
		initializeLocalStorage();
		fetchUsers();
		fetchBlogs();
	}, [initializeLocalStorage, fetchUsers, fetchBlogs]);

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
			<Route
				path="/users/:id"
				render={({ match }) => <UserDetails userId={match.params.id} />}
			/>
			<Route exact path="/" render={() => <Blogs />} />
			<Route
				path="/blogs/:id"
				render={({ match }) => <BlogDetails blogId={match.params.id} />}
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
	fetchUsers,
	fetchBlogs
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
