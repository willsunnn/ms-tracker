enum Day {
    Monday = 1,
    Tuesday = 2,
    Wednesday = 3,
    Thursday = 4,
    Friday = 5,
    Saturday = 6,
    Sunday = 7,
}

enum Stat {
    STR,
    DEX,
    LUK,
    INT,
}

export type DailyTask = {
    name: string,
}

export type WeeklyTask = {
    name: string,
    resetDay: Day,   
}

enum PotentialRarity {
    None = 0,
    Rare = 1,
    Epic = 2,
    Unique = 3,
    Legendary = 4,
}

export type PotentialLines = {
    line: String,
}

export type GearPotential = {
    level: PotentialRarity,
    lines: PotentialLines[],
}

export type GearStarforce = {
    currentStars: number,
    maxStars: number,
}

export type GearFlame = {
    flameAdvantaged: boolean,
    str: Number,
    dex: Number,
    luk: Number,
    int: Number,
    allStatPercent: Number,
    attack: Number,
}

export type Gear = {
    potential: GearPotential,
    starforce: GearStarforce,
    flame: GearFlame
}

export type StatEquivalences = {
    statPercentToMainStat: Number,
    secondaryToMainStat: Number,
    attackToMainStat: Number,
}

export type Character = {
    name: string,
    dailies: DailyTask[],
    weeklies: WeeklyTask[],
    gear: Gear[],
    statEquivalences: StatEquivalences,
}

export type UserData = {
    characters: Character[]
    userId: string
}

