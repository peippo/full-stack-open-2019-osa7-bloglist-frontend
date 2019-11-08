import { useState } from "react";

export const useField = (type, required = false) => {
	const [value, setValue] = useState("");

	const onChange = event => {
		setValue(event.target.value);
	};

	const resetField = () => {
		setValue("");
	};

	return {
		type,
		value,
		onChange,
		resetField,
		required
	};
};
