import { TaskList, type GroupedTasks, type Task } from 'ms-tracker-library'
import HardHillaIcon from '../resources/tasks/hard-hilla.gif'
import { filterInactiveTasks } from 'ms-tracker-library/lib/models/helper'

const WEEKLY_BOSSES: GroupedTasks = {
  name: 'Weekly Bosses',
  tasks:
  [
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
    },
    {
      taskId: 'boss-weekly-kaling',
      name: 'Kaling'
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
}

const ARCANE_SYMBOL_DAILIES: GroupedTasks = {
  name: 'Arcane Symbol Dailies',
  tasks:
  [
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
}

const SACRED_SYMBOL_DAILIES: GroupedTasks = {
  name: 'Sacred Symbol Dailies',
  tasks: [
    {
      taskId: 'sacred-cernium',
      name: 'Cernium'
    },
    {
      taskId: 'sacred-arcus',
      name: 'Hotel Arcus'
    },
    {
      taskId: 'sacred-odium',
      name: 'Odium'
    },
    {
      taskId: 'sacred-shangrila',
      name: 'Shangri-La'
    },
    {
      taskId: 'sacred-arteria',
      name: 'Arteria'
    },
    {
      taskId: 'sacred-carcion',
      name: 'Carcion'
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
}

const DAILY_BOSSES: GroupedTasks = {
  name: 'Daily Bosses',
  tasks: [
    {
      taskId: 'zakum',
      name: 'Easy/Normal Zakum',
      maxClearCount: 1
    },
    {
      taskId: 'hilla',
      name: 'Normal Hilla',
      maxClearCount: 1
    },
    {
      taskId: 'von-bon',
      name: 'Normal Von Bon',
      maxClearCount: 1
    },
    {
      taskId: 'crimson-queen',
      name: 'Normal Crimson Queen',
      maxClearCount: 1
    },
    {
      taskId: 'pierre',
      name: 'Normal Pierre',
      maxClearCount: 1
    },
    {
      taskId: 'vellum',
      name: 'Normal Vellum',
      maxClearCount: 1
    },
    {
      taskId: 'horntail',
      name: 'Horntail',
      maxClearCount: 1
    },
    {
      taskId: 'von-leon',
      name: 'Von Leon',
      maxClearCount: 1
    },
    {
      taskId: 'pink-bean',
      name: 'Normal Pink Bean',
      maxClearCount: 1
    },
    {
      taskId: 'magnus',
      name: 'Easy/Normal Magnus',
      maxClearCount: 1
    },
    {
      taskId: 'arkarium',
      name: 'Arkarium',
      maxClearCount: 1
    },
    {
      taskId: 'ranmaru',
      name: 'Mori Ranmaru',
      maxClearCount: 1
    },
    {
      taskId: 'gollux',
      name: 'Gollux',
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
}

const OTHER_DAILIES: GroupedTasks = {
  name: 'Other Dailies',
  tasks: [
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
    },
    {
      taskId: 'talk-to-home-caretaker',
      name: 'Talk to Home Caretaker',
      maxClearCount: 1
    }
  ].map((t) => {
    return {
      ...t,
      resetType: 'Daily',
      taskType: 'Other',
      isPerAccount: false
    }
  })
}

const ARCANE_SYMBOL_WEEKLIES: GroupedTasks = {
  name: 'Arcane Symbol Weeklies',
  tasks: [
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
}

const GUILD_TASKS: GroupedTasks = {
  name: 'Guild',
  tasks: [
    {
      taskId: 'guild-culvert',
      name: 'Guild Culvert',
      maxClearCount: 1,
      resetType: 'Weekly_Monday',
      taskType: 'Guild',
      isPerAccount: false
    },
    {
      taskId: 'guild-flag',
      name: 'Guild Flag Race',
      maxClearCount: 1,
      resetType: 'Weekly_Monday',
      taskType: 'Guild',
      isPerAccount: false
    },
    {
      taskId: 'guild-castle-5k',
      name: 'Guild Castle 5k Mobs',
      maxClearCount: 1,
      resetType: 'Weekly_Monday',
      taskType: 'Guild',
      isPerAccount: false
    },
    {
      taskId: 'guild-check-in',
      name: 'Guild Check In',
      maxClearCount: 1,
      resetType: 'Daily',
      taskType: 'Guild',
      isPerAccount: false
    }
  ]
}

const OTHER_WEEKLIES: GroupedTasks = {
  name: 'Other Weeklies',
  tasks: [
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
}

const MONTHLY_BLACK_MAGE: GroupedTasks = {
  name: 'Black Mage',
  tasks: [
    {
      taskId: 'boss-monthly-black-mage',
      name: 'Black Mage',
      maxClearCount: 1,
      resetType: 'Monthly',
      taskType: 'Boss',
      isPerAccount: false
    }
  ]
}

const THREADS_OF_FATE: GroupedTasks = {
  name: 'Threads of Fate',
  tasks: [
    {
      taskId: 'threads-of-fate-roll-ask',
      name: 'Reroll Threads of Fate Ask',
      maxClearCount: 1,
      resetType: 'Daily',
      taskType: 'Other',
      isPerAccount: false
    },
    {
      taskId: 'threads-of-fate-lock-ask',
      name: 'Lock Threads of Fate Ask',
      maxClearCount: 1,
      resetType: 'Daily',
      taskType: 'Other',
      isPerAccount: false
    },
    {
      taskId: 'threads-of-fate-do-ask',
      name: 'Threads of Fate Ask',
      maxClearCount: 5,
      resetType: 'Daily',
      taskType: 'Other',
      isPerAccount: false
    },
    {
      taskId: 'threads-of-fate-talk-friendship',
      name: 'Talk Threads of Fate',
      maxClearCount: 1,
      resetType: 'Daily',
      taskType: 'Other',
      isPerAccount: false
    },
    {
      taskId: 'threads-of-fate-gift-friendship',
      name: 'Gift Threads of Fate',
      maxClearCount: 7,
      resetType: 'Weekly_Monday',
      taskType: 'Other',
      isPerAccount: false
    }
  ]
}

const DAILY_FAIRY_BROS_TASK: Task[] = [
  {
    taskId: 'fairy-bros-daily-gift',
    name: 'Daily Gift',
    maxClearCount: 1,
    resetType: 'Daily',
    taskType: 'Event',
    isPerAccount: true
  }
]

const EVENT_2023_07_SIXTH_STAR: Task[] = [
  {
    taskId: '2023-07-sixth-star-daily',
    name: 'Sixth Star Daily',
    maxClearCount: 1,
    resetType: 'Daily',
    taskType: 'Event',
    isPerAccount: true,
    startDate: new Date('2023-07-19T00:00:00Z'),
    endDate: new Date('2023-10-31T23:59:59Z')
  }
]

const EVENT_2023_09_FAIRY_BROS: Task[] = [
  {
    taskId: '2023-09-fairy-bros-golden-giveaway',
    name: 'Fairy Bros Golden Giveaway',
    maxClearCount: 1,
    resetType: 'Daily',
    taskType: 'Event',
    isPerAccount: true,
    startDate: new Date('2023-08-30T00:00:00Z'),
    endDate: new Date('2023-11-14T23:59:59Z')
  }
]

const EVENT_2023_09_NIGHT_TROUPE_TASKS: Task[] = [
  {
    taskId: '2023-09-night-troupe-coin-cap',
    name: 'Night Troupe Coin Cap',
    maxClearCount: 1,
    resetType: 'Daily',
    taskType: 'Event',
    isPerAccount: true,
    startDate: new Date('2023-10-04T00:00:00Z'),
    endDate: new Date('2023-10-31T23:59:59Z')
  },
  {
    taskId: '2023-09-night-troupe-punch-king',
    name: 'Night Troupe Punch King',
    maxClearCount: 1,
    resetType: 'Daily',
    taskType: 'Event',
    isPerAccount: true,
    startDate: new Date('2023-10-04T00:00:00Z'),
    endDate: new Date('2023-10-31T23:59:59Z')
  }
]

const EVENT_2023_11_IDENTISK_TASKS: Task[] = [
  {
    taskId: '2023-11-identisk-basic-exploration',
    name: 'Identisk Basic Exploration',
    maxClearCount: 1,
    resetType: 'Daily',
    taskType: 'Event',
    isPerAccount: true,
    startDate: new Date('2023-11-15T00:00:00Z'),
    endDate: new Date('2024-02-06T23:59:59Z')
  },
  {
    taskId: '2023-11-identisk-indepth-exploration',
    name: 'Identisk In-Depth Exploration',
    maxClearCount: 1,
    resetType: 'Daily',
    taskType: 'Event',
    isPerAccount: true,
    startDate: new Date('2023-11-15T00:00:00Z'),
    endDate: new Date('2024-02-06T23:59:59Z')
  },
  {
    taskId: '2023-11-identisk-food-storehouse',
    name: 'Identisk Food Storehouse',
    maxClearCount: 1,
    resetType: 'Daily',
    taskType: 'Event',
    isPerAccount: true,
    startDate: new Date('2023-11-15T00:00:00Z'),
    endDate: new Date('2024-02-06T23:59:59Z')
  },
  {
    taskId: '2023-11-identisk-tropical-adventure',
    name: 'Identisk Tropical Adventure',
    maxClearCount: 1,
    resetType: 'Daily',
    taskType: 'Event',
    isPerAccount: true,
    startDate: new Date('2023-11-15T00:00:00Z'),
    endDate: new Date('2024-02-06T23:59:59Z')
  },
  {
    taskId: '2023-11-identisk-coconut-smash',
    name: 'Identisk Coconut Smash',
    maxClearCount: 1,
    resetType: 'Daily',
    taskType: 'Event',
    isPerAccount: true,
    startDate: new Date('2023-12-20T00:00:00Z'),
    endDate: new Date('2024-02-06T23:59:59Z')
  }
]

const EVENT_2023_12_ABYSS_EXPEDITION_TASKS: Task[] = [
  {
    taskId: '2023-12-abyss-expedition-mercenary-level-up',
    name: 'Level Up Abyss Mercenary',
    maxClearCount: 1,
    resetType: 'Daily',
    taskType: 'Event',
    isPerAccount: true,
    startDate: new Date('2023-12-20T00:00:00Z'),
    endDate: new Date('2024-02-06T23:59:59Z')
  },
  {
    taskId: '2023-12-abyss-expedition-daily-tasks',
    name: 'Abyss Expedition Daily Missions',
    maxClearCount: 3,
    resetType: 'Daily',
    taskType: 'Event',
    isPerAccount: true,
    startDate: new Date('2023-12-20T00:00:00Z'),
    endDate: new Date('2024-02-06T23:59:59Z')
  },
  {
    taskId: '2023-12-abyss-expedition-boss-cap',
    name: 'Abyss Expedition Daily Boss',
    maxClearCount: 3,
    resetType: 'Daily',
    taskType: 'Event',
    isPerAccount: true,
    startDate: new Date('2023-12-20T00:00:00Z'),
    endDate: new Date('2024-02-06T23:59:59Z')
  }
]

const EVENT_TASKS: GroupedTasks = {
  name: 'Event',
  tasks: [
    DAILY_FAIRY_BROS_TASK,
    EVENT_2023_07_SIXTH_STAR,
    EVENT_2023_09_FAIRY_BROS,
    EVENT_2023_09_NIGHT_TROUPE_TASKS,
    EVENT_2023_11_IDENTISK_TASKS,
    EVENT_2023_12_ABYSS_EXPEDITION_TASKS
  ]
    .flat()
}

const GROUPED_TASKS: GroupedTasks[] = [
  EVENT_TASKS,
  SACRED_SYMBOL_DAILIES,
  ARCANE_SYMBOL_DAILIES,
  OTHER_DAILIES,
  DAILY_BOSSES,
  WEEKLY_BOSSES,
  MONTHLY_BLACK_MAGE,
  ARCANE_SYMBOL_WEEKLIES,
  GUILD_TASKS,
  OTHER_WEEKLIES,
  THREADS_OF_FATE
].map(filterInactiveTasks)

export const PREDEFINED_TASKS = new TaskList(GROUPED_TASKS)
