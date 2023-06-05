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
      console.log(game);
      expect(game.gameStatus).toBe(GameStatus.waitingForHost);
      expect(game.questionStatus).not.toBeDefined();
    })
  })

  describe('#requestSetActiveRound', () => {
    it('Should set the active round and question status to waiting for question', () => {
      const game: Game = {
        id: '123',
        gameStatus: GameStatus.waitingForHost
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
        gameStatus: GameStatus.waitingForHost,
        round: GameRound.openEnded,
        questionStatus: QuestionStatus.waitingForQuestion
      };
      gameHandler.getGameById = jest.fn((_: string) => game);
  
      gameHandler.requestSetActiveQuestion(game.id, 'US states ending in \'A\'');
      
      expect(game.currentQuestion?.question.possibleAnswers).toHaveLength(21);
      expect(game.currentQuestion?.questionInRound).toBe(1);
      expect(game.currentQuestion?.answeredTeams).toStrictEqual([]);
      expect(game.questionStatus).toBe(QuestionStatus.receivedQuestion);
    });
  })
});