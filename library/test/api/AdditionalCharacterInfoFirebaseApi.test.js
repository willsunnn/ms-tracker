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
    ["mushroomstéw", "Hero"],
    ["seafoodstéw", "Dark Knight"],
    ["beefstéw", "Paladin"],
    ["GelatoShine", "Bishop"],
    ["IcedJelló", "Arch Mage (I/L)"],
    ["HotJelló", "Arch Mage (F/P)"],
    ["yakítorí", "Shadower"],
    ["mángosago", "Night Lord"],
    ["somísomi", "Blade Master"],
    ["friedégg", "Marksman"],
    ["scrambledégg", "Bow Master"],
    ["poachedégg", "Pathfinder"],
    ["rùmraisin", "Buccaneer"],
    ["PíratesBooty", "Corsair"],
    ["roIdgold", "Cannon Master"],
    ["bìbìmbàp", "Dawn Warrior"],
    ["Buldàk", "Blaze Wizard"],
    ["kimbàp", "Wind Archer"],
    ["nùms", "Night Walker"],
    ["SolBreakerz", "Thunder Breaker"],
    ["HvnlyRstrctn", "Mihile"],
    ["NommyNoms", "Demon Slayer"],
    ["blackbeanz", "Battle Mage"],
    ["Jjámppong", "Wild Hunter"],
    ["meatbunz", "Mechanic"],
    ["AtomicSol", "Xenon"],
    ["pineapplezs", "Demon Avenger"],
    ["nòmz", "Blaster"],
    ["burritós", "Aran"],
    ["pápaya", "Evan"],
    ["affogatoshot", "Mercedes"],
    ["phantuwums", "Phantom"],
    ["nummynumz", "Luminous"],
    ["stráwberries", "Shade"],
    ["dragondrìnk", "Kaiser"],
    ["pinkdrìnk", "Angelic Buster"],
    ["baekjeøng", "Cadena"],
    ["raísingcanes", "Kain"],
    ["ønigirì", "Illium"],
    ["softseltzer", "Ark"],
    ["peanutbuttèr", "Adele"],
    ["samosá", "Khali"],
    ["bakédbeans", "Hayato"],
    ["beeflover", "Kanna"],
    ["hotpockéts", "Lara"],
    ["tófustew", "Hoyoung"],
    ["dúmpIings", "Zero"],
    ["búlgogi", "Kinesis"],
    ["mátchasoda", "Lynn"],
    ["málà", "Mo Xuan"],
    ["c6sia", "Sia Astelle"],
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