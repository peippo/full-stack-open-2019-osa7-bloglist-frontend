import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { useField } from "../hooks";
import { showNotification } from "../reducers/notificationReducer";
import { loginUser } from "../reducers/loginReducer";
import { MainHeading } from "../theme/commonStyles";
import { PrimaryButton } from "../components/Button";

const LoginForm = ({ history, loginUser, showNotification }) => {
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
			history.push("/blogs");
		} catch (error) {
			showNotification({
				message: "Wrong username or password!",
				type: "error"
			});
		}
	}

	return (
		<>
			<MainHeading className="login-heading">
				Log in to application
			</MainHeading>
			<form style={{ marginTop: "20px" }} onSubmit={handleSubmit}>
				<div style={{ marginBottom: "0.5rem" }}>
					<label htmlFor="username">Username:</label>
					<input {...usernameInput} data-cy="username" />
				</div>
				<div style={{ marginBottom: "0.5rem" }}>
					<label htmlFor="password">Password:</label>
					<input {...passwordInput} data-cy="password" />
				</div>
				<PrimaryButton>Login</PrimaryButton>
			</form>
		</>
	);
};

LoginForm.propTypes = {
	history: PropTypes.object,
	loginUser: PropTypes.func,
	showNotification: PropTypes.func
};

LoginForm.propTypes = {
	loginUser: PropTypes.func,
	showNotification: PropTypes.func
};

const mapDispatchToProps = {
	loginUser,
	showNotification
};

export default withRouter(connect(null, mapDispatchToProps)(LoginForm));
