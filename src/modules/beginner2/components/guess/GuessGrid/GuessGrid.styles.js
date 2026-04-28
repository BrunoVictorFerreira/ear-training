import styled, { css } from "styled-components";

export const GuessPanel = styled.section`
  background: #111827;
  border: 1px solid #1f2937;
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
  border: 1px solid #374151;
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 15px;
  color: #f9fafb;
  background: #1f2937;
  cursor: pointer;

  ${(props) =>
    props.$isCorrect &&
    css`
      border-color: #22c55e;
      background: #14532d;
    `}

  ${(props) =>
    props.$isWrong &&
    css`
      border-color: #ef4444;
      background: #7f1d1d;
    `}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
