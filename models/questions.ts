import { GameRound, Question } from "./types";

const questions: { [key in GameRound]: Question[] } = {
  "open-ended": [
    {
      questionText: "US states ending in 'A'",
      possibleAnswers: [
        { answerText: "Alabama", points: 53 },
        { answerText: "Alaska", points: 40 },
        { answerText: "Arizona", points: 35 },
        { answerText: "California", points: 62 },
        { answerText: "Florida", points: 39 },
        { answerText: "Georgia", points: 62 },
        { answerText: "Indiana", points: 9 },
        { answerText: "Iowa", points: 16 },
        { answerText: "Louisiana", points: 8 },
        { answerText: "Minnesota", points: 5 },
        { answerText: "Montana", points: 9 },
        { answerText: "Nebraska", points: 2 },
        { answerText: "Nevada", points: 23 },
        { answerText: "North Carolina", points: 12 },
        { answerText: "North Dakota", points: 8 },
        { answerText: "Oklahoma", points: 15 },
        { answerText: "Pennsylvania", points: 3 },
        { answerText: "South Carolina", points: 10 },
        { answerText: "South Dakota", points: 3 },
        { answerText: "Virginia", points: 14 },
        { answerText: "West Virginia", points: 5 },
      ],
    },
    {
      questionText: "Countries finishing last in Eurovision Song Contest",
      possibleAnswers: [
        { answerText: "A", points: 70 },
        { answerText: "B", points: 23 },
      ],
    },
    {
      questionText: "Capital cities of Europe",
      possibleAnswers: [
        { answerText: "Amsterdam", points: 37 },
        { answerText: "Andorra La Vella", points: 1 },
        { answerText: "Ankara", points: 1 },
        { answerText: "Baku", points: 0 },
        { answerText: "Belgrade", points: 4 },
        { answerText: "Berlin", points: 62 },
        { answerText: "Bern", points: 11 },
        { answerText: "Bratislava", points: 4 },
        { answerText: "Brussels", points: 42 },
        { answerText: "Bucharest", points: 4 },
        { answerText: "Budapest", points: 14 },
        { answerText: "Amsterdam", points: 37 },
        { answerText: "Amsterdam", points: 37 },
        { answerText: "Amsterdam", points: 37 },
        { answerText: "Amsterdam", points: 37 },
        { answerText: "Amsterdam", points: 37 },
        { answerText: "Amsterdam", points: 37 },
        { answerText: "Amsterdam", points: 37 },
        { answerText: "Amsterdam", points: 37 },
        { answerText: "Amsterdam", points: 37 },
      ],
    },
    {
      questionText:
        "Any country (other than UK) that uses any of the following currencies: franc, peso, pound, rupee, shilling",
      explanation: "",
      possibleAnswers: [
        { answerText: "Benin", points: 0 },
        { answerText: "Burkina Faso", points: 0 },
        { answerText: "Burundi", points: 0 },
        { answerText: "Cameroon", points: 0 },
        { answerText: "Central African Republic", points: 0 },
      ],
    },
    {
      questionText: "Countries that won Eurovision Song Contest",
      possibleAnswers: [
        { answerText: "Austria", points: 1 },
        { answerText: "Azerbaijan", points: 4 },
        { answerText: "Belgium", points: 1 },
      ],
    },
    {
      questionText: "Words ending with -oo",
      explanation:
        "We are looking for any word that has its own entry in the 'Oxford Dictionary of English' ending with the letters 'oo'. As usual, we will not accept acronyms, proper nouns, trademarks, or hyphenated words. Nor will we accept any words marked as being 'offensive' by the dictionary.",
      possibleAnswers: [
        { answerText: "Aloo", points: 0 },
        { answerText: "Ballyhoo", points: 0 },
        { answerText: "Bamboo", points: 0 },
        { answerText: "Bazoo", points: 0 },
        { answerText: "Boo", points: 18 },
        { answerText: "Boogaloo", points: 0 },
        { answerText: "Boohoo", points: 0 },
        { answerText: "Broo", points: 0 },
        { answerText: "Buckaroo", points: 0 },
        { answerText: "Bugaboo", points: 0 },
      ],
    },
    {
      questionText: "US states smaller than England",
      explanation:
        "We are looking for any of the twenty-two US states that are smaller than England in terms of total land area. We are only counting land area, so are not including water areas a state may possess including inland, coastal, Great Lakes, and territorial waters. To give you an idea, the smallest state that is larger than the total land area of England is Alabama, so we're essentially looking for any US state smaller than Alabama.",
      possibleAnswers: [
        { answerText: "Connecticut", points: 15 },
        { answerText: "Delaware", points: 9 },
        { answerText: "Hawaii", points: 30 },
        { answerText: "Indiana", points: 3 },
        { answerText: "Kentucky", points: 7 },
        { answerText: "Louisiana", points: 5 },
        { answerText: "Maine", points: 18 },
        { answerText: "Maryland", points: 11 },
        { answerText: "Hawaii", points: 30 },
        { answerText: "Connecticut", points: 15 },
        { answerText: "Delaware", points: 9 },
        { answerText: "Hawaii", points: 30 },
        { answerText: "Connecticut", points: 15 },
        { answerText: "Delaware", points: 9 },
        { answerText: "Hawaii", points: 30 },
        { answerText: "Connecticut", points: 15 },
        { answerText: "Delaware", points: 9 },
        { answerText: "Hawaii", points: 30 },
        { answerText: "Connecticut", points: 15 },
        { answerText: "Delaware", points: 9 },
        { answerText: "Hawaii", points: 30 },
      ],
    },
  ],
  clues_and_answers: [
    {
      questionText: "Monkeys",
      possibleAnswers: [
        {
          clue: "In slang terminology, a 'monkey' refers to this amount of sterling",
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
          points: 14,
        },
        {
          clue: "Marcel was the name of a pet monkey belonging to this character in 'Friends'",
          answerText: "Ross",
          points: 10,
        },
      ],
    },
    {
      questionText: "Famous Richards",
      possibleAnswers: [
        {
          clue: "Author of 'The God Delusion'",
          answerText: "Richard Dawkins",
          points: 7,
        },
        {
          clue: "Leading actor who appeared in 'Pretty Woman'",
          answerText: "Richard Gere",
          points: 64,
        },
        {
          clue: "German composer of 'Ride of the Valkyries'",
          answerText: "Richard Wagner",
          points: 25,
        },
        {
          clue: "Former 'Top Gear' and current 'Grand Tour' presenter",
          answerText: "Richard Hammond",
          points: 37,
        },
        {
          clue: "Actor who starred in 'Close Encounters of The Third Kind'",
          answerText: "Alexander Graham Bell",
          points: 21,
        },
        {
          clue: "President of the United States 1969-74",
          answerText: "Nixon",
          points: 51,
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
    {
      questionText: "Philosophers and their first names",
      possibleAnswers: [
        {
          clue: "N. Chomsky (1928)",
          answerText: "Noah",
          points: 17,
        },
        {
          clue: "T. Aquinas (1225)",
          answerText: "Thomas",
          points: 33,
        },
        {
          clue: "F. Bacon (1561)",
          answerText: "Francis",
          points: 62,
        },
        {
          clue: "L. Wittgenstein (1889)",
          answerText: "Ludwig",
          points: 9,
        },
        {
          clue: "B. Russell (1872)",
          answerText: "Bertrand",
          points: 29,
        },
        {
          clue: "R. Descartes (1596)",
          answerText: "René",
          points: 26,
        },
      ],
    },
    {
      questionText: "Philosophers and their first names (II)",
      possibleAnswers: [
        {
          clue: "J-P. Sartre (1905)",
          answerText: "Jean-Paul",
          points: 48,
        },
        {
          clue: "B. Pascal (1623)",
          answerText: "Blaise",
          points: 12,
        },
        {
          clue: "F. Nietzche",
          answerText: "Friedrich",
          points: 27,
        },
        {
          clue: "A. Rand (1905)",
          answerText: "Ayn",
          points: 4,
        },
        {
          clue: "J. Bentham (1748)",
          answerText: "Francis",
          points: 8,
        },
        {
          clue: "K. Marx (1818)",
          answerText: "Karl",
          points: 91,
        },
      ],
    },
    {
      questionText: "People named Alex",
      explanation:
        "We are looking for famous people, past and present - each person commonly known by a first name that could be shortened to 'Alex'. We would like you to tell us who they are (full name).",
      possibleAnswers: [
        {
          clue: "Widely credited as the 'inventor' of the telephone",
          answerText: "Alexander Graham Bell",
          points: 85,
        },
        {
          clue: "Frontman of the Arctic Monkeys",
          answerText: "Alex Turner",
          points: 7,
        },
        {
          clue: "Became manager of Manchester United in 1986",
          answerText: "Alex Ferguson",
          points: 75,
        },
        {
          clue: "Voice of Family Guy's 'Lois Griffin'",
          answerText: "Alex Borstein",
          points: 0,
        },
        {
          clue: "Scottish bacteriologist who discovered penicillin",
          answerText: "Alexander Fleming",
          points: 40,
        },
      ],
    },
    {
      questionText: "Wines and their regions",
      explanation:
        "The following are all wines or wine regions. We want to know the name of the countries with which they are the most associated.",
      possibleAnswers: [
        {
          clue: "Champagne",
          answerText: "France",
          points: 84,
        },
        {
          clue: "Stellenbosch",
          answerText: "South Africa",
          points: 9,
        },
        {
          clue: "Dao Valley",
          answerText: "Portugal",
          points: 4,
        },
        {
          clue: "Chianti",
          answerText: "Italy",
          points: 62,
        },
        {
          clue: "Hunter Valley",
          answerText: "Australia",
          points: 17,
        },
        {
          clue: "Retsina",
          answerText: "France",
          points: 32,
        },
      ],
    },
    {
      questionText: "Wines and their regions (II)",
      explanation:
        "The following are all wines or wine regions. We want to know the name of the countries with which they are the most associated.",
      possibleAnswers: [
        {
          clue: "Sancerre",
          answerText: "France",
          points: 36,
        },
        {
          clue: "Barolo",
          answerText: "Italy",
          points: 15,
        },
        {
          clue: "Liebfraumilch",
          answerText: "Germany",
          points: 80,
        },
        {
          clue: "Mendoza",
          answerText: "Argentina",
          points: 5,
        },
        {
          clue: "Tokaji",
          answerText: "Hungary",
          points: 7,
        },
        {
          clue: "Rioja",
          answerText: "Spain",
          points: 46,
        },
      ],
    },
    {
      questionText: "Studio albums by The Beatles",
      explanation:
        "We will show you five sets of initials that represent titles of some studio albums released by The Beatles. We would like you to tell us what the initials stand for.",
      possibleAnswers: [
        {
          clue: "R",
          answerText: "Revolver",
          points: 36,
        },
        {
          clue: "BFS",
          answerText: "Beatles For Sale",
          points: 7,
        },
        {
          clue: "MMT",
          answerText: "Magical Mystery Tour",
          points: 16,
        },
        {
          clue: "WTB",
          answerText: "With The Beatles",
          points: 11,
        },
        {
          clue: "SPLHCB",
          answerText: "Sgt Pepper's Lonely Hearts Club Band",
          points: 63,
        },
      ],
    },
    {
      questionText: "Literary villains and their works of fiction",
      explanation:
        "In which novel or play do these villains feature?",
      possibleAnswers: [
        {
          clue: "Mrs. Davies",
          answerText: "Rebecca",
          points: 10,
        },
        {
          clue: "Big Brother",
          answerText: "Nineteen eighty-four",
          points: 36,
        },
        {
          clue: "Mrs. Trunchbull",
          answerText: "Matilda",
          points: 53,
        },
        {
          clue: "Bill Sikes",
          answerText: "Oliver Twist",
          points: 31,
        },
        {
          clue: "George Wickham",
          answerText: "Pride and Prejudice",
          points: 12,
        },
        {
          clue: "Milady de Winter",
          answerText: "The Three Musketeers",
          points: 6,
        },
      ],
    },
    {
      questionText: "Famous bass players",
      explanation: "We are about to show you a list of 14 bass players. We would like you to tell us the name of the band of which they were members, with which they had their greates chart success.",
      possibleAnswers: [
        {
          clue: "Sting",
          answerText: "The Police",
          points: 53,
        },
        {
          clue: "John Deacon",
          answerText: "Queen",
          points: 12,
        },
        {
          clue: "Guy Berryman",
          answerText: "Coldplay",
          points: 4,
        },
        {
          clue: "Gene Simmons",
          answerText: "Kiss",
          points: 28,
        },
        {
          clue: "Adam Clayton",
          answerText: "U2",
          points: 18,
        },
        {
          clue: "Mike Dirnt",
          answerText: "Green Day",
          points: 3,
        },
      ],
    },
    {
      questionText: "Famous bass players (II)",
      possibleAnswers: [
        {
          clue: "Geddy Lee",
          answerText: "Rush",
          points: 6,
        },
        {
          clue: "Paul McCartney",
          answerText: "The Beatles",
          points: 80,
        },
        {
          clue: "John Paul Jones",
          answerText: "Led Zeppelin",
          points: 9,
        },
        {
          clue: "Roger Waters",
          answerText: "Pink Floyd",
          points: 22,
        },
        {
          clue: "John Entwistle",
          answerText: "The Who",
          points: 25,
        },
        {
          clue: "Christopher Wolstenholme",
          answerText: "Muse",
          points: 1,
        },
        {
          clue: "Flea",
          answerText: "Red Hot Chili Peppers",
          points: 12,
        },
      ],
    }
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
          answerText: "Cervantes",
          points: 100,
        },
        {
          answerText: "Woman With Pears",
          points: 0,
        },
        {
          answerText: "The Modern Lovers",
          points: 100,
        },
        {
          answerText: "The Accordionist",
          points: 0,
        },
        {
          answerText: "Science and Charity",
          points: 1,
        },
        {
          answerText: "Les Demoiselles d'Avignon",
          points: 1,
        },
      ],
    },
    {
      questionText: "Fictional Bears",
      explanation:
        "The correct answers here are all fictional bears featured in books, comics, films and television. And all the incorrect answers are not bears at all.",
      possibleAnswers: [
        {
          answerText: "Fozzie",
          points: 3,
        },
        {
          answerText: "Yogi",
          points: 63,
        },
        {
          answerText: "Baloo",
          points: 16,
        },
        {
          answerText: "Columbus",
          points: 100,
        },
        {
          answerText: "Superted",
          points: 2,
        },
        {
          answerText: "Rupert",
          points: 49,
        },
        {
          answerText: "Shardik",
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
