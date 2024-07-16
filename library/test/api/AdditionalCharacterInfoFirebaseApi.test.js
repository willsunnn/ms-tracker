const lib = require("../../lib/api/index");

// Test reboot with regular name
test("fetch 3rd party call - GelatoShine", async () => {
  // Function under test
  const searchResult = await lib.searchInfoFrom3rdParty("gelatoshine", "na");

  expect(searchResult.ranks.length).toBe(1);
  const character = searchResult.ranks[0];
  expect(character.characterName).toBe("GelatoShine");
  expect(character.level).toBeDefined()
  expect(character.characterImgURL).toBeDefined()
  expect(character.jobName).toBe("Magician");
  expect(character.jobDetail).toBe(32);
  expect(character.worldName).toBe("Kronos");
});

// Test reboot with name with accents
test("fetch 3rd party call - nùms", async () => {
  // Function under test
  const searchResult = await lib.searchInfoFrom3rdParty("nùms", "na");

  expect(searchResult.ranks.length).toBe(1);
  const character = searchResult.ranks[0];
  expect(character.characterName).toBe("nùms");
  expect(character.level).toBeDefined()
  expect(character.characterImgURL).toBeDefined()
  expect(character.jobName).toBe("Night Walker");
  expect(character.jobDetail).toBe(12);
  expect(character.worldName).toBe("Kronos");
});

// Test Reg Server with regular name
test("fetch 3rd party call - Niru", async () => {
  // Function under test
  const searchResult = await lib.searchInfoFrom3rdParty("Niru", "na");

  expect(searchResult.ranks.length).toBe(1);
  const character = searchResult.ranks[0];
  expect(character.characterName).toBe("Niru");
  expect(character.level).toBeDefined();
  expect(character.characterImgURL).toBeDefined()
  expect(character.jobName).toBe("Magician");
  expect(character.jobDetail).toBe(32);
  expect(character.worldName).toBe("Aurora");
});

// Test EU
test("fetch 3rd party call - Nerf", async () => {
  // Function under test
  const searchResult = await lib.searchInfoFrom3rdParty("Nerf", "eu");

  expect(searchResult.ranks.length).toBe(1);
  const character = searchResult.ranks[0];
  expect(character.characterName).toBe("Nerf");
  expect(character.level).toBeDefined();
  expect(character.characterImgURL).toBeDefined()
  expect(character.jobName).toBe("Pirate");
  expect(character.jobDetail).toBe(12);
  expect(character.worldName).toBe("Luna");
});


// Test Class Parsing

test("Can parse class from job details", async () => {
  const testCases = [
    ["Dash", "Hero"],
    ["Zerk", "Dark Knight"],
    ["KeyPaladin", "Paladin"],
    ["Niru", "Bishop"],
    ["Snøwed", "Ice/Lightning Archmage"],
    ["Comet", "Fire/Poison Archmage"],
    ["MisaoMaki", "Shadower"],
    ["iNoBlades", "Night Lord"],
    ["Gurbo", "Blade Master"],
    ["Altos", "Marksman"],
    ["Smartcloud", "Bowmaster"],
    ["Naicha", "Pathfinder"],
    ["MulletPirate", "Buccaneer"],
    ["Hatim", "Corsair"],
    ["TopGman", "Cannon Master"],
    ["Jegito", "Dawn Warrior"],
    ["Slime", "Blaze Wizard"],
    ["WolfandLamb", "Wind Archer"],
    ["Shapaz", "Night Walker"],
    ["Tecklo", "Thunder Breaker"],
    ["iaba", "Mihile"],
    ["Ellucidate", "Demon Slayer"],
    ["DonutChief", "Battle Mage"],
    ["Huyz", "Wild Hunter"],
    ["HowsToast", "Mechanic"],
    ["maindeal", "Xenon"],
    ["Pheaktra", "Demon Avenger"],
    ["jopfjea", "Blaster"],
    ["AranBhav", "Aran"],
    ["Leløuch", "Evan"],
    ["Fairy", "Mercedes"],
    ["Suzuka", "Phantom"],
    ["Lapy", "Luminous"],
    ["M0onShad3", "Shade"],
    ["Layouts", "Kaiser"],
    ["idoI", "Angelic Buster"],
    ["Wrathlor", "Cadena"],
    ["Virtuoso", "Kain"],
    ["Hollow", "Illium"],
    ["ArkXu", "Ark"],
    ["Anime", "Adele"],
    ["SpIooki", "Khali"],
    ["OktoAeon", "Hayato"],
    ["Monk", "Kanna"],
    ["ponf", "Lara"],
    ["Kraane", "Hoyoung"],
    ["WhitexKnight", "Zero"],
    ["Wall", "Kinesis"],
    ["Risporia", "Lynn"],
  ]

  // Check each test case
  await Promise.all(
      testCases.map(async (example) => {
      const [name, mapleClass] = example
      const result = await lib.fetchAndTransform(name, "na")
      expect(result.class).toBe(mapleClass)
    })
  )

  // There are currently 49 playable classes
  // 52 in the enum set. Beast Tamer, Jett and Unknown are omitted cases
  expect(new Set(testCases.map((tuple) => tuple[1])).size).toBe(49);
});