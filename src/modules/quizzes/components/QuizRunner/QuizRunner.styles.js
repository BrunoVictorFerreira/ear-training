import styled, { css } from "styled-components";

export const QuizPanel = styled.section`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
`;

export const Progress = styled.div`
  color: var(--muted);
  margin-bottom: 10px;
`;

export const Prompt = styled.h3`
  margin: 0 0 12px;
`;

export const Options = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(140px, 1fr));
  gap: 10px;
`;

export const OptionButton = styled.button`
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 15px;
  color: var(--text);
  background: var(--surface-alt);
  cursor: pointer;

  ${(props) =>
    props.$disabled &&
    css`
      opacity: 0.65;
      cursor: not-allowed;
    `}

  ${(props) =>
    props.$correct &&
    css`
      border-color: var(--success-border);
      background: var(--success-bg);
    `}

  ${(props) =>
    props.$wrong &&
    css`
      border-color: var(--error-border);
      background: var(--error-bg);
    `}
`;

export const Feedback = styled.div`
  margin-top: 12px;
  font-weight: 700;
  color: ${(props) => (props.$correct ? "#15803d" : "#b91c1c")};
`;

export const NextButton = styled.button`
  margin-top: 12px;
  border: 1px solid var(--secondary);
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 15px;
  color: #ffffff;
  background: var(--secondary);
  cursor: pointer;
`;
