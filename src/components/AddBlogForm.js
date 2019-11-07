import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const AddBlogForm = ({ blogs, userToken, setBlogs, setNotification }) => {
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [url, setUrl] = useState("");

	const handleSubmit = event => {
		event.preventDefault();

		axios
			.post(
				"http://localhost:3001/api/blogs",
				{
					title,
					author,
					url
				},
				{ headers: { Authorization: `bearer ${userToken}` } }
			)
			.then(function(response) {
				setBlogs(blogs.concat(response.data));
				setNotification({
					message: `New blog ${title} by ${author} added!`,
					type: "success"
				});
				setTitle("");
				setAuthor("");
				setUrl("");
			})
			.catch(function(error) {
				console.log(error);
				setNotification({
					message: "Title & URL are required",
					type: "error"
				});
			});
	};

	return (
		<>
			<h2>Add new blog</h2>
			<form onSubmit={handleSubmit}>
				<div style={{ marginBottom: "0.5rem" }}>
					<label htmlFor="title">Title:</label>
					<input
						onChange={({ target }) => setTitle(target.value)}
						type="text"
						id="title"
						name="title"
						value={title}
						required
					/>
				</div>
				<div style={{ marginBottom: "0.5rem" }}>
					<label htmlFor="author">Author:</label>
					<input
						onChange={({ target }) => setAuthor(target.value)}
						type="text"
						id="author"
						name="author"
						value={author}
					/>
				</div>
				<div style={{ marginBottom: "0.5rem" }}>
					<label htmlFor="url">Url:</label>
					<input
						onChange={({ target }) => setUrl(target.value)}
						type="url"
						id="url"
						name="url"
						value={url}
						required
					/>
				</div>
				<button>Save</button>
			</form>
		</>
	);
};

AddBlogForm.propTypes = {
	blogs: PropTypes.array,
	userToken: PropTypes.string,
	setBlogs: PropTypes.func,
	setNotification: PropTypes.func
};

export default AddBlogForm;
