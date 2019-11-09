import React, { useEffect } from "react";
import { connect } from "react-redux";
import { initializeUsers } from "../reducers/usersReducer";

const UserList = ({ initializeUsers, users }) => {
	useEffect(() => {
		initializeUsers();
	}, [initializeUsers]);

	return (
		<div>
			<h2>Users</h2>
			{users !== null &&
				users.map(user => {
					const blogsCreated = user.blogs.length;
					return (
						<li key={user.id}>
							{user.name} ({blogsCreated}{" "}
							{blogsCreated === 1 ? "blog post" : "blog posts"})
						</li>
					);
				})}
		</div>
	);
};

const mapStateToProps = state => {
	return {
		users: state.users
	};
};

const mapDispatchToProps = {
	initializeUsers
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(UserList);
