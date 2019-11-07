import React from "react";
import { render, waitForElement } from "@testing-library/react";
import App from "./App";

describe("<App />", () => {
	test("shows only the login screen before logging in", async () => {
		const component = render(<App />);

		const headingElement = component.container.querySelector(
			".login-heading"
		);
		const blogElement = component.container.querySelector(".blog");

		expect(headingElement).toHaveTextContent("Log in to application");
		expect(component.container).not.toContainElement(blogElement);
	});

	test("shows blogs when user logs in", async () => {
		const user = {
			name: "Dana Scully",
			token:
				"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRhbmFzIiwiaWQiOiI1ZDk3ODM5ZjIxM2I1YzBlMTIxY2ZhMDMiLCJpYXQiOjE1NzE5NDAxNzl9.MivHiSGWcjhoCCaulwhAZgb2L7yhM0LEVys_P-KKTbI",
			username: "danas"
		};

		localStorage.setItem("loggedUser", JSON.stringify(user));

		const component = render(<App />);

		await waitForElement(() =>
			component.getByText("Dana Scully logged in!")
		);

		const titleElement = component.container.querySelector(".blog__title");
		expect(component.container).toContainElement(titleElement);
	});
});
