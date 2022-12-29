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
    questionText: 'Monkeys',
    possibleAnswers: [{ 
      clue: 'In slang terminology, a monkey refers to this amount of sterling',
      answerText: '£500', 
      points: 10 
    }, {
      clue: 'Alternative name of the Chinese novel by Wu Cheng\'en that is sometimes known simply as \'Monkey\'',
      answerText: 'Journey to the West', 
      points: 0
    }, {
      clue: 'The wicked witch of the west sends flying monkeys to kidnap Dorothy in this 1939 film',
      answerText: 'The Wizard of Oz',
      points: 67
    }, {
      clue: 'Australian musician who had a 2019 UK number 1 single with \'Dance Monkey\'',
      answerText: 'Tones and I',
      points: 2
    }, {
      clue: 'Marcel was the name of a pet monkey belonging to this character in \'Friends\'',
      answerText: 'Ross',
      points: 10
    }]
  }]
};

export default questions;