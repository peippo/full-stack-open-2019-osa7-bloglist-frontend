import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";

const blog = {
	title: "Blog title goes here",
	author: "Blog Author",
	likes: 5,
	url: "https://www.blog.com/blog-title-goes-here",
	user: {
		username: "admin",
		name: "Administrator"
	}
};

const user = {
	username: "admin"
};

test("only blog title and author are visible by default", () => {
	const component = render(<Blog blog={blog} user={user} />);

	const titleElement = component.container.querySelector(".blog__title");
	const urlElement = component.container.querySelector(".blog__url");
	const likesElement = component.container.querySelector(".blog__likes");
	const addedElement = component.container.querySelector(".blog__added");

	expect(titleElement).toHaveTextContent(
		"Blog title goes here by Blog Author"
	);
	expect(component.container).not.toContainElement(urlElement);
	expect(component.container).not.toContainElement(likesElement);
	expect(component.container).not.toContainElement(addedElement);
});

test("clicking the title reveals additional blog details", () => {
	const mockHandler = jest.fn();
	const component = render(
		<Blog blog={blog} user={user} onClick={mockHandler} />
	);

	const titleElement = component.container.querySelector(".blog__title");

	fireEvent.click(titleElement);

	const urlElement = component.container.querySelector(".blog__url");
	const likesElement = component.container.querySelector(".blog__likes");
	const addedElement = component.container.querySelector(".blog__added");

	expect(urlElement).toBeVisible();
	expect(likesElement).toBeVisible();
	expect(addedElement).toBeVisible();
});
