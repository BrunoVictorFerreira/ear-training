import { ShellContainer, Subtitle, Title } from "./AppShell.styles";

export function AppShell({ children }) {
  return (
    <ShellContainer>
      <Title>Functional Ear Training</Title>
      <Subtitle>Modulo iniciante 1: sequencia de 4 notas + identificacao da nota-alvo.</Subtitle>
      {children}
    </ShellContainer>
  );
}
