import { GlobalStyle } from "./styles/GlobalStyle";
import { AppShell } from "./components/layout/AppShell";
import styled, { css } from "styled-components";
import { Beginner1Module } from "./modules/beginner1/Beginner1Module";
import { Beginner2Module } from "./modules/beginner2/Beginner2Module";
import { useState } from "react";

const ModuleTabs = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
`;

const ModuleTab = styled.button`
  border: 1px solid #374151;
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 15px;
  color: #f9fafb;
  background: #1f2937;
  cursor: pointer;

  ${(props) =>
    props.$active &&
    css`
      background: #2563eb;
      border-color: #2563eb;
    `}
`;

function App() {
  const [activeModule, setActiveModule] = useState("beginner1");

  return (
    <>
      <GlobalStyle />
      <AppShell>
        <ModuleTabs>
          <ModuleTab $active={activeModule === "beginner1"} onClick={() => setActiveModule("beginner1")}>
            Iniciante 1
          </ModuleTab>
          <ModuleTab $active={activeModule === "beginner2"} onClick={() => setActiveModule("beginner2")}>
            Iniciante 2 (oitava)
          </ModuleTab>
        </ModuleTabs>

        {activeModule === "beginner1" ? <Beginner1Module /> : <Beginner2Module />}
      </AppShell>
    </>
  );
}

export default App;
