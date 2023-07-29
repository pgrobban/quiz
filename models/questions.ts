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
    {
      questionText: "Sister acts",
      explanation:
        "We are looking for act which is either a group or duo that featured the word 'sister' or 'sisters' and has had a UK Top 40 hit up to the start of May 2012.",
      possibleAnswers: [
        { answerText: "Beverley Sisters", points: 28 },
        { answerText: "De Castro Sisters", points: 0 },
        { answerText: "Hannah & Her Sisters", points: 0 },
        { answerText: "Kaye Sisters", points: 2 },
        { answerText: "The McGuire Sisters", points: 0 },
        { answerText: "Scissor Sisters", points: 0 },
        { answerText: "Shakespears Sister", points: 12 },
        { answerText: "Sister 2 Sister", points: 0 },
        { answerText: "Sister Sledge", points: 43 },
        { answerText: "Supersister", points: 0 },
        { answerText: "Swing Out Sister", points: 8 },
        { answerText: "The Dale Sisters", points: 0 },
        { answerText: "The England Sisters", points: 0 },
        { answerText: "The Pointer Sisters", points: 20 },
        { answerText: "The Shepherd Sisters", points: 0 },
        { answerText: "The Sisters of Mercy", points: 10 },
        { answerText: "The Surprise Sisters", points: 0 },
        { answerText: "Twisted Sister", points: 10 },
      ],
    },
    {
      questionText: "Surnames of presidents that end in 'N'",
      explanation:
        "We are looking for surnames of any US Presidents which end in the letter 'n', prior to Barack Obama. Where more than one President shared the same surname, that surname will only be accepted once..",
      possibleAnswers: [
        { answerText: "Buchanan", points: 1 },
        { answerText: "Clinton", points: 47 },
        { answerText: "Harrison", points: 1 },
        { answerText: "Jackson", points: 5 },
        { answerText: "Jefferson", points: 15 },
        { answerText: "Johnson", points: 18 },
        { answerText: "Lincoln", points: 48 },
        { answerText: "Madison", points: 1 },
        { answerText: "Nixon", points: 75 },
        { answerText: "Reagan", points: 33 },
        { answerText: "Truman", points: 10 },
        { answerText: "Van Buren", points: 0 },
        { answerText: "Washington", points: 30 },
        { answerText: "Wilson", points: 7 },
      ],
    },
    {
      questionText: "Berries",
      explanation:
        "We are looking for the names of any plant, or fruit of a plant, that has its own entry in the Oxford Dictionary of English, whose name ends in the letters 'B-E-R-R-Y'. We are only looking for one-word answers. So we will not accept 'Goji berry' for example. The berries do not have to be edible ones. Obviously we will not be accepting 'berry' itself.",
      possibleAnswers: [
        { answerText: "Baneberry", points: 0 },
        { answerText: "Barberry", points: 1 },
        { answerText: "Bayberry", points: 0 },
        { answerText: "Bearberry", points: 2 },
        { answerText: "Bilberry", points: 8 },
        { answerText: "Blackberry", points: 84 },
        { answerText: "Blaeberry", points: 3 },
        { answerText: "Blueberry", points: 73 },
        { answerText: "Boysenberry", points: 3 },
        { answerText: "Bunchberry", points: 0 },
        { answerText: "Candleberry", points: 0 },
        { answerText: "Checkerberry", points: 0 },
        { answerText: "Chinaberry", points: 0 },
        { answerText: "Chokeberry", points: 0 },
        { answerText: "Cloudberry", points: 5 },
        { answerText: "Coralberry", points: 0 },
        { answerText: "Cowberry", points: 0 },
        { answerText: "Cranberry", points: 28 },
        { answerText: "Crowberry", points: 1 },
        { answerText: "Dewberry", points: 1 },
        { answerText: "Dogberry", points: 0 },
        { answerText: "Elderberry", points: 16 },
        { answerText: "Farkleberry", points: 0 },
        { answerText: "Fenberry", points: 0 },
        { answerText: "Gallberry", points: 0 },
        { answerText: "Gooseberry", points: 61 },
        { answerText: "Hackberry", points: 0 },
        { answerText: "Huckleberry", points: 0 },
        { answerText: "Inkberry", points: 0 },
        { answerText: "Juneberry", points: 0 },
        { answerText: "Lingonberry", points: 2 },
        { answerText: "Loganberry", points: 60 },
        { answerText: "Mulberry", points: 6 },
        { answerText: "Naseberry", points: 0 },
        { answerText: "Partridgeberry", points: 0 },
        { answerText: "Peaberry", points: 0 },
        { answerText: "Raspberry", points: 87 },
        { answerText: "Salmonberry", points: 0 },
        { answerText: "Serviceberry", points: 0 },
        { answerText: "Silverberry", points: 0 },
        { answerText: "Snowberry", points: 1 },
        { answerText: "Soapberry", points: 0 },
        { answerText: "Squashberry", points: 0 },
        { answerText: "Strawberry", points: 92 },
        { answerText: "Tayberry", points: 8 },
        { answerText: "Thimbleberry", points: 0 },
        { answerText: "Veitchberry", points: 0 },
        { answerText: "Waxberry", points: 0 },
        { answerText: "Whortleberry", points: 4 },
        { answerText: "Wineberry", points: 1 },
        { answerText: "Winterberry", points: 0 },
        { answerText: "Wolfberry", points: 3 },
        { answerText: "Youngberry", points: 0 },
      ],
    },
    {
      questionText: "Cold War Leaders",
      explanation:
        "We are going to show you five countries (along with the title of their leader) - we would like you to name any leader of any of these countries throughout the Cold War. For avoidance of doubt, the 'Cold War' took place between 1946-1989 (inclusive). We will not accept interim leaders or leaders of provisional governments. USA (president). UK (Prime Minister). West Germany (Chancellor). USSR (Chairman or First Secretary of the Communist Party). France (President)",
      possibleAnswers: [
        { answerText: "Charles de Gaulle", points: 41 },
        { answerText: "François Mitterrand", points: 12 },
        { answerText: "Georges Pompidou", points: 5 },
        { answerText: "René Coty", points: 0 },
        { answerText: "Valéry Giscard d’Estaing", points: 5 },
        { answerText: "Vincent Auriol", points: 0 },
        { answerText: "Alec Douglas-Home", points: 10 },
        { answerText: "Anthony Eden", points: 21 },
        { answerText: "Clement Attlee", points: 20 },
        { answerText: "Edward Heath", points: 25 },
        { answerText: "Harold Macmillan", points: 29 },
        { answerText: "Harold Wilson", points: 40 },
        { answerText: "James Callaghan", points: 20 },
        { answerText: "Margaret Thatcher", points: 46 },
        { answerText: "Winston Churchill", points: 50 },
        { answerText: "Dwight D. Eisenhower", points: 16 },
        { answerText: "George H.W. Bush", points: 12 },
        { answerText: "Gerald Ford", points: 4 },
        { answerText: "Harry S. Truman", points: 8 },
        { answerText: "Jimmy Carter", points: 12 },
        { answerText: "John F. Kennedy", points: 37 },
        { answerText: "Lyndon B. Johnson", points: 11 },
        { answerText: "Richard Nixon", points: 19 },
        { answerText: "Ronald Reagan", points: 18 },
        { answerText: "Georgy Malenkov", points: 0 },
        { answerText: "Joseph Stalin", points: 23 },
        { answerText: "Konstantin Chernenko", points: 1 },
        { answerText: "Leonid Brezhnev", points: 10 },
        { answerText: "Mikhail Gorbachev", points: 12 },
        { answerText: "Nikita Khruschev", points: 29 },
        { answerText: "Yuri Andropov", points: 8 },
        { answerText: "Helmut Kohl", points: 11 },
        { answerText: "Helmut Schmidt", points: 2 },
        { answerText: "Konrad Adenauer", points: 11 },
        { answerText: "Kurt Georg Kiesinger", points: 0 },
        { answerText: "Ludwig Erhard", points: 0 },
        { answerText: "Willy Brandt", points: 14 },
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
      explanation: "In which novel or play do these villains feature?",
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
      explanation:
        "We are about to show you a list of 14 bass players. We would like you to tell us the name of the band of which they were members, with which they had their greates chart success.",
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
    },
    {
      questionText: "Islands of the world",
      explanation:
        "Here is a list of clues to well-known islands around the worlds. We would like you to tell us the name of the island described by each clue please. In the case of islands which are part of a country, we are looking for the name of the island itself rather than the name of the country, although some of the islands may be countries in their own right.",
      possibleAnswers: [
        {
          clue: "French island, birthplace of Napoleon Bonaparte",
          answerText: "Corsica",
          points: 18,
        },
        {
          clue: "Island which is divided between Indonesia, Malaysia and Brunei",
          answerText: "Borneo",
          points: 3,
        },
        {
          clue: "Largest island in the Mediterranean located at the tip of Italy",
          answerText: "Sicily",
          points: 35,
        },
        {
          clue: "Large island country near Africa, home to many species of lemur",
          answerText: "Madagascar",
          points: 21,
        },
        {
          clue: "One of the world's largest islands, part of the Kingdom of Denmark",
          answerText: "Greenland",
          points: 13,
        },
        {
          clue: "English name for the island of 'Rapa Nui', famed for its giant stone statues",
          answerText: "Easter Island",
          points: 28,
        },
      ],
    },
    {
      questionText: "Cover versions",
      explanation:
        "We are going to show you twelve pairs of artists. The second one of each pair has reached the Top 40 in the UK with a cover version of the first artist's song. We would like you to give us the name of the song. We have given you the year in which the cover version charted in brackets.",
      possibleAnswers: [
        {
          clue: "Paul McCartney and Wings/Guns N' Roses (1991)",
          answerText: "Live and Let Die",
          points: 13,
        },
        {
          clue: "The Bee Gees/Take That (1996)",
          answerText: "How Deep Is Your Love",
          points: 21,
        },
        {
          clue: "Bob Marley/Eric Clapton (1974)",
          answerText: "I Shot the Sheriff",
          points: 13,
        },
        {
          clue: "The Beatles/Joe Cocker (1968)",
          answerText: "With a Little Help From My Friends",
          points: 26,
        },
        {
          clue: "Otis Redding/Aretha Franklin (1967)",
          answerText: "Respect",
          points: 6,
        },
        {
          clue: "Neil Diamond/UB40 (1983)",
          answerText: "Red Red Wine",
          points: 25,
        },
      ],
    },
    {
      questionText: "Celebrities with double initials",
      explanation:
        "We are going to show you clues about actors and musicians, who all have first names and surnames that start with the same letter. We would like you to use the facts to try and name the celebrities. We want the names the celebrities are most commonly known by.",
      possibleAnswers: [
        {
          clue: "Model, married Richard Gere in 1991",
          answerText: "Cindy Crawford",
          points: 17,
        },
        {
          clue: "Born in Tennessee, sang 'Simply the Best' in 1989",
          answerText: "Tina Turner",
          points: 60,
        },
        {
          clue: "One-sixth of the 'Friends' main cast",
          answerText: "Courtney Cox",
          points: 20,
        },
        {
          clue: "Played Juliet in the 2003 film, 'Love Actually'",
          answerText: "Keira Knightley",
          points: 7,
        },
        {
          clue: "Creator, writer and star of the Austin Powers films",
          answerText: "Mike Myers",
          points: 38,
        },
        {
          clue: "Born 1986, star of 'Mean Girls'",
          answerText: "Lindsay Lohan",
          points: 21,
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
