import usersService from "../services/users";
const initialState = null;

const usersReducer = (state = initialState, action) => {
	switch (action.type) {
		case "INITIALIZE_USERS":
			return action.data;
		default:
			return state;
	}
};

export const fetchUsers = () => {
	return async dispatch => {
		const users = await usersService.getAll();
		dispatch({
			type: "INITIALIZE_USERS",
			data: users
		});
	};
};

export default usersReducer;
