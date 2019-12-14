import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Blog from "./Blog";
import AddBlogForm from "../components/AddBlogForm";
import ToggleWrapper from "../components/ToggleWrapper";
import { MainHeading } from "../theme/commonStyles";

const Blogs = ({ blogs }) => {
	return (
		<>
			<MainHeading>Blogs</MainHeading>
			<ul>
				{blogs !== null &&
					blogs
						.sort(function(a, b) {
							return b.likes - a.likes;
						})
						.map(blog => {
							return <Blog blog={blog} key={blog.id} />;
						})}
			</ul>
			<ToggleWrapper
				showButtonLabel="Add new blog"
				hideButtonLabel="Cancel"
			>
				<AddBlogForm />
			</ToggleWrapper>
		</>
	);
};

Blogs.propTypes = {
	blogs: PropTypes.array
};

const mapStateToProps = state => {
	return {
		blogs: state.blogs
	};
};

export default connect(mapStateToProps)(Blogs);
