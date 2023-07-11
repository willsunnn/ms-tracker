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
export const MapleGgCachedData = z.object({
  key: z.string(),
  loweredName: z.string(),
  region: Region,

  // Metadata
  lastRetrievedTimestamp: z.number().optional(),

  // The data being cached
  name: z.string().optional(),
  image: z.string().optional(),
  class: z.string().optional(),
  classRank: z.number().optional(),
  level: z.number().optional(),
  server: z.string().optional(),
});
export type MapleGgCachedData = z.infer<typeof MapleGgCachedData>;
export const defaultMapleGgCachedData = (key: MapleGgCacheKey): MapleGgCachedData => ({
  key: cacheKeyToString(key),
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
