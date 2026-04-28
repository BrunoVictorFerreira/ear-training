import { ShellContainer, Subtitle, Title } from "./AppShell.styles";

export function AppShell({ children }) {
  return (
    <ShellContainer>
      <Title>Treino de Ouvido</Title>
      {/* <Subtitle>Treino por modulos: iniciante 1 e iniciante 2.</Subtitle> */}
      {children}
    </ShellContainer>
  );
}
