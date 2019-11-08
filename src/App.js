import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import LoginForm from "./components/LoginForm";
import AddBlogForm from "./components/AddBlogForm";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import ToggleWrapper from "./components/ToggleWrapper";
import { initializeBlogs } from "./reducers/blogReducer";

function App({ initializeBlogs, blogs }) {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const loggedUser = window.localStorage.getItem("loggedUser");
		if (loggedUser !== null && loggedUser !== undefined) {
			setUser(JSON.parse(loggedUser));
		}
	}, []);

	useEffect(() => {
		initializeBlogs();
	}, [initializeBlogs]);

	const handleLogout = () => {
		window.localStorage.removeItem("loggedUser");
		setUser(null);
	};

	if (user === null) {
		return (
			<>
				<Notification />
				<LoginForm setUser={setUser} />
			</>
		);
	}

	return (
		<main>
			<Notification />
			<div style={{ marginBottom: "1rem" }}>
				{user !== null && user.name} logged in!{" "}
				<button onClick={() => handleLogout()}>Logout</button>
			</div>
			<ToggleWrapper
				showButtonLabel="Add new blog"
				hideButtonLabel="Cancel"
			>
				<AddBlogForm userToken={user.token} />
			</ToggleWrapper>
			{blogs !== null &&
				blogs
					.sort(function(a, b) {
						return b.likes - a.likes;
					})
					.map(blog => {
						return <Blog user={user} blog={blog} key={blog.id} />;
					})}
		</main>
	);
}

const mapStateToProps = state => {
	return {
		blogs: state.blogs
	};
};

const mapDispatchToProps = {
	initializeBlogs
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
