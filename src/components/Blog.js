import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { likeBlog } from "../reducers/blogReducer";
import { showNotification } from "../reducers/notificationReducer";
import { deleteBlog } from "../reducers/blogReducer";

const Blog = ({ user, blog, likeBlog, deleteBlog, showNotification }) => {
	const [isOpen, setIsOpen] = useState(false);

	const handleDeleteClick = deletedBlog => {
		if (
			window.confirm(
				`Remove the blog ${deletedBlog.title} by ${deletedBlog.author}?`
			)
		) {
			deleteBlog(deletedBlog, {
				headers: { Authorization: `bearer ${user.token}` }
			});
			showNotification({
				message: `Blog ${deletedBlog.title} by ${deletedBlog.author} deleted!`,
				type: "success"
			});
		}
	};

	let addedBy = null;
	if (blog.user) {
		addedBy = <p className="blog__added">Added by {blog.user.name}</p>;
	}

	let deleteButton = null;
	if (blog.user.username === user.username) {
		deleteButton = (
			<button onClick={() => handleDeleteClick(blog)}>Delete</button>
		);
	}

	if (!isOpen) {
		return (
			<div
				className="blog"
				style={{
					border: "1px solid gray",
					marginTop: "5px"
				}}
			>
				<div
					className="blog__title"
					onClick={() => setIsOpen(!isOpen)}
					style={{
						padding: "10px"
					}}
				>
					<b>{blog.title}</b> by {blog.author}
				</div>
			</div>
		);
	} else {
		return (
			<div
				className="blog"
				style={{
					position: "relative",
					border: "1px solid gray",
					padding: "10px",
					marginTop: "5px"
				}}
			>
				<div
					className="blog__title"
					onClick={() => setIsOpen(!isOpen)}
					style={{
						background: "black",
						color: "white",
						margin: "-10px -10px 10px -10px",
						padding: "10px"
					}}
				>
					<b>{blog.title}</b> by {blog.author}
				</div>
				<p className="blog__url">
					<a href={blog.url}>{blog.url}</a>
				</p>
				<p className="blog__likes">
					{blog.likes} likes{" "}
					<button onClick={() => likeBlog(blog)}>+1 like</button>
				</p>
				{addedBy}
				{deleteButton}
			</div>
		);
	}
};

Blog.propTypes = {
	user: PropTypes.object,
	blog: PropTypes.object,
	likeBlog: PropTypes.func,
	deleteBlog: PropTypes.func,
	showNotification: PropTypes.func
};

const mapDispatchToProps = {
	likeBlog,
	deleteBlog,
	showNotification
};

export default connect(
	null,
	mapDispatchToProps
)(Blog);
