import styled, { css } from "styled-components";

export const ControlPanel = styled.section`
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

export const ControlsRow = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 8px;
`;

export const Label = styled.label`
  color: var(--muted);
`;

export const RootSelect = styled.select`
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 15px;
  color: var(--text);
  background: var(--surface-alt);
`;

export const ControlButton = styled.button`
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 15px;
  color: var(--text);
  background: var(--surface);
  cursor: pointer;

  ${(props) =>
    props.$primary &&
    css`
      background: var(--primary);
      border-color: var(--primary-strong);
      color: #ffffff;
    `}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
