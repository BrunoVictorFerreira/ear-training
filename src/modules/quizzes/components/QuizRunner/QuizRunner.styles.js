import styled, { css } from "styled-components";

export const QuizPanel = styled.section`
  background: #111827;
  border: 1px solid #1f2937;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
`;

export const Progress = styled.div`
  color: #9ca3af;
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
  border: 1px solid #374151;
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 15px;
  color: #f9fafb;
  background: #1f2937;
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
      border-color: #22c55e;
      background: #14532d;
    `}

  ${(props) =>
    props.$wrong &&
    css`
      border-color: #ef4444;
      background: #7f1d1d;
    `}
`;

export const Feedback = styled.div`
  margin-top: 12px;
  font-weight: 700;
  color: ${(props) => (props.$correct ? "#4ade80" : "#f87171")};
`;

export const NextButton = styled.button`
  margin-top: 12px;
  border: 1px solid #2563eb;
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 15px;
  color: #f9fafb;
  background: #2563eb;
  cursor: pointer;
`;
