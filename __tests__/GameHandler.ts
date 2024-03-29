import GameHandler from "../controllers/GameHandler";
import { QuestionStatus } from "../models/types";
import { Game, GameStatus, GameRound } from "../models/types";

describe('#ClientGameHandler', () => {
  let gameHandler: GameHandler;
  
  beforeEach(() => {
    gameHandler = new GameHandler();
  });

  describe('#createNewGame', () => {
    it('Should add a new game to the existing array of games and status to be created', () => {
      gameHandler.createNewGame();
      const games = gameHandler.getGames();
      expect(games).toHaveLength(1);
      expect(games[0].gameStatus).toBe(GameStatus.created);
    })
  });

  describe('#startGame', () => {
    it('Should set the status of a game to waiting for host', () => {
      const game: Game = {
        id: '123',
        gameStatus: GameStatus.created
      };
      gameHandler.getGameById = jest.fn((_: string) => game);

      const teamNames = ['teamA', 'teamB'];
      gameHandler.startGame(game.id, teamNames);
      expect(game.gameStatus).toBe(GameStatus.waitingForHost);
      expect(game.questionStatus).not.toBeDefined();
    })
  });

  describe('#requestHostJoinGame', () => {
    it('Should set gameStatus to in progress and questionStatus to waiting for round', () => {
      const game: Game = {
        id: '123',
        gameStatus: GameStatus.created
      };
      gameHandler.getGameById = jest.fn((_: string) => game);

      gameHandler.requestHostJoinGame(game.id);
      expect(game.gameStatus).toBe(GameStatus.inProgress);
      expect(game.questionStatus).toBe(QuestionStatus.waitingForRound);
    });
  });

  describe('#requestSetActiveRound', () => {
    it('Should set the active round and question status to waiting for question', () => {
      const game: Game = {
        id: '123',
        gameStatus: GameStatus.inProgress
      };
      gameHandler.getGameById = jest.fn((_: string) => game);

      gameHandler.requestSetActiveRound(game.id, GameRound.openEnded);
      expect(game.round).toBe(GameRound.openEnded);
      expect(game.questionStatus).toBe(QuestionStatus.waitingForQuestion);
    })
  })

  describe('#requestSetActiveQuestion', () => {
    it('Should set some properties on game.currentQuestion and questionStatus', () => {
      const game: Game = {
        id: '123',
        gameStatus: GameStatus.inProgress,
        round: GameRound.openEnded,
        questionStatus: QuestionStatus.waitingForQuestion,
        teamsAndPoints: [{
          teamName: 'aaa',
          points: 0
        }]
      };
      gameHandler.getGameById = jest.fn((_: string) => game);
  
      gameHandler.requestSetActiveQuestion(game.id, 'US states ending in \'A\'');
      expect(game.currentQuestion?.question.acceptableAnswers).toHaveLength(21);
      expect(game.currentQuestion?.questionInRound).toBe(1);
      expect(game.currentQuestion?.answeredTeams).toHaveLength(0);
      expect(game.currentQuestion?.pass).toBe(1);
      expect(game.questionStatus).toBe(QuestionStatus.waitingForTeamAnswer);
    });
  })

  describe('#requestTeamAnswer', () => {
    it('Question was just received; should set the next teams to answer, and set the game status to waiting for team answer', () => {
      const game: Game = {
        id: '123',
        gameStatus: GameStatus.inProgress,
        teamsAndPoints: [{ teamName: 'teamA', points: 0 }, { teamName: 'teamB', points: 0 }],
        round: GameRound.openEnded,
        questionStatus: QuestionStatus.receivedQuestion,
        currentQuestion: {
          question: {
            questionText: 'Some question',
            acceptableAnswers: []
          },
          questionInRound: 1,
          answeredTeams: ['teamA', 'teamB'],
          pass: 1
        }
      };
      gameHandler.getGameById = jest.fn((_: string) => game);

      gameHandler.requestTeamAnswer(game.id);
      expect(game.gameStatus).toBe(GameStatus.inProgress);
      expect(game.questionStatus).toBe(QuestionStatus.waitingForTeamAnswer);
      expect(game.currentQuestion?.question.questionText).toBe('Some question');
      expect(game.currentQuestion?.questionInRound).toBe(1);
      expect(game.currentQuestion?.lastAnswer).not.toBeDefined();
      expect(game.currentQuestion?.answeredTeams).toHaveLength(0);
      expect(game.currentQuestion?.orderedTeamsLeftToAnswer).toHaveLength(2);
    });
  });
});