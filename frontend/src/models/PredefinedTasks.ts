import { type Task } from 'ms-tracker-library'
import HardHillaIcon from '../resources/tasks/hard-hilla.gif'

export const WEEKLY_BOSSES: Task[] = [
  {
    taskId: 'boss-weekly-hhilla',
    name: 'Hard Hilla',
    imageIcon: HardHillaIcon
  },
  {
    taskId: 'boss-weekly-cygnus',
    name: 'Easy/Normal Cygnus'
  },
  {
    taskId: 'boss-weekly-cpb',
    name: 'Chaos Pink Bean'
  },
  {
    taskId: 'boss-weekly-czak',
    name: 'Chaos Zakum'
  },
  {
    taskId: 'boss-weekly-pno',
    name: 'Princess No'
  },
  {
    taskId: 'boss-weekly-cchicken',
    name: 'Chaos Von Bon'
  },
  {
    taskId: 'boss-weekly-cqueen',
    name: 'Chaos Crimson Queen'
  },
  {
    taskId: 'boss-weekly-cpierre',
    name: 'Chaos Pierre'
  },
  {
    taskId: 'boss-weekly-cvel',
    name: 'Chaos Vellum'
  },
  {
    taskId: 'boss-weekly-hmag',
    name: 'Hard Magnus'
  },
  {
    taskId: 'boss-weekly-akechi',
    name: 'Akechi Mitsuhide'
  },
  {
    taskId: 'boss-weekly-cpap',
    name: 'Chaos Papulatus'
  },
  {
    taskId: 'boss-weekly-lotus',
    name: 'Lotus'
  },
  {
    taskId: 'boss-weekly-damien',
    name: 'Damien'
  },
  {
    taskId: 'boss-weekly-slime',
    name: 'Guardian Angel Slime'
  },
  {
    taskId: 'boss-weekly-lucid',
    name: 'Lucid'
  },
  {
    taskId: 'boss-weekly-will',
    name: 'Will'
  },
  {
    taskId: 'boss-weekly-gloom',
    name: 'Gloom'
  },
  {
    taskId: 'boss-weekly-vhilla',
    name: 'Verus Hilla'
  },
  {
    taskId: 'boss-weekly-darknell',
    name: 'Darknell'
  },
  {
    taskId: 'boss-weekly-seren',
    name: 'Seren'
  },
  {
    taskId: 'boss-weekly-kalos',
    name: 'Kalos'
  }
].map((t) => {
  return {
    ...t,
    maxClearCount: 1,
    resetType: 'Weekly_Thursday',
    taskType: 'Boss',
    isPerAccount: false
  }
})

const ARCANE_SYMBOL_DAILIES: Task[] = [
  {
    taskId: 'arcane-vj',
    name: 'Vanishing Journey'
  },
  {
    taskId: 'arcane-chuchu',
    name: 'Chu Chu Island'
  },
  {
    taskId: 'arcane-lach',
    name: 'Lachelin'
  },
  {
    taskId: 'arcane-arcana',
    name: 'Arcana'
  },
  {
    taskId: 'arcane-morass',
    name: 'Morass'
  },
  {
    taskId: 'arcane-esfera',
    name: 'Esfera'
  },
  {
    taskId: 'arcane-tenebris',
    name: 'Tenebris'
  }
].map((t) => {
  return {
    ...t,
    maxClearCount: 1,
    resetType: 'Daily',
    taskType: 'ArcaneSymbol',
    isPerAccount: false
  }
})

const SACRED_SYMBOL_DAILIES: Task[] = [
  {
    taskId: 'sacred-cernium',
    name: 'Cernium'
  },
  {
    taskId: 'sacred-burninum',
    name: 'Burning Cernium'
  },
  {
    taskId: 'sacred-arcus',
    name: 'Hotel Arcus'
  },
  {
    taskId: 'sacred-odium',
    name: 'Odium'
  }
].map((t) => {
  return {
    ...t,
    maxClearCount: 1,
    resetType: 'Daily',
    taskType: 'SacredSymbol',
    isPerAccount: false
  }
})

const DAILY_BOSSES: Task[] = [
  {
    taskId: 'gollux',
    name: 'Gollux',
    maxClearCount: 1
  },
  {
    taskId: 'arkarium',
    name: 'Arkarium',
    maxClearCount: 1
  }
].map((t) => {
  return {
    ...t,
    resetType: 'Daily',
    taskType: 'Boss',
    isPerAccount: false
  }
})

const OTHER_DAILIES: Task[] = [
  {
    taskId: 'monster-park',
    name: 'Monster Park',
    maxClearCount: 7
  },
  {
    taskId: 'monster-park-extreme',
    name: 'Monster Park Extreme',
    maxClearCount: 1
  },
  {
    taskId: 'commerci-voyages',
    name: 'Commerci Voyages',
    maxClearCount: 1
  },
  {
    taskId: 'commerci-pq',
    name: 'Commerci Party Quest',
    maxClearCount: 3
  },
  {
    taskId: 'ursus',
    name: 'Ursus',
    maxClearCount: 3
  },
  {
    taskId: 'maple-tour',
    name: 'Maple Tour',
    maxClearCount: 2
  }
].map((t) => {
  return {
    ...t,
    resetType: 'Daily',
    taskType: 'Other',
    isPerAccount: false
  }
})

const ARCANE_SYMBOL_WEEKLIES: Task[] = [
  {
    taskId: 'arcane-vj-weekly',
    name: 'Erda Spectrum'
  },
  {
    taskId: 'arcane-chuchu-weekly',
    name: 'Hungry Muto'
  },
  {
    taskId: 'arcane-lach-weekly',
    name: 'Midnight Chaser'
  },
  {
    taskId: 'arcane-arcana-weekly',
    name: 'Spirit Savior'
  },
  {
    taskId: 'arcane-morass-weekly',
    name: 'Ranheim Defense'
  },
  {
    taskId: 'arcane-esfera-weekly',
    name: 'Esfera Guardian'
  }
].map((t) => {
  return {
    ...t,
    maxClearCount: 1,
    resetType: 'Weekly_Monday',
    taskType: 'ArcaneSymbol',
    isPerAccount: false
  }
})

const GUILD_WEEKLIES: Task[] = [
  {
    taskId: 'guild-culvert',
    name: 'Guild Culvert',
    maxClearCount: 1
  },
  {
    taskId: 'guild-flag',
    name: 'Guild Flag Race',
    maxClearCount: 1
  },
  {
    taskId: 'guild-castle-5k',
    name: 'Guild Castle 5k Mobs',
    maxClearCount: 1
  }
].map((t) => {
  return {
    ...t,
    resetType: 'Weekly_Monday',
    taskType: 'Guild',
    isPerAccount: false
  }
})

const OTHER_WEEKLIES: Task[] = [
  {
    taskId: 'weekly-dojo',
    name: 'Mu Lung Dojo',
    maxClearCount: 1
  },
  {
    taskId: 'weekly-scrapyard',
    name: 'Scrapyard Weeklies',
    maxClearCount: 1
  },
  {
    taskId: 'weekly-dwt',
    name: 'Dark World Tree Weeklies',
    maxClearCount: 1
  }
].map((t) => {
  return {
    ...t,
    resetType: 'Weekly_Monday',
    taskType: 'Other',
    isPerAccount: false
  }
})

const MONTHLY_BLACK_MAGE: Task[] = [
  {
    taskId: 'boss-monthly-black-mage',
    name: 'Black Mage',
    maxClearCount: 1,
    resetType: 'Monthly',
    taskType: 'Boss',
    isPerAccount: false
  }
]

export const GROUPED_TASKS = [
  SACRED_SYMBOL_DAILIES,
  ARCANE_SYMBOL_DAILIES,
  OTHER_DAILIES,
  DAILY_BOSSES,
  WEEKLY_BOSSES,
  MONTHLY_BLACK_MAGE,
  ARCANE_SYMBOL_WEEKLIES,
  GUILD_WEEKLIES,
  OTHER_WEEKLIES
]
export const TASK_LIST = GROUPED_TASKS.flat(1)
export const TASK_MAP = new Map(TASK_LIST.map((task) => [task.taskId, task]))

const tasksAreUniqueById = (TASK_LIST.length === TASK_MAP.size)
if (!tasksAreUniqueById) {
  throw new Error('Tasks are not unique by ID')
}
