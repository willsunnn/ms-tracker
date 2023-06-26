/* eslint @typescript-eslint/no-redeclare: "off" */ // linter conflicts with zod usage documentation

import {z} from "zod";

export const MapleGgCachedData = z.object({
  image: z.string().optional(),
  class: z.string().optional(),
  classRank: z.number().optional(),
  level: z.number().optional(),
  server: z.string().optional(),
});
export type MapleGgCachedData = z.infer<typeof MapleGgCachedData>;

export const Character = z.object({
  name: z.string(),
  mapleGgData: MapleGgCachedData.optional(),
  mapleGgLastUpdated: z.number().optional(),
});
export type Character = z.infer<typeof Character>

export const AccountCharacters = z.object({
  characters: z.array(Character),
});
export type AccountCharacters = z.infer<typeof AccountCharacters>
export const defaultAccountCharacters: () => AccountCharacters = () => {
  return {characters: []};
};
