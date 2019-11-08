import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import PropTypes from "prop-types";
import { useField } from "../hooks";
import { showNotification } from "../reducers/notificationReducer";

const LoginForm = ({ setUser, showNotification }) => {
	const username = useField("text", true);
	const password = useField("password", true);
	const { resetField: resetUsernameField, ...usernameInput } = username;
	const { resetField: resetPasswordField, ...passwordInput } = password;

	const handleSubmit = event => {
		event.preventDefault();

		axios
			.post("http://localhost:3001/api/login", {
				username: username.value,
				password: password.value
			})
			.then(function(response) {
				setUser(response.data);
				window.localStorage.setItem(
					"loggedUser",
					JSON.stringify(response.data)
				);
			})
			.catch(function(error) {
				console.log(error);
				resetUsernameField();
				resetPasswordField();
				showNotification({
					message: "Wrong username or password!",
					type: "error"
				});
			});
	};

	return (
		<>
			<h2 className="login-heading">Log in to application</h2>
			<form onSubmit={handleSubmit}>
				<div style={{ marginBottom: "0.5rem" }}>
					<label htmlFor="username">Username:</label>
					<input {...usernameInput} />
				</div>
				<div style={{ marginBottom: "0.5rem" }}>
					<label htmlFor="password">Password:</label>
					<input {...passwordInput} />
				</div>
				<button>Login</button>
			</form>
		</>
	);
};

LoginForm.propTypes = {
	setUser: PropTypes.func,
	showNotification: PropTypes.func
};

const mapDispatchToProps = {
	showNotification
};

export default connect(
	null,
	mapDispatchToProps
)(LoginForm);
