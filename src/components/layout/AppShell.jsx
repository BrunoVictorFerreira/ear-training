import { ShellContainer, Subtitle, Title } from "./AppShell.styles";

export function AppShell({ children }) {
  return (
    <ShellContainer>
      <Title>Musiclly</Title>
      {children}
    </ShellContainer>
  );
}
