import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const UserList = ({ users }) => {
	return (
		<div>
			<h2>Users</h2>
			<ul>
				{users !== null &&
					users.map(user => {
						const blogsCreated = user.blogs.length;
						return (
							<li key={user.id}>
								<Link to={`/users/${user.id}`}>
									{user.name}
								</Link>{" "}
								({blogsCreated}{" "}
								{blogsCreated === 1
									? "blog post"
									: "blog posts"}
								)
							</li>
						);
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

export default connect(mapStateToProps)(UserList);
