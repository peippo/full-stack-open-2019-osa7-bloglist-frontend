import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Notification = ({ notification }) => {
	const styles = {
		padding: "1rem",
		color: "white",
		fontWeight: "700",
		borderRadius: "5px",
		textAlign: "center"
	};

	let typeStyles;
	if (notification !== null) {
		typeStyles =
			notification.type === "error"
				? { background: "#ff2b2b" }
				: { background: "#add21c" };
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
