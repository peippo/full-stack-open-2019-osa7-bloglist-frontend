import React from "react";
import { connect } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import { logoutUser } from "../reducers/loginReducer";
import { Container } from "../theme/commonStyles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { LogoutButton } from "../components/Button";

const Navigation = ({ history, login, logoutUser }) => {
	const handleLogout = () => {
		logoutUser();
		history.push("/");
	};

	return (
		<nav
			style={{
				marginBottom: "1rem",
				background: "#ff2bb4",
				padding: "20px 0",
				color: "white"
			}}
		>
			<Container>
				<Flex>
					<div>
						<StyledLink
							to="/blogs"
							style={{ margin: "0 0.5rem 0 0" }}
						>
							Blogs
						</StyledLink>
						<StyledLink
							to="/users"
							style={{ margin: "0 2rem 0 0" }}
						>
							Users
						</StyledLink>
					</div>
					<div>
						<FontAwesomeIcon icon={faUser} />{" "}
						{login !== null && login.name}{" "}
						<LogoutButton onClick={handleLogout}>
							Logout
						</LogoutButton>
					</div>
				</Flex>
			</Container>
		</nav>
	);
};

const Flex = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const StyledLink = styled(NavLink)`
	color: #ffd4f0;
	font-weight: 700;
	font-size: 22px;
	text-decoration: none;

	&:hover {
		text-decoration: underline;
	}

	&.active {
		color: white;
		text-decoration: underline;
	}
`;

Navigation.propTypes = {
	history: PropTypes.object,
	login: PropTypes.object,
	logoutUser: PropTypes.func
};

const mapStateToProps = state => {
	return {
		login: state.login
	};
};

const mapDispatchToProps = {
	logoutUser
};

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(Navigation)
);
