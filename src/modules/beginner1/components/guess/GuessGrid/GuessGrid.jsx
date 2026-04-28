import { GuessButton, GuessPanel, Grid, SectionTitle } from "./GuessGrid.styles";
import { NoteText } from "../../../../../components/NoteText";

export function GuessGrid({ notes, canGuess, highlights, onGuess }) {
  return (
    <GuessPanel>
      <SectionTitle>Qual nota voce ouviu por ultimo?</SectionTitle>
      <Grid>
        {notes.map((note) => (
          <GuessButton
            key={note}
            onClick={() => onGuess(note)}
            disabled={!canGuess}
            $isCorrect={highlights[note] === "correct"}
            $isWrong={highlights[note] === "wrong"}
          >
            <NoteText text={note} />
          </GuessButton>
        ))}
      </Grid>
    </GuessPanel>
  );
}
