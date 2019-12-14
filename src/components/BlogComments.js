import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useField } from "../hooks";
import { commentBlog } from "../reducers/blogReducer";
import { PrimaryButton } from "../components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSadTear } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

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
			<h3 style={{ margin: "2rem 0 0.25rem 0" }}>Comments</h3>
			{blog.comments.length === 0 && (
				<NoComments>
					<FontAwesomeIcon icon={faSadTear} size="2x" /> No comments
					yet!
				</NoComments>
			)}
			{blog.comments.length > 0 && (
				<CommentList>
					{blog.comments.map(comment => {
						return <li key={comment.id}>{comment.content}</li>;
					})}
				</CommentList>
			)}

			<Form onSubmit={handleSubmit}>
				<div style={{ marginRight: "1rem" }}>
					<label htmlFor="title">Add new comment:</label>
					<input {...commentInput} />
				</div>
				<PrimaryButton>Save comment</PrimaryButton>
			</Form>
		</div>
	);
};

BlogComments.propTypes = {
	blog: PropTypes.object,
	commentBlog: PropTypes.func
};

const NoComments = styled.p`
	max-width: 370px;
	color: #999;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-left: 0;
`;

const CommentList = styled.ul`
	list-style-type: square;
	margin-top: 0.25rem;
`;

const Form = styled.form`
	display: flex;
	align-items: flex-end;
`;

const mapDispatchToProps = {
	commentBlog
};

export default connect(null, mapDispatchToProps)(BlogComments);
