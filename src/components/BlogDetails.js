import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import BlogComments from "./BlogComments";
import { likeBlog, deleteBlog } from "../reducers/blogReducer";
import { showNotification } from "../reducers/notificationReducer";

const BlogDetails = ({
	history,
	blogId,
	blogs,
	login,
	likeBlog,
	deleteBlog,
	showNotification
}) => {
	if (blogs === null) return null;

	const blog = blogs.find(blog => blog.id === blogId);

	const handleDeleteClick = deletedBlog => {
		if (
			window.confirm(
				`Remove the blog ${deletedBlog.title} by ${deletedBlog.author}?`
			)
		) {
			history.push("/");
			deleteBlog(deletedBlog, {
				headers: { Authorization: `bearer ${login.token}` }
			});
			showNotification({
				message: `Blog ${deletedBlog.title} by ${deletedBlog.author} deleted!`,
				type: "success"
			});
		}
	};

	return (
		<>
			{blog !== undefined && (
				<div>
					<h2>{blog.title}</h2> <h3>by {blog.author}</h3>
					<p>
						<a href={blog.url}>{blog.url}</a>
					</p>
					<p>
						{blog.likes} likes{" "}
						<button onClick={() => likeBlog(blog)}>+1 like</button>
					</p>
					<p className="blog__added">Added by {blog.user.name}</p>
					<button onClick={() => handleDeleteClick(blog)}>
						Delete
					</button>
					{blog.comments.length > 0 && (
						<BlogComments comments={blog.comments} />
					)}
				</div>
			)}
		</>
	);
};

const mapStateToProps = state => {
	return {
		login: state.login,
		blogs: state.blogs
	};
};

const mapDispatchToProps = {
	likeBlog,
	deleteBlog,
	showNotification
};

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(BlogDetails)
);
