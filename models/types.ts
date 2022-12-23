
export enum GameStatus {
  created = 'created',
  waitingForHost = 'waiting_for_host',
  inProgress = 'in_progress',
  ended = 'ended'
}

export enum QuestionStatus {
  waitingForQuestion = 'waiting_for_question',
  receivedQuestion = 'received_question',
  announcingResults = 'announcing_results'
}

interface TeamAndPoints {
  teamName: string;
  points: number;
}

export interface Game {
  id: string;
  gameStatus: GameStatus;
  teamsAndPoints?: TeamAndPoints[];
  questionStatus?: QuestionStatus;
}