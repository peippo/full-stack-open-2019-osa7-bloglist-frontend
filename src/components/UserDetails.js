import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

const UserDetails = ({ userId, users }) => {
	if (users === null) return null;

	const user = users.find(user => user.id === userId);

	return (
		<div>
			<h2>{user.name}</h2>
			<h3>Blog posts:</h3>
			<ul>
				{user.blogs.map(blog => {
					return <li key={blog.id}>{blog.title}</li>;
				})}
			</ul>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		users: state.users
	};
};

export default withRouter(connect(mapStateToProps)(UserDetails));
