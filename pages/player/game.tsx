import ScoreList from "../../components/ScoreList";
import withReconnect from "../../components/WithReconnect";
import { useAppContext } from "../../controllers/AppWrapper";
import { GameStatus, QuestionStatus } from "../../models/types";
import styles from "../../styles/Home.module.css";

function Game() {
  const appContext = useAppContext();
  const { gameHandler } = appContext;
  const game = gameHandler.getActiveGame();
  if (!game) {
    return null;
  }

  const { gameStatus, questionStatus, currentQuestion } = game;

  return (
    <>
      <main className={styles.main}>
        <h3>Pointless game in progress</h3>

        {gameStatus === GameStatus.waitingForHost && (
          <h4>Waiting for host...</h4>
        )}
        {gameStatus === GameStatus.inProgress && (
          <>
            {questionStatus === QuestionStatus.waitingForRound && (
              <h4>Waiting for host to pick a round...</h4>
            )}
            {questionStatus === QuestionStatus.waitingForQuestion && (
              <h4>Waiting for host to pick a question...</h4>
            )}
            {questionStatus &&
              [
                QuestionStatus.receivedQuestion,
                QuestionStatus.waitingForTeamAnswer,
                QuestionStatus.announcingResults,
              ].includes(questionStatus) &&
              currentQuestion && (
                <>
                  <h4>Question {currentQuestion.questionInRound}</h4>
                  <h2>{currentQuestion.question.questionText}</h2>

                  {
                    questionStatus === QuestionStatus.waitingForTeamAnswer && currentQuestion.orderedTeamsLeftToAnswer && (
                      <h4>Waiting for answer from team {currentQuestion.orderedTeamsLeftToAnswer[0]}</h4>
                    )
                  }
                </>
              )}
          </>
        )}

        <ScoreList />
      </main>
    </>
  );
}

export default withReconnect(Game);
