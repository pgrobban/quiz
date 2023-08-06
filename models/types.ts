
export enum GameStatus {
  created = 'created',
  waitingForHost = 'waiting_for_host',
  inProgress = 'in_progress',
  ended = 'ended'
}

export enum QuestionStatus {
  waitingForRound = 'waiting_for_round',
  waitingForQuestion = 'waiting_for_question',
  receivedQuestion = 'received_question',
  waitingForTeamAnswer = 'waiting_for_team_answer',
  awardingPoints = 'awarding_points',
  pointsAdded = 'points_added',
  announcingResults = 'announcing_results'
}

export enum GameRound {
  openEnded = 'open-ended',
  possibleAnswers = 'possible_answers',
  cluesAndAnswers = 'clues_and_answers',
  linkedCategories = 'linked_category',
  partIdentification = 'part_identification',
  fillInBlank = 'fill_in_blank',
  pictureBoard = 'picture_board'
}

export interface TeamAndPoints {
  teamName: string;
  points: number;
}

export interface AcceptableAnswer {
  clue?: string;
  answerText: string;
  points: number;
};

type GroupedAcceptableAnswers = { [key: string]: AcceptableAnswer[] };
export type GroupedAcceptableAnswersInGame = { [key: string]: AcceptableAnswerInGame[] };

export type AcceptableOrGroupedAcceptableAnswers = AcceptableAnswer[] | GroupedAcceptableAnswers;
export type AcceptableOrGroupedAcceptableAnswersInGame = AcceptableAnswerInGame[] | GroupedAcceptableAnswersInGame;

export function isGroupedAcceptableAnswers(possibleAnswers: AcceptableOrGroupedAcceptableAnswers): possibleAnswers is GroupedAcceptableAnswers {
  return !Array.isArray(possibleAnswers);
}

type QuestionTag = 'Geography' | 'Music' | 'Words' | 'Currencies' | 'Chemistry' | 'Political leaders' | 'Nature' | 'One-word association' | 'Names' | 'Food & drinks' | "Space" | "Animals" | "Art" | "Fashion" | "Celebrities" | "Literature";

export interface Question {
  questionText: string;
  acceptableAnswers: AcceptableOrGroupedAcceptableAnswers;
  explanation?: string;
  tags?: QuestionTag[];
}

export type AcceptableAnswerInGame = (AcceptableAnswer & {
  answered: boolean;
});

export interface QuestionInGame extends Question {
  acceptableAnswers: AcceptableOrGroupedAcceptableAnswersInGame;
}

export interface Game {
  id: string;
  gameStatus: GameStatus;
  teamsAndPoints?: TeamAndPoints[];
  questionStatus?: QuestionStatus;
  round?: GameRound;
  currentQuestion?: {
    questionInRound: number;
    question: QuestionInGame;
    answeredTeams: string[];
    orderedTeamsLeftToAnswer?: string[];
    lastAnswer?: string;
    pass: number;
  }
}

export const NON_VERIFIED_ANSWER = 'NON-VERIFIED-ANSWER';
export const NO_OR_INVALID_ANSWER = 'NO-OR-INVALID-ANSWER';
