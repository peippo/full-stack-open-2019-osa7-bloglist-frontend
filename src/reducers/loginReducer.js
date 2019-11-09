import loginService from "../services/login";
const initialState = null;

const loginReducer = (state = initialState, action) => {
	switch (action.type) {
		case "INITIALIZE_LOCAL_STORAGE": {
			const loggedUser = window.localStorage.getItem("loggedUser");
			return JSON.parse(loggedUser);
		}
		case "LOGIN_USER":
			window.localStorage.setItem(
				"loggedUser",
				JSON.stringify(action.data)
			);
			return action.data;
		case "LOGOUT_USER":
			window.localStorage.removeItem("loggedUser");
			return null;
		default:
			return state;
	}
};

export const initializeLocalStorage = () => {
	return {
		type: "INITIALIZE_LOCAL_STORAGE"
	};
};

export const loginUser = credentials => {
	return async dispatch => {
		const user = await loginService.loginUser(credentials);
		dispatch({
			type: "LOGIN_USER",
			data: user
		});
	};
};

export const logoutUser = () => {
	return {
		type: "LOGOUT_USER"
	};
};

export default loginReducer;
