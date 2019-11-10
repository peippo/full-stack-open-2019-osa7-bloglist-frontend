import React from "react";
import { connect } from "react-redux";
import { useField } from "../hooks";
import { commentBlog } from "../reducers/blogReducer";
import { PrimaryButton } from "../components/Button";

const BlogComments = ({ blog, commentBlog }) => {
	const comment = useField("text", true);
	const { resetField: resetCommentField, ...commentInput } = comment;

	const handleSubmit = event => {
		event.preventDefault();
		commentBlog(blog, {
			content: comment.value
		});
		resetCommentField();
	};

	return (
		<div>
			<h3>Comments</h3>
			{blog.comments.length === 0 && <p>No comments!</p>}
			{blog.comments.length > 0 && (
				<ul>
					{blog.comments.map(comment => {
						return <li key={comment.id}>{comment.content}</li>;
					})}
				</ul>
			)}

			<form onSubmit={handleSubmit}>
				<div style={{ marginBottom: "0.5rem" }}>
					<label htmlFor="title">Add new comment:</label>
					<input {...commentInput} />
				</div>
				<PrimaryButton>Save</PrimaryButton>
			</form>
		</div>
	);
};

const mapDispatchToProps = {
	commentBlog
};

export default connect(
	null,
	mapDispatchToProps
)(BlogComments);
