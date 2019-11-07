// Temporary test component
import React from "react";

const SimpleBlog = ({ blog, onClick }) => (
	<div className="simple-blog">
		<div>
			<span className="simple-blog__title">{blog.title}</span>{" "}
			<span className="simple-blog__author">{blog.author}</span>
		</div>
		<div className="simple-blog__likes">
			blog has {blog.likes} likes
			<button onClick={onClick}>like</button>
		</div>
	</div>
);

export default SimpleBlog;
