import React from "react";
import styled from "styled-components";

const Highlight = styled.span`
  color: #ed861d;
  font-weight: 700;
`;

const NOTE_PATTERN = /\b([A-G])(#|b)?(dim|m)?\b/g;

export function NoteText({ text }) {
  if (typeof text !== "string" || text.length === 0) return text ?? null;

  const chunks = [];
  let lastIndex = 0;
  let match;

  while ((match = NOTE_PATTERN.exec(text)) !== null) {
    const full = match[0];
    const index = match.index;

    if (index > lastIndex) {
      chunks.push(text.slice(lastIndex, index));
    }

    chunks.push(<Highlight key={`${index}-${full}`}>{full}</Highlight>);
    lastIndex = index + full.length;
  }

  if (lastIndex < text.length) {
    chunks.push(text.slice(lastIndex));
  }

  return <>{chunks}</>;
}
