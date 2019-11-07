import React from "react";
import PropTypes from "prop-types";

const Notification = ({ notification }) => {
	const styles = {
		maxWidth: "200px",
		padding: "1rem",
		color: "white"
	};
	let typeStyles =
		notification.type === "error"
			? { background: "red" }
			: { background: "green" };

	return <p style={{ ...styles, ...typeStyles }}>{notification.message}</p>;
};

Notification.propTypes = {
	notification: PropTypes.object
};

export default Notification;
