import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Nunito Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
	  color: #ff25b2;
  }

  ul {
	  list-style-type: none;
	  padding: 0;
  }

  li {
	padding: 0.2rem 0;
  }

  input {
	  font-size: 1rem;
	  padding: 0.25rem;
  }

  label {
	  font-weight: 700;
	  text-transform: uppercase;
	  font-size: 0.8rem;
	  display: block;
  }
`;
export default GlobalStyle;
