import styled, { css } from "styled-components";

export const ControlPanel = styled.section`
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

export const ControlsRow = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 8px;
`;

export const Label = styled.label`
  color: #cbd5e1;
`;

export const RootSelect = styled.select`
  border: 1px solid #374151;
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 15px;
  color: #f9fafb;
  background: #1f2937;
`;

export const ControlButton = styled.button`
  border: 1px solid #374151;
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 15px;
  color: #f9fafb;
  background: #1f2937;
  cursor: pointer;

  ${(props) =>
    props.$primary &&
    css`
      background: #2563eb;
      border-color: #2563eb;
    `}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
