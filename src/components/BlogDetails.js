import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import BlogComments from "./BlogComments";
import { likeBlog, deleteBlog } from "../reducers/blogReducer";
import { showNotification } from "../reducers/notificationReducer";
import { MainHeading, BackLink } from "../theme/commonStyles";
import { PrimaryButton, SecondaryButton } from "../components/Button";

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
			history.push("/blogs");
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
					<BackLink to="/blogs">Blogs</BackLink>
					<MainHeading>{blog.title}</MainHeading>{" "}
					<h3>by {blog.author}</h3>
					<p>
						<a href={blog.url}>{blog.url}</a>
					</p>
					<p>
						{blog.likes} likes{" "}
						<PrimaryButton onClick={() => likeBlog(blog)}>
							+1 like
						</PrimaryButton>
					</p>
					<p className="blog__added">Added by {blog.user.name}</p>
					{blog.user.username === login.username && (
						<SecondaryButton
							onClick={() => handleDeleteClick(blog)}
						>
							Delete
						</SecondaryButton>
					)}
					<BlogComments blog={blog} />
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
