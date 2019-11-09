import React, { useEffect } from "react";
import { connect } from "react-redux";
import LoginForm from "./components/LoginForm";
import AddBlogForm from "./components/AddBlogForm";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import ToggleWrapper from "./components/ToggleWrapper";
import UserList from "./components/UserList";
import { initializeBlogs } from "./reducers/blogReducer";
import { initializeLocalStorage, logoutUser } from "./reducers/loginReducer";

const App = ({
	initializeLocalStorage,
	initializeBlogs,
	login,
	blogs,
	logoutUser
}) => {
	useEffect(() => {
		initializeLocalStorage();
		initializeBlogs();
	}, [initializeLocalStorage, initializeBlogs]);

	if (login === null) {
		return (
			<>
				<Notification />
				<LoginForm />
			</>
		);
	}

	return (
		<main>
			<Notification />
			<div style={{ marginBottom: "1rem" }}>
				{login !== null && login.name} logged in!{" "}
				<button onClick={() => logoutUser()}>Logout</button>
			</div>
			<ToggleWrapper
				showButtonLabel="Add new blog"
				hideButtonLabel="Cancel"
			>
				<AddBlogForm />
			</ToggleWrapper>
			<UserList />
			<h2>Blogs</h2>
			{blogs !== null &&
				blogs
					.sort(function(a, b) {
						return b.likes - a.likes;
					})
					.map(blog => {
						return <Blog blog={blog} key={blog.id} />;
					})}
		</main>
	);
};

const mapStateToProps = state => {
	return {
		blogs: state.blogs,
		login: state.login
	};
};

const mapDispatchToProps = {
	initializeLocalStorage,
	initializeBlogs,
	logoutUser
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
