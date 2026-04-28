import { GlobalStyle } from "./styles/GlobalStyle";
import { AppShell } from "./components/layout/AppShell";
import { Beginner1Module } from "./modules/beginner1/Beginner1Module";

function App() {
  return (
    <>
      <GlobalStyle />
      <AppShell>
        <Beginner1Module />
      </AppShell>
    </>
  );
}

export default App;
