import styled from "styled-components";

export const ResultPanel = styled.section`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 16px;
`;

export const Title = styled.h2`
  margin: 0 0 10px;
  font-size: 20px;
`;

export const Summary = styled.p`
  margin: 0 0 10px;
  color: var(--text);
`;

export const RestartButton = styled.button`
  border: 1px solid var(--secondary);
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 15px;
  color: #ffffff;
  background: var(--secondary);
  cursor: pointer;
`;

export const SectionTitle = styled.h3`
  margin: 14px 0 8px;
  font-size: 16px;
`;

export const List = styled.ul`
  margin: 0;
  padding-left: 18px;
  color: var(--text);
`;

export const ListItem = styled.li`
  margin-bottom: 8px;
  color: var(--text);
`;

export const TimeStatus = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 2px 8px;
  border-radius: 999px;
  border: 1px solid;
  font-size: 12px;
  text-transform: uppercase;
  font-weight: 700;
  color: ${(props) => {
    if (props.$rating === "otimo") return "#166534";
    if (props.$rating === "bom") return "#14532d";
    if (props.$rating === "medio") return "#854d0e";
    return "#7f1d1d";
  }};
  background: ${(props) => {
    if (props.$rating === "otimo") return "#22c55e";
    if (props.$rating === "bom") return "#86efac";
    if (props.$rating === "medio") return "#facc15";
    return "#ef4444";
  }};
  border-color: ${(props) => {
    if (props.$rating === "otimo") return "#16a34a";
    if (props.$rating === "bom") return "#4ade80";
    if (props.$rating === "medio") return "#eab308";
    return "#dc2626";
  }};
`;
