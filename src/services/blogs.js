import axios from "axios";
const baseUrl = "http://localhost:3001/api/blogs";

const getAll = async () => {
	const response = await axios.get(baseUrl);
	return response.data;
};

const addLike = async blog => {
	const object = { ...blog, likes: blog.likes + 1 };
	const response = await axios.put(`${baseUrl}/${blog.id}`, object);
	return response.data;
};

const createNewBlog = async (content, headers) => {
	const response = await axios.post(baseUrl, content, headers);
	return response.data;
};

const deleteBlog = async (blog, headers) => {
	const response = await axios.delete(`${baseUrl}/${blog.id}`, headers);
	return response.data;
};

export default { getAll, addLike, createNewBlog, deleteBlog };
