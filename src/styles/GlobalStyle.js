import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  :root {
    --bg: #fff7f2;
    --surface: #ffffff;
    --surface-alt: #fff1e6;
    --border: #ffd7bf;
    --text: #1f2937;
    --muted: #64748b;
    --primary: #f97316;
    --primary-strong: #ea580c;
    --secondary: #2563eb;
    --secondary-soft: #dbeafe;
    --success-bg: #dcfce7;
    --success-border: #22c55e;
    --error-bg: #fee2e2;
    --error-border: #ef4444;
  }

  body {
    margin: 0;
    font-family: Inter, Segoe UI, Roboto, Arial, sans-serif;
    background: var(--surface);
    color: var(--text);
  }
`;
