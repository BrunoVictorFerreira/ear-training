import styled, { css } from "styled-components";

export const GuessPanel = styled.section`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
`;

export const SectionTitle = styled.h2`
  margin: 0 0 10px;
  font-size: 18px;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(120px, 1fr));
  gap: 10px;
`;

export const GuessButton = styled.button`
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 15px;
  color: var(--text);
  background: var(--surface-alt);
  cursor: pointer;

  ${(props) =>
    props.$isCorrect &&
    css`
      border-color: var(--success-border);
      background: var(--success-bg);
    `}

  ${(props) =>
    props.$isWrong &&
    css`
      border-color: var(--error-border);
      background: var(--error-bg);
    `}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
