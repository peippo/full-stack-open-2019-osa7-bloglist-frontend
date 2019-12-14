import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Blog = ({ blog }) => {
	return (
		<li>
			<b>
				<Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
			</b>{" "}
			by {blog.author}
		</li>
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
