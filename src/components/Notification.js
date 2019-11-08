import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Notification = ({ notification }) => {
	const styles = {
		maxWidth: "200px",
		padding: "1rem",
		color: "white"
	};

	let typeStyles;
	if (notification !== null) {
		typeStyles =
			notification.type === "error"
				? { background: "red" }
				: { background: "green" };
	}

	return (
		notification !== null && (
			<p style={{ ...styles, ...typeStyles }}>{notification.message}</p>
		)
	);
};

Notification.propTypes = {
	notification: PropTypes.object
};

const mapStateToProps = state => {
	return {
		notification: state.notification
	};
};

export default connect(mapStateToProps)(Notification);
