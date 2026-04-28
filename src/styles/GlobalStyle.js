import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: Inter, Segoe UI, Roboto, Arial, sans-serif;
    background: #0f172a;
    color: #e5e7eb;
  }
`;
