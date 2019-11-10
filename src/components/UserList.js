import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { MainHeading } from "../theme/commonStyles";

const UserList = ({ users }) => {
	return (
		<div>
			<MainHeading>Users</MainHeading>
			<ul>
				{users !== null &&
					users.map(user => {
						const blogsCreated = user.blogs.length;
						return (
							<li key={user.id}>
								<Link to={`/users/${user.id}`}>
									<b>{user.name}</b>
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
