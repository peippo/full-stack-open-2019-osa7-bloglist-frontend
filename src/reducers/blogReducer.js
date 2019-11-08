import blogService from "../services/blogs";

export const likeBlog = blog => {
	return async dispatch => {
		const updatedBlog = await blogService.addLike(blog);
		dispatch({
			type: "LIKE",
			data: updatedBlog
		});
	};
};

export const createBlog = (content, headers) => {
	return async dispatch => {
		const newBlog = await blogService.createNewBlog(content, headers);
		dispatch({
			type: "NEW_BLOG",
			data: newBlog
		});
	};
};

export const deleteBlog = (blog, headers) => {
	return async dispatch => {
		await blogService.deleteBlog(blog, headers);
		dispatch({
			type: "DELETE_BLOG",
			data: blog
		});
	};
};

export const initializeBlogs = () => {
	return async dispatch => {
		const blogs = await blogService.getAll();
		dispatch({
			type: "INITIALIZE_BLOGS",
			data: blogs
		});
	};
};

const blogReducer = (state = [], action) => {
	switch (action.type) {
		case "INITIALIZE_BLOGS":
			return action.data;
		case "LIKE": {
			return state.map(blog =>
				blog.id !== action.data.id ? blog : action.data
			);
		}
		case "NEW_BLOG":
			return [...state, action.data];
		case "DELETE_BLOG": {
			return state.filter(blog => blog.id !== action.data.id);
		}
		default:
			return state;
	}
};

export default blogReducer;
