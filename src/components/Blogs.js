import React from "react";
import { connect } from "react-redux";
import Blog from "./Blog";
import AddBlogForm from "../components/AddBlogForm";
import ToggleWrapper from "../components/ToggleWrapper";

const Blogs = ({ blogs }) => {
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

export default connect(mapStateToProps)(Blogs);
