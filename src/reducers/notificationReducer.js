const initialState = null;

const notificationReducer = (state = initialState, action) => {
	switch (action.type) {
		case "SHOW_NOTIFICATION":
			return action.data;
		case "HIDE_NOTIFICATION":
			return null;
		default:
			return state;
	}
};

export const showNotification = message => {
	return dispatch => {
		dispatch({
			type: "SHOW_NOTIFICATION",
			data: {
				...message
			}
		});

		setTimeout(() => {
			dispatch({
				type: "HIDE_NOTIFICATION"
			});
		}, 5000);
	};
};

export const hideNotification = () => {
	return {
		type: "HIDE_NOTIFICATION"
	};
};

export default notificationReducer;
