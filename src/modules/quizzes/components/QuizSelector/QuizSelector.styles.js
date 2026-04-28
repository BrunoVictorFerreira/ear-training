import styled from "styled-components";

export const SelectorPanel = styled.section`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
`;

export const Title = styled.h2`
  margin: 0 0 10px;
  font-size: 18px;
`;

export const Description = styled.p`
  margin: 8px 0 0;
  color: var(--muted);
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

export const Label = styled.label`
  color: var(--text);
`;

export const Select = styled.select`
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 15px;
  color: var(--text);
  background: var(--surface-alt);
`;
