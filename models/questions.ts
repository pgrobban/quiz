import { GameRound, Question } from "./types";

const questions: { [key in GameRound]: Question[] } = {
  "open-ended": [
    {
      questionText: "US states ending in 'A'",
      possibleAnswers: [
        { answerText: "Alabama", points: 53 },
        { answerText: "Alaska", points: 40 },
        { answerText: "Arizona", points: 35 },
        { answerText: 'California', points: 62 },
        { answerText: 'Florida', points: 39 },
        { answerText: 'Georgia', points: 62 },
        { answerText: 'Indiana', points: 9 },
        { answerText: 'Iowa', points: 16 },
        { answerText: 'Louisiana', points: 8 },
        { answerText: 'Minnesota', points: 5 },
        { answerText: 'Montana', points: 9 },
        { answerText: 'Nebraska', points: 2 },
        { answerText: 'Nevada', points: 23 },
        { answerText: 'North Carolina', points: 12 },
        { answerText: 'North Dakota', points: 8 },
        { answerText: 'Oklahoma', points: 15 },
        { answerText: 'Pennsylvania', points: 3 },
        { answerText: 'South Carolina', points: 10 },
        { answerText: 'South Dakota', points: 3 },
        { answerText: 'Virginia', points: 14 },
        { answerText: 'West Virginia', points: 5 }
      ],
    },
    {
      questionText: "Countries finishing last in Eurovision Song Contest",
      possibleAnswers: [
        { answerText: "A", points: 70 },
        { answerText: "B", points: 23 },
      ],
    },
  ],
  clues_and_answers: [
    {
      questionText: "Monkeys",
      possibleAnswers: [
        {
          clue: "In slang terminology, a monkey refers to this amount of sterling",
          answerText: "£500",
          points: 10,
        },
        {
          clue: "Alternative name of the Chinese novel by Wu Cheng'en that is sometimes known simply as 'Monkey'",
          answerText: "Journey to the West",
          points: 0,
        },
        {
          clue: "The wicked witch of the west sends flying monkeys to kidnap Dorothy in this 1939 film",
          answerText: "The Wizard of Oz",
          points: 67,
        },
        {
          clue: "Australian musician who had a 2019 UK number 1 single with 'Dance Monkey'",
          answerText: "Tones and I",
          points: 2,
        },
        {
          clue: "Marcel was the name of a pet monkey belonging to this character in 'Friends'",
          answerText: "Ross",
          points: 10,
        },
      ],
    },
    {
      questionText: "Milk",
      possibleAnswers: [
        {
          clue: "Egyptian queen famously said to have taken regular baths in donkey milk",
          answerText: "Cleopatra",
          points: 72,
        },
        {
          clue: "Carbohydrate sometimes called milk sugar that comprises 2-8% of the milk of all mammals",
          answerText: "Lactose",
          points: 25,
        },
        {
          clue: "Country represented by the group Milk and Honey that won the 1979 Eurovision Song Contest with 'Hallelujah'",
          answerText: "Israel",
          points: 7,
        },
        {
          clue: "French scientist who developed the process that bears his name in which milk is heated to kill bacteria",
          answerText: "Louis Pasteur",
          points: 38,
        },
        {
          clue: "Plastic bottles of semi-skimmed milk in the UK typically has this colour on top or label OR packages of 'Mellanmjölk' in Sweden",
          answerText: "Green",
          points: 75,
        },
      ],
    },
  ],
  linked_category: [
    {
      questionText: "LA1",
      possibleAnswers: [
        { answerText: "A", points: 70 },
        { answerText: "B", points: 23 },
      ],
    },
  ],
  part_identification: [
    {
      questionText: "PI1",
      possibleAnswers: [
        { answerText: "A", points: 70 },
        { answerText: "B", points: 23 },
      ],
    },
  ],
  possible_answers: [
    {
      questionText: "Picasso Paintings",
      possibleAnswers: [
        {
          clue: "Cervantes",
          answerText: "X",
          points: 100,
        },
        {
          clue: "Woman With Pears",
          answerText: "Woman With Pears",
          points: 0,
        },
        {
          clue: "The Modern Lovers",
          answerText: "X",
          points: 100,
        },
        {
          clue: "The Accordionist",
          answerText: "The Accordionist",
          points: 0,
        },
        {
          clue: "Science and Charity",
          answerText: "Science and Charity",
          points: 1,
        },
        {
          clue: "Les Demoiselles d'Avignon",
          answerText: "Les Demoiselles d'Avignon",
          points: 1,
        },
      ],
    },
  ],
  fill_in_blank: [
    {
      questionText: "'Best Original Song' Oscar winners",
      possibleAnswers: [
        {
          clue: "A Whole New __",
          answerText: "A Whole New World",
          points: 78,
        },
        {
          clue: "__ River",
          answerText: "Moon River",
          points: 49,
        },
        {
          clue: "Over the __",
          answerText: "Over the Rainbow",
          points: 74,
        },
        {
          clue: "Let __ Go",
          answerText: "Let It Go",
          points: 58,
        },
        {
          clue: "Talk to the __",
          answerText: "Talk to the Animals",
          points: 25,
        },
      ],
    },
    {
      questionText: "Space abbreviations",
      possibleAnswers: [
        {
          clue: "Low __ Orbit",
          answerText: "Low Earth Orbit",
          points: 23,
        },
        {
          clue: "__ Aerial Vehicle",
          answerText: "Unmanned Aerial Vehicle",
          points: 10,
        },
        {
          clue: "__ Space Station",
          answerText: "International Space Station",
          points: 60,
        },
        {
          clue: "Let __ Go",
          answerText: "Let It Go",
          points: 58,
        },
        {
          clue: "__ Express",
          answerText: "Mars Express",
          points: 8,
        },
        {
          clue: "Hubble Space __",
          answerText: "Hubble Space Telescope",
          points: 49,
        },
      ],
    },
  ],
};

export default questions;
