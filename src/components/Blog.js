import React, { useState } from "react";
import PropTypes from "prop-types";

const Blog = ({ user, blog, handleLikeClick, handleDeleteClick }) => {
	const [isOpen, setIsOpen] = useState(false);

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
					<button onClick={() => handleLikeClick(blog)}>
						+1 like
					</button>
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
	handleLikeClick: PropTypes.func,
	handleDeleteClick: PropTypes.func
};

export default Blog;
