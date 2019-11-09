import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useField } from "../hooks";
import { showNotification } from "../reducers/notificationReducer";
import { createBlog } from "../reducers/blogReducer";

const AddBlogForm = ({ login, showNotification, createBlog }) => {
	const title = useField("text", true);
	const author = useField("text");
	const url = useField("url", true);
	const { resetField: resetTitleField, ...titleInput } = title;
	const { resetField: resetAuthorField, ...authorInput } = author;
	const { resetField: resetUrlField, ...urlInput } = url;

	const handleSubmit = event => {
		event.preventDefault();

		createBlog(
			{
				title: title.value,
				author: author.value,
				url: url.value
			},
			{ headers: { Authorization: `bearer ${login.token}` } }
		);
		showNotification({
			message: `New blog ${title.value} by ${author.value} added!`,
			type: "success"
		});
		resetTitleField();
		resetAuthorField();
		resetUrlField();
	};

	return (
		<>
			<h2>Add new blog</h2>
			<form onSubmit={handleSubmit}>
				<div style={{ marginBottom: "0.5rem" }}>
					<label htmlFor="title">Title:</label>
					<input {...titleInput} />
				</div>
				<div style={{ marginBottom: "0.5rem" }}>
					<label htmlFor="author">Author:</label>
					<input {...authorInput} />
				</div>
				<div style={{ marginBottom: "0.5rem" }}>
					<label htmlFor="url">Url:</label>
					<input {...urlInput} />
				</div>
				<button>Save</button>
			</form>
		</>
	);
};

AddBlogForm.propTypes = {
	login: PropTypes.object,
	showNotification: PropTypes.func,
	createBlog: PropTypes.func
};

const mapDispatchToProps = {
	showNotification,
	createBlog
};

const mapStateToProps = state => {
	return {
		notification: state.notification,
		login: state.login
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AddBlogForm);
