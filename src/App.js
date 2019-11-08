import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import LoginForm from "./components/LoginForm";
import AddBlogForm from "./components/AddBlogForm";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import ToggleWrapper from "./components/ToggleWrapper";
import blogService from "./services/blogs";
import { showNotification } from "./reducers/notificationReducer";

function App({ showNotification }) {
	const [user, setUser] = useState(null);
	const [blogs, setBlogs] = useState(null);

	useEffect(() => {
		const loggedUser = window.localStorage.getItem("loggedUser");
		if (loggedUser !== null && loggedUser !== undefined) {
			setUser(JSON.parse(loggedUser));
		}
	}, []);

	useEffect(() => {
		blogService.getAll().then(blogs => setBlogs(blogs));
	}, [user]);

	const handleLikeClick = updatedBlog => {
		axios
			.put(`http://localhost:3001/api/blogs/${updatedBlog.id}`, {
				title: updatedBlog.title,
				author: updatedBlog.author,
				url: updatedBlog.url,
				user: updatedBlog.user.id,
				likes: updatedBlog.likes + 1
			})
			.then(function(response) {
				setBlogs(
					blogs.map(blog =>
						blog.id !== updatedBlog.id ? blog : response.data
					)
				);
			})
			.catch(function(error) {
				console.log(error);
			});
	};

	const handleDeleteClick = deletedBlog => {
		if (
			window.confirm(
				`Remove the blog ${deletedBlog.title} by ${deletedBlog.author}?`
			)
		) {
			axios
				.delete(`http://localhost:3001/api/blogs/${deletedBlog.id}`, {
					headers: { Authorization: `Bearer ${user.token}` }
				})
				.then(function() {
					setBlogs(
						blogs.filter(person => person.id !== deletedBlog.id)
					);
					showNotification({
						message: `Blog ${deletedBlog.title} by ${deletedBlog.author} deleted!`,
						type: "success"
					});
				})
				.catch(function(error) {
					console.log(error);
				});
		}
	};

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
				<AddBlogForm
					userToken={user.token}
					blogs={blogs}
					setBlogs={setBlogs}
				/>
			</ToggleWrapper>
			{blogs !== null &&
				blogs
					.sort(function(a, b) {
						return b.likes - a.likes;
					})
					.map(blog => {
						return (
							<Blog
								user={user}
								blog={blog}
								key={blog.id}
								handleLikeClick={handleLikeClick}
								handleDeleteClick={handleDeleteClick}
							/>
						);
					})}
		</main>
	);
}

const mapDispatchToProps = {
	showNotification
};

export default connect(
	null,
	mapDispatchToProps
)(App);
