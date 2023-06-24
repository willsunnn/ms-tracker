export enum Stat {
  STR,
  DEX,
  LUK,
  INT,
}

export enum PotentialRarity {
  None = 0,
  Rare = 1,
  Epic = 2,
  Unique = 3,
  Legendary = 4,
}

export interface PotentialLines {
  line: string
}

export interface GearPotential {
  level: PotentialRarity
  lines: PotentialLines[]
}

export interface GearStarforce {
  currentStars: number
  maxStars: number
}

export interface GearFlame {
  flameAdvantaged: boolean
  str: number
  dex: number
  luk: number
  int: number
  allStatPercent: number
  attack: number
}

export interface Gear {
  potential: GearPotential
  starforce: GearStarforce
  flame: GearFlame
}

export interface StatEquivalences {
  statPercentToMainStat: number
  secondaryToMainStat: number
  attackToMainStat: number
}
