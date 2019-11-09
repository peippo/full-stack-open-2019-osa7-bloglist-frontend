import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useField } from "../hooks";
import { showNotification } from "../reducers/notificationReducer";
import { loginUser } from "../reducers/userReducer";

const LoginForm = ({ loginUser, showNotification }) => {
	const username = useField("text", true);
	const password = useField("password", true);
	const { resetField: resetUsernameField, ...usernameInput } = username;
	const { resetField: resetPasswordField, ...passwordInput } = password;

	async function handleSubmit(event) {
		event.preventDefault();
		resetUsernameField();
		resetPasswordField();

		try {
			await loginUser({
				username: username.value,
				password: password.value
			});
		} catch (error) {
			showNotification({
				message: "Wrong username or password!",
				type: "error"
			});
		}
	}

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
	loginUser: PropTypes.func,
	showNotification: PropTypes.func
};

const mapDispatchToProps = {
	loginUser,
	showNotification
};

export default connect(
	null,
	mapDispatchToProps
)(LoginForm);
