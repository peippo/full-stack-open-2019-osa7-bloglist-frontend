import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

const StyledContainer = styled.div`
	padding-right: 15px;
	padding-left: 15px;
	margin-right: auto;
	margin-left: auto;
	@media (min-width: 768px) {
		width: 750px;
	}
	@media (min-width: 992px) {
		width: 970px;
	}
	@media (min-width: 1200px) {
		width: 1170px;
	}
`;

const StyledH1 = styled.h1`
	display: inline-block;
	border-bottom: 1px solid #ff25b2;
	position: relative;
	margin-bottom: 0.25rem;

	&:before {
		content: "";
		position: absolute;
		border-bottom: 1px solid #ff25b2;
		width: 2000px;
		height: 1px;
		bottom: -1px;
		left: -2000px;
	}
`;

const StyledLink = styled(Link)`
	position: relative;
	z-index: 1;
	display: block;
	text-transform: uppercase;
	font-weight: 700;
	text-decoration: none;
	margin-top: 2rem;
	margin-bottom: -1.25rem;
`;

export const Container = ({ children }) => {
	return <StyledContainer>{children}</StyledContainer>;
};

export const MainHeading = ({ children }) => {
	return <StyledH1>{children}</StyledH1>;
};

export const BackLink = ({ children, to }) => {
	return (
		<StyledLink to={to}>
			<FontAwesomeIcon icon={faAngleLeft} /> {children}
		</StyledLink>
	);
};
