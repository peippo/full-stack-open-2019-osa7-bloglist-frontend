import React, { useState } from "react";
import PropTypes from "prop-types";

const ToggleWrapper = ({ showButtonLabel, hideButtonLabel, children }) => {
	const [isVisible, setIsVisible] = useState(false);

	if (!isVisible) {
		return (
			<button onClick={() => setIsVisible(!isVisible)}>
				{showButtonLabel}
			</button>
		);
	}

	if (isVisible) {
		return (
			<>
				<div>{children}</div>
				<button onClick={() => setIsVisible(!isVisible)}>
					{hideButtonLabel}
				</button>
			</>
		);
	}
};

ToggleWrapper.propTypes = {
	showButtonLabel: PropTypes.string,
	hideButtonLabel: PropTypes.string,
	children: PropTypes.node
};

export default ToggleWrapper;
