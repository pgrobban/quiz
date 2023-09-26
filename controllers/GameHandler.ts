import {
  AcceptableOrGroupedAcceptableAnswersInGame,
  GroupedAcceptableAnswersInGame,
} from "./../models/types";
import { orderBy, shuffle, sortBy } from "lodash";
import { v4 as uuid } from "uuid";
import questions from "../models/questions";
import {
  AcceptableOrGroupedAcceptableAnswers,
  Game,
  GameRound,
  GameStatus,
  QuestionStatus,
  TeamAndPoints,
  isGroupedAcceptableAnswers,
} from "../models/types";
import { findAcceptableAnswer, markAnswerAsAccepted } from "./helpers";

export const NUMBER_OF_PASSES_FOR_ROUND: Record<GameRound, number> = {
  [GameRound.openEnded]: 2,
  [GameRound.cluesAndAnswers]: 1,
  [GameRound.fillInBlank]: 1,
  [GameRound.linkedCategories]: 1,
  [GameRound.partIdentification]: 1,
  [GameRound.possibleAnswers]: 1,
  [GameRound.pictureBoard]: 1,
};

export const NON_VERIFIED_ANSWER = "NON-VERIFIED-ANSWER";
export const NO_OR_INVALID_ANSWER = "NO-OR-INVALID-ANSWER";
export const HEAD_TO_HEAD_ANSWERS_TO_SUBMIT = 3;
export const MAXIMUM_POINTS_PER_QUESTION = 100;

export default class GameHandler {
  private games: Game[];

  constructor() {
    this.games = [];
  }

  createNewGame(): Game {
    const id = uuid();
    const game = { id, gameStatus: GameStatus.created };
    this.games.push(game);
    return game;
  }

  startGame(gameId: string, teamNames: string[]) {
    const game = this.getGameById(gameId);
    game.teamsAndPoints = teamNames.map((teamName) => ({
      teamName,
      points: 0,
    }));
    game.gameStatus = GameStatus.waitingForHost;
    return game;
  }

  getGames() {
    return this.games;
  }

  getGameById(gameId: string) {
    const game = this.games.find((g) => g.id === gameId);
    if (!game) {
      throw new Error(`*** Didn't find game with id ${gameId}`);
    }
    return game;
  }

  requestHostJoinGame(gameId: string) {
    const game = this.getGameById(gameId);
    if (game.gameStatus !== GameStatus.waitingForHost) {
      // host reconnected
      return game;
    }

    game.gameStatus = GameStatus.inProgress;
    game.questionStatus = QuestionStatus.waitingForRound;
    return game;
  }

  requestSetActiveRound(gameId: string, gameRound: GameRound) {
    const game = this.getGameById(gameId);
    if (game.gameStatus !== GameStatus.inProgress) {
      throw new Error("*** requestSetActiveRound Assertion error");
    }

    game.round = gameRound;
    game.questionStatus = QuestionStatus.waitingForQuestion;
    return game;
  }

  requestUndoActiveRound(gameId: string) {
    const game = this.getGameById(gameId);
    if (
      game.gameStatus !== GameStatus.inProgress ||
      game.questionStatus !== QuestionStatus.waitingForQuestion
    ) {
      console.log(game);
      throw new Error("*** requestUndoActiveRound assertion error");
    }

    game.round = undefined;
    game.questionStatus = QuestionStatus.waitingForRound;
    return game;
  }

  private getAcceptableAnswersInGame(
    acceptableAnswers: AcceptableOrGroupedAcceptableAnswers
  ): AcceptableOrGroupedAcceptableAnswersInGame {
    if (isGroupedAcceptableAnswers(acceptableAnswers)) {
      const result: GroupedAcceptableAnswersInGame = {};
      Object.keys(acceptableAnswers).forEach((key) => {
        result[key] = acceptableAnswers[key].map((acceptableAnswer) => ({
          ...acceptableAnswer,
          answered: false,
        }));
      });
      return result;
    }
    return acceptableAnswers.map((acceptableAnswer) => ({
      ...acceptableAnswer,
      answered: false,
    }));
  }

  requestSetActiveQuestion(gameId: string, questionText: string) {
    const game = this.getGameById(gameId);
    const { round, gameStatus } = game;
    if (gameStatus !== GameStatus.inProgress || !round) {
      console.log(game);
      throw new Error("*** requestSetActiveQuestion Assertion error");
    }

    if (!round) {
      throw new Error(`*** Tried to get round from active game ${gameId}`);
    }

    const questionModel = questions[round].find(
      (question) => question.questionText === questionText
    );
    if (!questionModel) {
      throw new Error(
        `Tried to find question '${questionText}' in round ${round}`
      );
    }

    const questionWithAnswerStatuses = {
      ...questionModel,
      acceptableAnswers: this.getAcceptableAnswersInGame(
        questionModel.acceptableAnswers
      ),
    };
    game.currentQuestion = {
      question: questionWithAnswerStatuses,
      questionInRound: game.currentQuestion
        ? game.currentQuestion.questionInRound + 1
        : 1,
      answeredTeams: [],
      pass: 1,
    };
    game.questionStatus = QuestionStatus.receivedQuestion;
    if (game.round === GameRound.pictureBoard) {
      return game;
    }
    return this.requestTeamAnswer(game.id);
  }

  requestIncrementPassNumber(gameId: string) {
    const game = this.getGameById(gameId);
    const { round, gameStatus } = game;
    if (
      gameStatus !== GameStatus.inProgress ||
      !round ||
      game.questionStatus !== QuestionStatus.receivedQuestion ||
      !game.currentQuestion
    ) {
      throw new Error("*** requestSetTurnNumber Assertion error");
    }

    game.currentQuestion.pass++;
    console.log("*** incremented", game);
    return game;
  }

  requestTeamAnswer(gameId: string) {
    const game = this.getGameById(gameId);
    console.log("*** in requestTeamAnswer", game);

    if (
      !game.currentQuestion ||
      !game.teamsAndPoints ||
      !game.questionStatus ||
      !game.round ||
      game.gameStatus !== GameStatus.inProgress ||
      ![
        QuestionStatus.receivedQuestion,
        QuestionStatus.waitingForTeamAnswer,
      ].includes(game.questionStatus)
    ) {
      console.log("***", game);
      throw new Error("requestTeamAnswer Assertion error");
    }

    if (
      game.questionStatus === QuestionStatus.receivedQuestion &&
      (!game.currentQuestion.lastAnswer ||
        game.currentQuestion.orderedTeamsLeftToAnswer?.length === 0)
    ) {
      game.currentQuestion.orderedTeamsLeftToAnswer =
        this.getOrderedTeamsToAnswer(
          game.teamsAndPoints,
          game.round,
          game.currentQuestion.pass,
          game.headToHeadEnabled
        );
      game.currentQuestion.answeredTeams = [];
      game.currentQuestion.lastAnswer = undefined;
    } else {
      if (!game.currentQuestion.orderedTeamsLeftToAnswer) {
        console.log("***", game);
        throw new Error("requestTeamAnswer Assertion error");
      }
    }

    game.questionStatus = QuestionStatus.waitingForTeamAnswer;
    console.log("*** after requestTeamAnswer", game);
    return game;
  }

  private getOrderedTeamsToAnswer(
    teamsAndPoints: TeamAndPoints[],
    round: GameRound,
    pass: number,
    headToHeadEnabled?: boolean
  ) {
    let orderedTeamsAndPoints;
    if (headToHeadEnabled) {
      orderedTeamsAndPoints = orderBy(teamsAndPoints, ["points"], ["asc"]);
    } else {
      if (round === GameRound.openEnded) {
        switch (pass) {
          case 1:
            orderedTeamsAndPoints = shuffle(teamsAndPoints);
          case 2:
            orderedTeamsAndPoints = orderBy(
              teamsAndPoints,
              ["points"],
              ["asc"]
            );
          case 3:
          default:
            orderedTeamsAndPoints = orderBy(
              teamsAndPoints,
              ["points"],
              ["desc"]
            );
        }
      } else {
        orderedTeamsAndPoints = orderBy(teamsAndPoints, ["points"], ["desc"]);
      }
    }
    return orderedTeamsAndPoints.map((teamAndPoints) => teamAndPoints.teamName);
  }

  requestVerificationOfAnswer(gameId: string, answerText: string) {
    const game = this.getGameById(gameId);
    const { currentQuestion, questionStatus, headToHeadEnabled } = game;
    const { headToHeadInfo } = currentQuestion || {};

    if (
      !answerText ||
      !currentQuestion ||
      (questionStatus &&
        ![
          QuestionStatus.waitingForTeamAnswer,
          QuestionStatus.receivedHeadToHeadAnswers,
        ].includes(questionStatus))
    ) {
      console.log(game);
      throw new Error("requestVerificationOfAnswer Assertion error");
    }

    game.questionStatus = QuestionStatus.awardingPoints;

    if (![NON_VERIFIED_ANSWER, NO_OR_INVALID_ANSWER].includes(answerText)) {
      const foundAcceptableAnswer = findAcceptableAnswer(
        currentQuestion.question.acceptableAnswers,
        answerText
      );
      if (foundAcceptableAnswer) {
        markAnswerAsAccepted(
          currentQuestion.question.acceptableAnswers,
          answerText
        );

        if (
          foundAcceptableAnswer.points === 0 &&
          headToHeadEnabled &&
          headToHeadInfo
        ) {
          headToHeadInfo.hasPointlessAnswer = true;
        }
      } else {
        if (headToHeadEnabled && headToHeadInfo) {
          answerText =
            headToHeadInfo.headToHeadAnswers[
            headToHeadInfo.checkingHeadToHeadAnswerIndex
            ];
        } else {
          console.log(game);
          throw new Error("requestVerificationOfAnswer Assertion error");
        }
      }
    }

    game.currentQuestion!.lastAnswer = answerText;
    return game;
  }

  requestAddingOfPoints(gameId: string) {
    const game = this.getGameById(gameId);
    if (
      !game.currentQuestion ||
      !game.currentQuestion?.orderedTeamsLeftToAnswer ||
      !game.teamsAndPoints ||
      game.questionStatus !== QuestionStatus.awardingPoints ||
      !game.currentQuestion.lastAnswer
    ) {
      console.log(game);
      throw new Error("requestAddingOfPoints Assertion error");
    }

    const teamToAwardPoints = game.currentQuestion.orderedTeamsLeftToAnswer[0];
    const t = game.teamsAndPoints.find(
      (team) => team.teamName === teamToAwardPoints
    );
    if (!t) {
      console.log(game);
      throw new Error("requestAddingOfPoints Assertion error");
    }

    const lastAnswer = game.currentQuestion.lastAnswer;
    if (lastAnswer === NO_OR_INVALID_ANSWER) {
      t.points += 100;
    } else if (lastAnswer === NON_VERIFIED_ANSWER) {
      // nothing
    } else {
      const foundAcceptableAnswer = findAcceptableAnswer(
        game.currentQuestion.question.acceptableAnswers,
        lastAnswer
      );
      t.points += foundAcceptableAnswer?.points ?? 100;
    }

    game.questionStatus = QuestionStatus.pointsAdded;
    return game;
  }

  requestEndGame(gameId: string) {
    const game = this.getGameById(gameId);
    game.gameStatus = GameStatus.ended;
    return game;
  }

  requestContinueGame(gameId: string) {
    const game = this.getGameById(gameId);
    const {
      currentQuestion,
      round,
      teamsAndPoints,
      questionStatus,
      headToHeadEnabled,
    } = game;
    const { orderedTeamsLeftToAnswer, answeredTeams, pass, headToHeadInfo } =
      currentQuestion || {};
    console.log("*** continue game", game);

    if (
      !currentQuestion ||
      !round ||
      !orderedTeamsLeftToAnswer ||
      !teamsAndPoints ||
      !answeredTeams ||
      !questionStatus ||
      !pass ||
      ![
        QuestionStatus.pointsAdded,
        QuestionStatus.receivedHeadToHeadAnswers,
        QuestionStatus.waitingForTeamAnswer,
      ].includes(questionStatus)
    ) {
      console.log(game);
      throw new Error("requestContinueGame Assertion error");
    }

    if (!headToHeadEnabled) {
      answeredTeams.push(orderedTeamsLeftToAnswer[0]);
      orderedTeamsLeftToAnswer.splice(0, 1);
    }

    if (
      [
        QuestionStatus.receivedHeadToHeadAnswers,
        QuestionStatus.pointsAdded,
      ].includes(questionStatus) &&
      headToHeadInfo &&
      headToHeadInfo.checkingHeadToHeadAnswerIndex <
      HEAD_TO_HEAD_ANSWERS_TO_SUBMIT - 1
    ) {
      headToHeadInfo.checkingHeadToHeadAnswerIndex++;
      const lastAnswer =
        headToHeadInfo.headToHeadAnswers[
        headToHeadInfo.checkingHeadToHeadAnswerIndex!
        ];
      game.questionStatus = QuestionStatus.waitingForTeamAnswer;
      return this.requestVerificationOfAnswer(gameId, lastAnswer);
    }

    if (
      questionStatus === QuestionStatus.pointsAdded &&
      headToHeadInfo &&
      headToHeadInfo.checkingHeadToHeadAnswerIndex ===
      HEAD_TO_HEAD_ANSWERS_TO_SUBMIT - 1 &&
      headToHeadInfo.hasPointlessAnswer
    ) {
      game.winningTeamName = orderedTeamsLeftToAnswer[0];
      game.questionStatus = QuestionStatus.announcingResults;
      return game;
    }

    if (
      questionStatus === QuestionStatus.pointsAdded &&
      headToHeadInfo &&
      headToHeadInfo.checkingHeadToHeadAnswerIndex ===
      HEAD_TO_HEAD_ANSWERS_TO_SUBMIT - 1 &&
      !headToHeadInfo.hasPointlessAnswer
    ) {
      currentQuestion.answeredTeams!.push(orderedTeamsLeftToAnswer[0]);
      currentQuestion.orderedTeamsLeftToAnswer =
        orderedTeamsLeftToAnswer.slice(1);

      if (currentQuestion.orderedTeamsLeftToAnswer.length === 0) {
        game.winningTeamName = sortBy(teamsAndPoints, "points")[0].teamName;
        game.questionStatus = QuestionStatus.announcingResults;
        return game;
      }

      currentQuestion.headToHeadInfo = undefined;
      game.questionStatus = QuestionStatus.waitingForTeamAnswer;
      return this.requestTeamAnswer(gameId);
    }

    if (orderedTeamsLeftToAnswer!.length > 0) {
      game.questionStatus = QuestionStatus.receivedQuestion;
      return this.requestTeamAnswer(gameId);
    }

    if (pass < NUMBER_OF_PASSES_FOR_ROUND[round]) {
      game.questionStatus = QuestionStatus.receivedQuestion;
      this.requestIncrementPassNumber(gameId);
      return this.requestTeamAnswer(gameId);
    }

    game.questionStatus = QuestionStatus.announcingResults;
    return game;
  }

  requestEndQuestion(gameId: string) {
    const game = this.getGameById(gameId);
    if (game.questionStatus !== QuestionStatus.announcingResults) {
      console.log(game);
      throw new Error("requestEndQuestion Assertion error");
    }

    game.currentQuestion = undefined;
    game.round = undefined;
    game.questionStatus = QuestionStatus.waitingForRound;
    return game;
  }

  requestEnableHeadToHead(gameId: string) {
    const game = this.getGameById(gameId);
    if (game.questionStatus !== QuestionStatus.waitingForRound) {
      console.log(game);
      throw new Error("requestEnableHeadToHead Assertion error");
    }

    game.headToHeadEnabled = true;
    game.teamsAndPoints = sortBy(game.teamsAndPoints, "points").slice(0, 2);
    game.teamsAndPoints[0].points = 0;
    game.teamsAndPoints[1].points = 0;

    return game;
  }

  requestHeadToHeadAnswersSubmission(gameId: string, answerTexts: string[]) {
    const game = this.getGameById(gameId);
    if (
      !game.headToHeadEnabled ||
      !game.currentQuestion ||
      game.questionStatus !== QuestionStatus.waitingForTeamAnswer
    ) {
      console.log(game);
      throw new Error("requestHeadToHeadAnswersSubmission Assertion error");
    }

    game.currentQuestion!.headToHeadInfo = {
      headToHeadAnswers: answerTexts,
      hasPointlessAnswer: false,
      checkingHeadToHeadAnswerIndex: -1,
    };
    game.questionStatus = QuestionStatus.receivedHeadToHeadAnswers;
    return game;
  }
}
