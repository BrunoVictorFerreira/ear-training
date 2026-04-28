import { GlobalStyle } from "./styles/GlobalStyle";
import { AppShell } from "./components/layout/AppShell";
import styled, { css } from "styled-components";
import { Beginner1Module } from "./modules/beginner1/Beginner1Module";
import { Beginner2Module } from "./modules/beginner2/Beginner2Module";
import { QuizzesModule } from "./modules/quizzes/QuizzesModule";
import { quizzes } from "./modules/quizzes/quizzesData";
import { Link, Navigate, Route, Routes, useParams } from "react-router-dom";

const ModuleTabs = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
`;

const ModuleTabLink = styled(Link)`
  text-decoration: none;
  text-align: center;
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

const HomeOptions = styled.div`
  display: grid;
  gap: 12px;
`;

const HomeCard = styled(Link)`
  display: block;
  background: #111827;
  border: 1px solid #1f2937;
  border-radius: 12px;
  padding: 16px;
  text-decoration: none;
  color: #e5e7eb;
`;

const HomeTitle = styled.h2`
  margin: 0 0 8px;
`;

const HomeDescription = styled.p`
  margin: 0;
  color: #cbd5e1;
`;

const BackLink = styled(Link)`
  display: inline-block;
  margin-bottom: 12px;
  color: #93c5fd;
  text-decoration: none;
`;

function EarTrainingPage() {
  const { moduleId } = useParams();
  const activeModule = moduleId === "beginner-2" ? "beginner-2" : "beginner-1";

  return (
    <AppShell>
      <BackLink to="/">Voltar para inicio</BackLink>
      <ModuleTabs>
        <ModuleTabLink to="/ear/beginner-1" $active={activeModule === "beginner-1"}>
          Iniciante 1
        </ModuleTabLink>
        <ModuleTabLink to="/ear/beginner-2" $active={activeModule === "beginner-2"}>
          Iniciante 2 (Nota alvo oitavada)
        </ModuleTabLink>
      </ModuleTabs>

      {activeModule === "beginner-1" && <Beginner1Module />}
      {activeModule === "beginner-2" && <Beginner2Module />}
    </AppShell>
  );
}

const QuizList = styled.div`
  display: grid;
  gap: 10px;
`;

const QuizLink = styled(Link)`
  display: block;
  background: #111827;
  border: 1px solid #1f2937;
  border-radius: 10px;
  padding: 12px;
  text-decoration: none;
  color: #e5e7eb;
`;

function QuizHomePage() {
  return (
    <AppShell>
      <BackLink to="/">Voltar para inicio</BackLink>
      <QuizList>
        {quizzes.map((quiz) => (
          <QuizLink key={quiz.id} to={`/quiz/${quiz.id}`}>
            {quiz.title}
          </QuizLink>
        ))}
      </QuizList>
    </AppShell>
  );
}

function QuizPage() {
  return (
    <AppShell>
      <BackLink to="/quiz">Voltar para lista de quizzes</BackLink>
      <QuizzesModule />
    </AppShell>
  );
}

function HomePage() {
  return (
    <AppShell>
      <HomeOptions>
        <HomeCard to="/ear/beginner-1">
          <HomeTitle>Exercicios de ouvido</HomeTitle>
          <HomeDescription>Treinos que reproduzem notas para voce identificar.</HomeDescription>
        </HomeCard>

        <HomeCard to="/quiz">
          <HomeTitle>Quizzes</HomeTitle>
          <HomeDescription>Visualize e selecione os quizzes disponiveis para estudar teoria.</HomeDescription>
        </HomeCard>
      </HomeOptions>
    </AppShell>
  );
}

function App() {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ear" element={<Navigate to="/ear/beginner-1" replace />} />
        <Route path="/ear/:moduleId" element={<EarTrainingPage />} />
        <Route path="/quiz" element={<QuizHomePage />} />
        <Route path="/quiz/:quizId" element={<QuizPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
