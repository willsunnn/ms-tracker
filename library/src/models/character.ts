/* eslint @typescript-eslint/no-redeclare: "off" */ // linter conflicts with zod usage documentation

import {z} from "zod";

// These are the regions as defined by api.maplestory.gg (a 3rd party service unaffiliated by Nexon)
export const Region = z.enum([
  "gms",
  "eu",
]);
export type Region = z.infer<typeof Region>

export interface MapleGgCacheKey {
  name: string,
  region: Region,
}
export const getMapleGgCacheKey = (name: string, region: Region) => ({region, name: name.toLowerCase()});
export const cacheKeyToString = (key: MapleGgCacheKey) => `${key.region}-${key.name.toLowerCase()}`;

export const Class = z.enum([
  // Adventurers
  "Hero",
  "Dark Knight",
  "Paladin",
  "Bishop",
  "Ice/Lightning Archmage",
  "Fire/Poison Archmage",
  "Night Lord",
  "Shadower",
  "Dual Blade",
  "Bowmaster",
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
  // Other
  "Zero",
  "Kinesis",
  // Fallback
  "Unknown",
]);
export type Class = z.infer<typeof Class>;

// Model response for Calling Maple GG Api directly
export const MapleGgCharacterData = z.object({
  // Basic Character Information
  CharacterImageURL: z.string().optional(),
  Class: Class.default("Unknown").catch("Unknown"),
  Server: z.string(),
  Name: z.string(),

  // Character Stats
  Level: z.number().optional(),
  LegionLevel: z.number().optional(),

  // Ranking
  ClassRank: z.number().optional(),
  GlobralRanking: z.number().optional(),
  ServerRank: z.number().optional(),
  ServerClassRanking: z.number().optional(),
});
export type MapleGgCharacterData = z.infer<typeof MapleGgCharacterData>

export const MapleGgApiResponse = z.object({
  CharacterData: MapleGgCharacterData,
});
export type MapleGgApiResponse = z.infer<typeof MapleGgApiResponse>

// Model response for the cached data
// a few extra fields, and i dont like their variable name case-ing
export const MapleGgCachedData = z.object({
  key: z.string(),
  loweredName: z.string(),
  region: Region,

  // Metadata
  lastRetrievedTimestamp: z.number().optional(),

  // The data being cached
  name: z.string().optional(),
  image: z.string().optional(),
  class: Class.default("Unknown").catch("Unknown"),
  classRank: z.number().optional(),
  level: z.number().optional(),
  server: z.string().optional(),
});
export type MapleGgCachedData = z.infer<typeof MapleGgCachedData>;

export const defaultMapleGgCachedData = (key: MapleGgCacheKey): MapleGgCachedData => ({
  key: cacheKeyToString(key),
  class: "Unknown",
  loweredName: key.name.toLowerCase(),
  region: key.region,
});

export const Character = z.object({
  name: z.string(),
  region: Region,
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

export type CharacterWithMapleGgData = Character & {
  mapleGgData?: MapleGgCachedData
}
