import React, { useState } from "react";
import PropTypes from "prop-types";
import { PrimaryButton, SecondaryButton } from "../components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const ToggleWrapper = ({
	showButtonLabel,
	hideButtonLabel,
	children,
	dataCy
}) => {
	const [isVisible, setIsVisible] = useState(false);

	if (!isVisible) {
		return (
			<PrimaryButton
				onClick={() => setIsVisible(!isVisible)}
				dataCy={dataCy}
			>
				<FontAwesomeIcon icon={faPlus} /> {showButtonLabel}
			</PrimaryButton>
		);
	}

	if (isVisible) {
		return (
			<>
				<div>{children}</div>
				<SecondaryButton onClick={() => setIsVisible(!isVisible)}>
					{hideButtonLabel}
				</SecondaryButton>
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
