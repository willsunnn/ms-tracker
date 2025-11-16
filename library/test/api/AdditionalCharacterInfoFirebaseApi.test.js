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
  expect(character.jobName).toBe("Bishop");
  expect(character.worldID).toBe(45);
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
  expect(character.worldID).toBe(45);
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
  expect(character.jobName).toBe("Bishop");
  expect(character.worldID).toBe(19);
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
  expect(character.jobName).toBe("Buccaneer");
  expect(character.worldID).toBe(30);
});


// Test Class Parsing

test("Can parse class from job details", async () => {
  const testCases = [
    ["Dash", "Hero"],
    ["Zerk", "Dark Knight"],
    ["KeyPaladin", "Paladin"],
    ["Niru", "Bishop"],
    ["lcey", "Arch Mage (I/L)"],
    ["Comet", "Arch Mage (F/P)"],
    ["MisaoMaki", "Shadower"],
    ["iNoBlades", "Night Lord"],
    ["Gurbo", "Blade Master"],
    ["Altos", "Marksman"],
    ["Smartcloud", "Bow Master"],
    ["Naicha", "Pathfinder"],
    ["MulletPirate", "Buccaneer"],
    ["Hatim", "Corsair"],
    ["TopGman", "Cannon Master"],
    ["Jegito", "Dawn Warrior"],
    ["Slime", "Blaze Wizard"],
    ["WolfandLamb", "Wind Archer"],
    ["Shapaz", "Night Walker"],
    ["Tecklo", "Thunder Breaker"],
    ["Gecko", "Mihile"],
    ["Ellucidate", "Demon Slayer"],
    ["DonutChief", "Battle Mage"],
    ["Huyz", "Wild Hunter"],
    ["HowsToast", "Mechanic"],
    ["NeXTH", "Xenon"],
    ["Pheaktra", "Demon Avenger"],
    ["Dare", "Blaster"],
    ["AranBhav", "Aran"],
    ["Leløuch", "Evan"],
    ["Fairy", "Mercedes"],
    ["Rïtuals", "Phantom"],
    ["Lapy", "Luminous"],
    ["M0onShad3", "Shade"],
    ["Layouts", "Kaiser"],
    ["idoI", "Angelic Buster"],
    ["Wrathlor", "Cadena"],
    ["Yuel", "Kain"],
    ["Hollow", "Illium"],
    ["ArkXu", "Ark"],
    ["Anime", "Adele"],
    ["SpIooki", "Khali"],
    ["OktoAeon", "Hayato"],
    ["Monk", "Kanna"],
    ["barkbarkbark", "Lara"],
    ["Kraane", "Hoyoung"],
    ["WhitexKnight", "Zero"],
    ["Wall", "Kinesis"],
    ["Risporia", "Lynn"],
    ["Öççú", "Mo Xuan"],
    ["YozoraAI", "Sia Astelle"],
    ["UsagiAkuma", "Ren"],
  ]

  // Check each test case
  await Promise.all(
      testCases.map(async (example) => {
      const [name, mapleClass] = example
      try {
        
        const result = await lib.fetchAndTransform(name, "na")
        expect(result.class).toBe(mapleClass)
      } catch (err) {
        console.error(`Failed fetching ${name}`)
        throw err
      }
    })
  )

  // There are currently 52 playable classes
  expect(new Set(testCases.map((tuple) => tuple[1])).size).toBe(52);
});