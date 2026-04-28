import { GlobalStyle } from "./styles/GlobalStyle";
import { AppShell } from "./components/layout/AppShell";
import styled, { css } from "styled-components";
import { Beginner1Module } from "./modules/beginner1/Beginner1Module";
import { Beginner2Module } from "./modules/beginner2/Beginner2Module";
import { QuizzesModule } from "./modules/quizzes/QuizzesModule";
import { quizzes } from "./modules/quizzes/quizzesData";
import { NoteText } from "./components/NoteText";
import { Link, Navigate, Route, Routes, useParams } from "react-router-dom";

const ModuleTabs = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
`;

const ModuleTabLink = styled(Link)`
  text-decoration: none;
  text-align: center;
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 15px;
  color: var(--text);
  background: var(--surface);
  cursor: pointer;

  ${(props) =>
    props.$active &&
    css`
      background: var(--secondary-soft);
      border-color: var(--secondary);
      color: var(--secondary);
    `}
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, #fff3e8 0%, #eaf2ff 100%);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 14px;
`;

const HeroEyebrow = styled.div`
  display: inline-block;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: var(--secondary);
  background: var(--secondary-soft);
  border: 1px solid #bfdbfe;
  border-radius: 999px;
  padding: 4px 10px;
  margin-bottom: 10px;
`;

const HeroTitle = styled.h2`
  margin: 0 0 8px;
  font-size: 30px;
`;

const HeroText = styled.p`
  margin: 0;
  color: var(--muted);
  max-width: 640px;
  line-height: 1.45;
`;

const StatGrid = styled.div`
  margin-top: 14px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 10px;
`;

const StatCard = styled.div`
  background: #ffffff;
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 10px 12px;
`;

const StatValue = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: var(--primary-strong);
`;

const StatLabel = styled.div`
  font-size: 13px;
  color: var(--muted);
`;

const HomeOptions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 12px;
  margin-bottom: 14px;
`;

const HomeCard = styled(Link)`
  display: block;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 16px;
  text-decoration: none;
  color: var(--text);
`;

const HomeTitle = styled.h3`
  margin: 0 0 8px;
`;

const HomeDescription = styled.p`
  margin: 0 0 10px;
  color: var(--muted);
  line-height: 1.4;
`;

const HomeAction = styled.span`
  color: var(--secondary);
  font-weight: 700;
`;

const HomeFeatures = styled.section`
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 14px 16px;
`;

const FeatureTitle = styled.h3`
  margin: 0 0 10px;
`;

const FeatureList = styled.ul`
  margin: 0;
  padding-left: 18px;
  color: var(--muted);
`;

const BackLink = styled(Link)`
  display: inline-block;
  margin-bottom: 12px;
  color: var(--secondary);
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
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 12px;
`;

const QuizLink = styled(Link)`
  display: block;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 14px;
  text-decoration: none;
  color: var(--text);
`;

const QuizHero = styled.section`
  background: linear-gradient(135deg, #fff3e8 0%, #eaf2ff 100%);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 14px;
`;

const QuizHeroEyebrow = styled.div`
  display: inline-block;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: var(--primary-strong);
  background: #ffedd5;
  border: 1px solid #fed7aa;
  border-radius: 999px;
  padding: 4px 10px;
  margin-bottom: 10px;
`;

const QuizHeroTitle = styled.h2`
  margin: 0 0 8px;
  font-size: 28px;
`;

const QuizHeroText = styled.p`
  margin: 0;
  color: var(--muted);
  max-width: 700px;
  line-height: 1.45;
`;

const QuizMeta = styled.div`
  margin-top: 12px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 10px;
`;

const QuizMetaCard = styled.div`
  background: #ffffff;
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 10px 12px;
`;

const QuizMetaValue = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: var(--secondary);
`;

const QuizMetaLabel = styled.div`
  font-size: 13px;
  color: var(--muted);
`;

const QuizCardTitle = styled.h3`
  margin: 0 0 8px;
  font-size: 18px;
`;

const QuizCardDescription = styled.p`
  margin: 0 0 10px;
  color: var(--muted);
  line-height: 1.4;
`;

const QuizCardAction = styled.span`
  color: var(--secondary);
  font-weight: 700;
`;

function QuizHomePage() {
  const quizCount = quizzes.length;

  return (
    <AppShell>
      <BackLink to="/">Voltar para inicio</BackLink>
      <QuizHero>
        <QuizHeroEyebrow>Biblioteca de Quizzes</QuizHeroEyebrow>
        <QuizHeroTitle>Escolha um quiz e teste sua teoria musical.</QuizHeroTitle>
        <QuizHeroText>
          Treine campo harmonico, graus e funcoes harmonicas com feedback imediato, tempo por pergunta e resumo de
          desempenho ao final.
        </QuizHeroText>
        <QuizMeta>
          <QuizMetaCard>
            <QuizMetaValue>{quizCount}</QuizMetaValue>
            <QuizMetaLabel>quizzes disponiveis</QuizMetaLabel>
          </QuizMetaCard>
          <QuizMetaCard>
            <QuizMetaValue>Tempo</QuizMetaValue>
            <QuizMetaLabel>analise por pergunta</QuizMetaLabel>
          </QuizMetaCard>
          <QuizMetaCard>
            <QuizMetaValue>Feedback</QuizMetaValue>
            <QuizMetaLabel>acerto e erro em tempo real</QuizMetaLabel>
          </QuizMetaCard>
        </QuizMeta>
      </QuizHero>

      <QuizList>
        {quizzes.map((quiz) => (
          <QuizLink key={quiz.id} to={`/quiz/${quiz.id}`}>
            <QuizCardTitle>
              <NoteText text={quiz.title} />
            </QuizCardTitle>
            <QuizCardDescription>
              <NoteText text={quiz.description} />
            </QuizCardDescription>
            <QuizCardAction>Abrir quiz</QuizCardAction>
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
  const quizCount = quizzes.length;

  return (
    <AppShell>
      <HeroSection>
        <HeroEyebrow>Hub</HeroEyebrow>
        <HeroTitle>Treine seu ouvido e teoria musical em um unico lugar.</HeroTitle>
        <HeroText>
          Pratique reconhecimento auditivo com notas tocadas e depois valide seu conhecimento de campo harmonico com
          quizzes progressivos.
        </HeroText>
        <StatGrid>
          <StatCard>
            <StatValue>2</StatValue>
            <StatLabel>modulos de ouvido</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>{quizCount}</StatValue>
            <StatLabel>quizzes disponiveis</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>100%</StatValue>
            <StatLabel>foco em estudo pratico</StatLabel>
          </StatCard>
        </StatGrid>
      </HeroSection>

      <HomeOptions>
        <HomeCard to="/ear/beginner-1">
          <HomeTitle>Treino de Ouvido</HomeTitle>
          <HomeDescription>
            Sequencias de notas com desafio de identificacao, replay de alvo e timbres diferentes para estudo diario.
          </HomeDescription>
          <HomeAction>Comecar exercicios</HomeAction>
        </HomeCard>

        <HomeCard to="/quiz">
          <HomeTitle>Quizzes</HomeTitle>
          <HomeDescription>
            Selecione quizzes por tema e acompanhe acertos, erros, tempo de resposta e desempenho por pergunta.
          </HomeDescription>
          <HomeAction>Explorar quizzes</HomeAction>
        </HomeCard>
      </HomeOptions>

      <HomeFeatures>
        <FeatureTitle>Como funciona</FeatureTitle>
        <FeatureList>
          <li>Escolha entre treino de ouvido ou quizzes na home.</li>
          <li>No treino, ouca a sequencia e identifique a nota-alvo.</li>
          <li>No quiz, responda, veja feedback imediato e acompanhe seus tempos.</li>
        </FeatureList>
      </HomeFeatures>
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
