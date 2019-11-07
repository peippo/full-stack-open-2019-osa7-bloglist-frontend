import React from "react";
import { render, fireEvent } from "@testing-library/react";
import SimpleBlog from "./SimpleBlog";

const blog = {
	title: "Blog title goes here",
	author: "Blog author goes here",
	likes: 5
};

test("renders content", () => {
	const component = render(<SimpleBlog blog={blog} />);

	const titleElement = component.container.querySelector(
		".simple-blog__title"
	);

	const authorElement = component.container.querySelector(
		".simple-blog__author"
	);

	const likesElement = component.container.querySelector(
		".simple-blog__likes"
	);

	expect(titleElement).toHaveTextContent("Blog title goes here");
	expect(authorElement).toHaveTextContent("Blog author goes here");
	expect(likesElement).toHaveTextContent("blog has 5 likes");
});

test("clicking the like button twice calls the event handles twice", () => {
	const mockHandler = jest.fn();
	const component = render(<SimpleBlog blog={blog} onClick={mockHandler} />);

	const buttonElement = component.container.querySelector("button");

	fireEvent.click(buttonElement);
	fireEvent.click(buttonElement);

	expect(mockHandler.mock.calls.length).toBe(2);
});
