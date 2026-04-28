import { ShellContainer, Subtitle, Title } from "./AppShell.styles";

export function AppShell({ children }) {
  return (
    <ShellContainer>
      <Title>Treino de Ouvido</Title>
      {children}
    </ShellContainer>
  );
}
