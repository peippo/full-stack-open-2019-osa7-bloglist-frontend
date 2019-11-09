import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Blog = ({ blog }) => {
	return (
		<div>
			<b>
				<Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
			</b>{" "}
			by {blog.author}
		</div>
	);
};

Blog.propTypes = {
	login: PropTypes.object,
	blog: PropTypes.object,
	likeBlog: PropTypes.func,
	deleteBlog: PropTypes.func,
	showNotification: PropTypes.func
};

const mapStateToProps = state => {
	return {
		login: state.login
	};
};

export default connect(mapStateToProps)(Blog);
