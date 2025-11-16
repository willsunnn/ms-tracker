/* eslint @typescript-eslint/no-redeclare: "off" */ // linter conflicts with zod usage documentation

import {z} from "zod";

export const Region = z.enum([
  "na",
  "eu",
]);
export type Region = z.infer<typeof Region>

export interface CharacterCacheKey {
  name: string,
  region: Region,
}
export const getCharacterCacheKey = (name: string, region: Region) => ({region, name: name.toLowerCase()});
export const cacheKeyToString = (key: CharacterCacheKey) => `${key.region}-${key.name.toLowerCase()}`;

export const MapleClass = z.enum([
  // Adventurers
  "Hero",
  "Dark Knight",
  "Paladin",
  "Bishop",
  "Arch Mage (F/P)",
  "Arch Mage (I/L)",
  "Night Lord",
  "Shadower",
  "Blade Master",
  "Bow Master",
  "Marksman",
  "Pathfinder",
  "Buccaneer",
  "Corsair",
  "Cannon Master",
  "Jett",
  // Cygnus Knights
  "Blaze Wizard",
  "Thunder Breaker",
  "Dawn Warrior",
  "Wind Archer",
  "Night Walker",
  "Mihile",
  // Resistance
  "Wild Hunter",
  "Battle Mage",
  "Mechanic",
  "Demon Slayer",
  "Demon Avenger",
  "Xenon",
  "Blaster",
  // Heroes
  "Aran",
  "Evan",
  "Mercedes",
  "Phantom",
  "Luminous",
  "Shade",
  // Sengoku
  "Kanna",
  "Hayato",
  // Nova
  "Kaiser",
  "Angelic Buster",
  "Cadena",
  "Kain",
  // Flora
  "Ark",
  "Illium",
  "Adele",
  "Khali",
  // Anima
  "Beast Tamer",
  "Hoyoung",
  "Lara",
  "Ren",
  // Other
  "Zero",
  "Kinesis",
  "Lynn",
  "Mo Xuan",
  "Sia Astelle",
  // Fallback
  "Unknown",
]);
export type MapleClass = z.infer<typeof MapleClass>;

// Cached data about a character
export const CharacterData = z.object({
  // Basic Character Information
  characterImageURL: z.string().nullable().default(null),
  class: MapleClass.default("Unknown").catch("Unknown"),
  region: Region.default("na"),
  name: z.string(),
  level: z.number().nullable().default(null),
});
export type CharacterData = z.infer<typeof CharacterData>

// Model response for the cached data
// a few extra fields, and i dont like their variable name case-ing
export const CachedCharacter = CharacterData.merge(z.object({
  key: z.string(),
  loweredName: z.string(),
  lastRetrievedTimestamp: z.number().optional(),
}));
export type CachedCharacter = z.infer<typeof CachedCharacter>;

export const defaultCachedCharacter = (key: CharacterCacheKey): CachedCharacter => ({
  key: cacheKeyToString(key),
  class: "Unknown",
  name: key.name,
  loweredName: key.name.toLowerCase(),
  region: key.region,
  level: null,
  characterImageURL: null,
});

// Model response for Calling 3rd party Api directly
export const ThirdPartyCharacterData = z.object({
  characterImgURL: z.string().optional(),
  characterName: z.string(),
  jobName: MapleClass,
  worldID: z.number().int().optional(),
  level: z.number().int().optional(),
  // There are other fields but we dont really need them
});
export type ThirdPartyCharacterData = z.infer<typeof ThirdPartyCharacterData>

export const ThirdPartyCharacterSearchResponse = z.object({
  totalCount: z.number().int(),
  ranks: z.array(ThirdPartyCharacterData),
});
export type ThirdPartyCharacterSearchResponse = z.infer<typeof ThirdPartyCharacterSearchResponse>

export const Character = z.object({
  name: z.string(),
  region: Region.default("na").catch("na"),
  id: z.string(),
});
export type Character = z.infer<typeof Character>

export const AccountCharacters = z.object({
  characters: z.array(Character),
});
export type AccountCharacters = z.infer<typeof AccountCharacters>
export const defaultAccountCharacters: () => AccountCharacters = () => {
  return {characters: []};
};

export type CharacterWithCachedData = Character & {
  cachedData?: CachedCharacter
}
