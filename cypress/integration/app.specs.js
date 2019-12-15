describe("Bloglist app", function() {
	before(function() {
		cy.request("POST", "http://localhost:3001/api/tests/reset");
		cy.request("POST", "http://localhost:3001/api/users", {
			username: "danas",
			name: "Dana Scully",
			password: "trustno1"
		});
		cy.visit("/");
	});

	it("loads login screen", function() {
		cy.contains("Log in to application");
	});

	it("user can login", function() {
		cy.get("[data-cy=username]").type("danas");
		cy.get("[data-cy=password]").type("trustno1");
		cy.contains("Login").click();
	});

	it("user can add a new blog", function() {
		cy.get("[data-cy=addNewBlog]").click();
		cy.get("[data-cy=title]").type("New test blog post");
		cy.get("[data-cy=author]").type("Fox Mulder");
		cy.get("[data-cy=url]").type("https://www.google.com");
		cy.get("[data-cy=saveBlog]").click();
		cy.contains("New blog New test blog post by Fox Mulder added!");
	});

	it("user can open the blog details", function() {
		cy.get("li a")
			.contains("New test blog post")
			.click();
		cy.get("h1").contains("New test blog post");
	});

	it("user can like a blog post", function() {
		cy.contains("0 likes");
		cy.get("[data-cy=likePost]").click();
		cy.contains("1 likes");
	});

	it("user can comment on a blog post", function() {
		cy.get("[data-cy=comment]").type("Great post!");
		cy.get("[data-cy=saveComment]").click();
		cy.contains("Great post!");
	});

	it("user can delete a post", function() {
		cy.get("[data-cy=deletePost]").click();
		cy.contains("Blog New test blog post by Fox Mulder deleted!");
		cy.get("ul").should("be.empty");
	});

	it("user can logout", function() {
		cy.contains("Logout").click();
		cy.contains("Log in to application");
	});
});
