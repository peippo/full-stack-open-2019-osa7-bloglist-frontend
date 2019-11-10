import React from "react";

const BlogComments = ({ comments }) => {
	return (
		<div>
			<h3>Comments</h3>
			<ul>
				{comments.map(comment => {
					return <li key={comment.id}>{comment.content}</li>;
				})}
			</ul>
		</div>
	);
};

export default BlogComments;
