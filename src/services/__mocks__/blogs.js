const blogs = [
	{
		author: "Marvin Delgado",
		id: "5da61623c9c60d09e17ee8b9",
		likes: 7,
		title: "Nulla ornare turpis sed ex euismod",
		url: "https://github.com/axios/axios",
		user: {
			id: "5d97839f213b5c0e121cfa03",
			name: "Dana Scully",
			username: "danas"
		}
	},
	{
		author: "Jackson Chen",
		id: "5da615eec9c60d09e17ee8b7",
		likes: 6,
		title: "Lorem ipsum dolor sit amet",
		url: "https://sagersweb.com/projects/peoplelipsum/index.php",
		user: {
			id: "5d97839f213b5c0e121cfa03",
			name: "Dana Scully",
			username: "danas"
		}
	}
];

const getAll = () => {
	return Promise.resolve(blogs);
};

export default { getAll };
