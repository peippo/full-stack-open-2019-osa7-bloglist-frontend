import React from "react";
import { connect } from "react-redux";
import { MainHeading, BackLink } from "../theme/commonStyles";

const UserDetails = ({ userId, users }) => {
	if (users === null) return null;

	const user = users.find(user => user.id === userId);

	return (
		<div>
			<BackLink to="/users">Users</BackLink>
			<MainHeading>{user.name}</MainHeading>
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

export default connect(mapStateToProps)(UserDetails);
