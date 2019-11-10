import React, { useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import GlobalStyle from "./theme/globalStyles";
import { Container } from "./theme/commonStyles";
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

	return (
		<Router>
			<GlobalStyle />
			{login === null && (
				<Container>
					<Notification />
					<LoginForm />
				</Container>
			)}

			{login !== null && (
				<>
					<Navigation />
					<Container>
						<Notification />
						<Route exact path="/">
							<Redirect to="/blogs" />
						</Route>
						<Route
							exact
							path="/users"
							render={() => <UserList />}
						/>
						<Route
							path="/users/:id"
							render={({ match }) => (
								<UserDetails userId={match.params.id} />
							)}
						/>
						<Route exact path="/blogs" render={() => <Blogs />} />
						<Route
							path="/blogs/:id"
							render={({ match }) => (
								<BlogDetails blogId={match.params.id} />
							)}
						/>
					</Container>
				</>
			)}
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
