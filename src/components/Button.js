import React from "react";
import styled from "styled-components";

const StyledPrimaryButton = styled.button`
	background: #ff2bb4;
	color: white;
	border: 0;
	font-weight: 700;
	font-size: 1rem;
	padding: 0.25rem 1rem;
	border-radius: 5px;
	font-family: "Nunito Sans", sans-serif;
	margin: 5px 0;

	&:hover {
		cursor: pointer;
	}
`;

const StyledSecondaryButton = styled(StyledPrimaryButton)`
	background: white;
	border: 1px solid #ff2bb4;
	color: #ff2bb4;
`;

const StyledLogoutButton = styled(StyledPrimaryButton)`
	background: transparent;
	border: 1px solid white;
	margin-left: 1rem;
`;

export const PrimaryButton = props => {
	return (
		<StyledPrimaryButton onClick={props.onClick}>
			{props.children}
		</StyledPrimaryButton>
	);
};

export const SecondaryButton = props => {
	return (
		<StyledSecondaryButton onClick={props.onClick}>
			{props.children}
		</StyledSecondaryButton>
	);
};

export const LogoutButton = props => {
	return (
		<StyledLogoutButton onClick={props.onClick}>
			{props.children}
		</StyledLogoutButton>
	);
};
