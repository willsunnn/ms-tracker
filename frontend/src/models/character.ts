/* eslint @typescript-eslint/no-redeclare: "off" */ // linter conflicts with zod usage documentation

import { z } from 'zod'

export const Character = z.object({
  name: z.string(),
  image: z.string().optional()
})
export type Character = z.infer<typeof Character>

export const AccountCharacters = z.object({
  characters: z.array(Character)
})
export type AccountCharacters = z.infer<typeof AccountCharacters>
export const defaultAccountCharacters: () => AccountCharacters = () => {
  return { characters: [] }
}
