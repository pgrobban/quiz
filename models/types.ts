
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
  inProgress = 'in_progress',
  announcingResults = 'announcing_results'
}

export enum GameRound {
  openEnded = 'open-ended',
  possibleAnswers = 'possible_answers',
  cluesAndAnswers = 'clues_and_answers',
  linkedCategories = 'linked_category',
  partIdentification = 'part_identification'
}

export interface TeamAndPoints {
  teamName: string;
  points: number;
}

interface PossibleAnswer{
  answerText: string;
  points: number;
};

export type AnswerStatus = 'unanswered' | 'answered';

export interface Question {
  questionText: string;
  possibleAnswers: PossibleAnswer[];
}

export interface QuestionInGame extends Question {
  possibleAnswers: (PossibleAnswer & {
    status: AnswerStatus;
  })[];
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
    orderedTeamsLeftToAnswer?: string[]
  }
}