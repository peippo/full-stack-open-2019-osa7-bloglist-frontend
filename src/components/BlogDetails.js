import React from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import BlogComments from "./BlogComments";
import { likeBlog, deleteBlog } from "../reducers/blogReducer";
import { showNotification } from "../reducers/notificationReducer";
import { MainHeading, BackLink } from "../theme/commonStyles";
import { PrimaryButton, SecondaryButton } from "../components/Button";
import styled from "styled-components";

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
				<>
					<BackLink to="/blogs">Blogs</BackLink>
					<MainHeading>{blog.title}</MainHeading>{" "}
					<h3 style={{ marginTop: "0.5rem", color: "#555" }}>
						by {blog.author}
					</h3>
					<BlogLink href={blog.url}>{blog.url}</BlogLink>
					<Likes>
						<span style={{ marginRight: "1rem" }}>
							{blog.likes} likes
						</span>
						<PrimaryButton onClick={() => likeBlog(blog)}>
							+1 like
						</PrimaryButton>
					</Likes>
					<BlogComments blog={blog} />
					<AddedBy>
						<p
							className="blog__added"
							style={{ marginRight: "1rem" }}
						>
							Added by{" "}
							<Link to={`/users/${blog.user.id}`}>
								{blog.user.name}
							</Link>
						</p>
						{blog.user.username === login.username && (
							<SecondaryButton
								onClick={() => handleDeleteClick(blog)}
							>
								Delete post
							</SecondaryButton>
						)}
					</AddedBy>
				</>
			)}
		</>
	);
};

const BlogLink = styled.a`
	display: block;
	padding-left: 1rem;
	margin-left: -1rem;
	margin-top: 0.5rem;
	margin-bottom: 2rem;
	border-left: 3px solid #ff2bb4;
	font-size: 1.4rem;
`;

const Likes = styled.div`
	display: inline-flex;
	justify-content: center;
	align-items: center;
	border-top: 1px solid #555;
	border-bottom: 1px solid #555;
	padding: 0.75rem 1.75rem;
`;

const AddedBy = styled.div`
	margin-top: 2rem;
	display: flex;
	align-items: center;
`;

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
