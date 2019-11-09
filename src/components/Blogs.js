import React, { useEffect } from "react";
import { connect } from "react-redux";
import Blog from "./Blog";
import AddBlogForm from "../components/AddBlogForm";
import ToggleWrapper from "../components/ToggleWrapper";
import { initializeBlogs } from "../reducers/blogReducer";

const Blogs = ({ initializeBlogs, blogs }) => {
	useEffect(() => {
		initializeBlogs();
	}, [initializeBlogs]);

	return (
		<>
			<h2>Blogs</h2>
			{blogs !== null &&
				blogs
					.sort(function(a, b) {
						return b.likes - a.likes;
					})
					.map(blog => {
						return <Blog blog={blog} key={blog.id} />;
					})}
			<ToggleWrapper
				showButtonLabel="Add new blog"
				hideButtonLabel="Cancel"
			>
				<AddBlogForm />
			</ToggleWrapper>
		</>
	);
};

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
)(Blogs);
