import { GameRound, Question } from "./types";

const questions: { [key in GameRound]: Question[]} = {
  "open-ended": [{
    questionText: 'US states',
    possibleAnswers: [{ answerText: 'Alabama', points: 70 }, { answerText: 'Arizona', points: 23 }]
  }, {
    questionText: 'Countries finishing last in Eurovision Song Contest',
    possibleAnswers: [{ answerText: 'A', points: 70 }, { answerText: 'B', points: 23 }]
  }],
  clues_and_answers: [{
    questionText: 'CAA1',
    possibleAnswers: [{ answerText: 'A', points: 70 }, { answerText: 'B', points: 23 }]
  }, {
    questionText: 'CAA2',
    possibleAnswers: [{ answerText: 'A', points: 70 }, { answerText: 'B', points: 23 }]
  }],
  linked_category: [{
    questionText: 'LA1',
    possibleAnswers: [{ answerText: 'A', points: 70 }, { answerText: 'B', points: 23 }]
  }],
  part_identification: [{
    questionText: 'PI1',
    possibleAnswers: [{ answerText: 'A', points: 70 }, { answerText: 'B', points: 23 }]
  }],
  possible_answers: [{
    questionText: 'PA1',
    possibleAnswers: [{ answerText: 'A', points: 70 }, { answerText: 'B', points: 23 }]
  }]
};

export default questions;