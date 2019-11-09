import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { logoutUser } from "../reducers/loginReducer";

const Navigation = ({ history, login, logoutUser }) => {
	const handleLogout = () => {
		logoutUser();
		history.push("/");
	};

	return (
		<div
			style={{
				marginBottom: "1rem",
				background: "lightgray",
				padding: 20
			}}
		>
			<Link to="/" style={{ margin: "0 0.5rem 0 0" }}>
				Blogs
			</Link>
			<Link to="/users" style={{ margin: "0 2rem 0 0" }}>
				Users
			</Link>
			{login !== null && login.name} logged in!{" "}
			<button onClick={handleLogout}>Logout</button>
		</div>
	);
};

Navigation.propTypes = {
	history: PropTypes.object,
	login: PropTypes.object,
	logoutUser: PropTypes.func
};

const mapStateToProps = state => {
	return {
		login: state.login
	};
};

const mapDispatchToProps = {
	logoutUser
};

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(Navigation)
);
