import styled from "styled-components";

export const ResultPanel = styled.section`
  background: #111827;
  border: 1px solid #1f2937;
  border-radius: 12px;
  padding: 16px;
`;

export const Title = styled.h2`
  margin: 0 0 10px;
  font-size: 20px;
`;

export const Summary = styled.p`
  margin: 0 0 10px;
  color: #e5e7eb;
`;

export const RestartButton = styled.button`
  border: 1px solid #2563eb;
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 15px;
  color: #f9fafb;
  background: #2563eb;
  cursor: pointer;
`;

export const SectionTitle = styled.h3`
  margin: 14px 0 8px;
  font-size: 16px;
`;

export const List = styled.ul`
  margin: 0;
  padding-left: 18px;
  color: #e5e7eb;
`;

export const ListItem = styled.li`
  margin-bottom: 8px;
  color: ${(props) => (props.$correct ? "#4ade80" : "#f87171")};
`;
