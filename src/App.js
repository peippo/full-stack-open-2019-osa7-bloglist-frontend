import React, { useEffect } from "react";
import { connect } from "react-redux";
import LoginForm from "./components/LoginForm";
import AddBlogForm from "./components/AddBlogForm";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import ToggleWrapper from "./components/ToggleWrapper";
import { initializeBlogs } from "./reducers/blogReducer";
import { initializeUser, logoutUser } from "./reducers/userReducer";

const App = ({ initializeUser, initializeBlogs, user, blogs, logoutUser }) => {
	useEffect(() => {
		initializeUser();
		initializeBlogs();
	}, [initializeUser, initializeBlogs]);

	if (user === null) {
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
				{user !== null && user.name} logged in!{" "}
				<button onClick={() => logoutUser()}>Logout</button>
			</div>
			<ToggleWrapper
				showButtonLabel="Add new blog"
				hideButtonLabel="Cancel"
			>
				<AddBlogForm />
			</ToggleWrapper>
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
		user: state.user
	};
};

const mapDispatchToProps = {
	initializeUser,
	initializeBlogs,
	logoutUser
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
