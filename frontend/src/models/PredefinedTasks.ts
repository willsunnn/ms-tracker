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
      },
      {
        taskId: 'boss-weekly-limbo',
        name: 'Limbo'
      },
      {
        taskId: 'boss-weekly-baldrix',
        name: 'Baldrix'
      },
      {
        taskId: 'boss-weekly-firstadversary',
        name: 'First Adversary'
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

const SIXTH_JOB_DAILIES: GroupedTasks = {
  name: '6th Job',
  tasks: [
    {
      taskId: '6th-job-sol-erda',
      name: 'Erda\'s request',
      maxClearCount: 1,
      resetType: 'Weekly_Thursday',
      taskType: '6thJob',
      isPerAccount: false
    },
    {
      taskId: '6th-job-sol-erda-booster',
      name: 'Sol Erda Booster',
      maxClearCount: 1,
      resetType: 'Daily',
      taskType: '6thJob',
      isPerAccount: false
    },
    {
      taskId: '6th-job-high-mountain',
      name: 'High Mountain Dungeon',
      maxClearCount: 1,
      resetType: 'Weekly_Thursday',
      taskType: '6thJob',
      isPerAccount: false
    },
    {
      taskId: '6th-job-angler-comppany',
      name: 'Angler Company Dungeon',
      maxClearCount: 1,
      resetType: 'Weekly_Thursday',
      taskType: '6thJob',
      isPerAccount: false
    }
  ]
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
    },
    {
      taskId: 'sacred-tallahart',
      name: 'Tallahart'
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
      taskId: 'papulatus',
      name: 'Easy/Normal Papulatus',
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
      resetType: 'Daily',
      maxClearCount: 7,
      taskType: 'Other',
      isPerAccount: false
    },
    {
      taskId: 'monster-park-extreme',
      name: 'Monster Park Extreme',
      resetType: 'Weekly_Thursday',
      maxClearCount: 1,
      taskType: 'Other',
      isPerAccount: false
    },
    {
      taskId: 'commerci-voyages',
      name: 'Commerci Voyages',
      resetType: 'Daily',
      maxClearCount: 1,
      taskType: 'Other',
      isPerAccount: false
    },
    {
      taskId: 'commerci-pq',
      name: 'Commerci Party Quest',
      resetType: 'Daily',
      maxClearCount: 3,
      taskType: 'Other',
      isPerAccount: false
    },
    {
      taskId: 'ursus',
      name: 'Ursus',
      resetType: 'Daily',
      maxClearCount: 3,
      taskType: 'Other',
      isPerAccount: false
    },
    {
      taskId: 'maple-tour',
      name: 'Maple Tour',
      resetType: 'Daily',
      maxClearCount: 2,
      taskType: 'Other',
      isPerAccount: false
    },
    {
      taskId: 'talk-to-home-caretaker',
      name: 'Talk to Home Caretaker',
      resetType: 'Daily',
      maxClearCount: 1,
      taskType: 'Other',
      isPerAccount: false
    },
    {
      taskId: 'autoharvest-herbs-and-minerals',
      name: 'Auto-Harvest Herbs and Minerals',
      resetType: 'Daily',
      maxClearCount: 1,
      taskType: 'Other',
      isPerAccount: false
    }
  ]
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
      resetType: 'Weekly_Thursday',
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
      resetType: 'Weekly_Thursday',
      taskType: 'Guild',
      isPerAccount: false
    },
    {
      taskId: 'guild-flag',
      name: 'Guild Flag Race',
      maxClearCount: 1,
      resetType: 'Weekly_Thursday',
      taskType: 'Guild',
      isPerAccount: false
    },
    {
      taskId: 'guild-castle-5k',
      name: 'Guild Castle 5k Mobs',
      maxClearCount: 1,
      resetType: 'Weekly_Thursday',
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

const LEGION_TASKS: GroupedTasks = {
  name: 'Legion',
  tasks: [
    {
      taskId: 'legion-coin-claim',
      name: 'Claim Legion Coins',
      maxClearCount: 1,
      resetType: 'Daily',
      taskType: 'Legion',
      isPerAccount: true
    },
    {
      taskId: 'legion-weekly',
      name: 'Legion Weekly Dragon Extermination',
      maxClearCount: 1,
      resetType: 'Weekly_Thursday',
      taskType: 'Legion',
      isPerAccount: true
    }
  ]
}

const MVP_TASKS: GroupedTasks = {
  name: 'MVP',
  tasks: [
    {
      taskId: 'mvp-3x-exp',
      name: 'MVP 3x EXP Coupon',
      maxClearCount: 1,
      resetType: 'Weekly_Thursday',
      taskType: 'MVP',
      isPerAccount: true
    },
    {
      taskId: 'mvp-4x-exp',
      name: 'MVP 4x EXP Coupon',
      maxClearCount: 1,
      resetType: 'Weekly_Thursday',
      taskType: 'MVP',
      isPerAccount: true
    },
    {
      taskId: 'mvp-bonus-50-exp',
      name: 'MVP 50% Bonus EXP Coupon',
      maxClearCount: 1,
      resetType: 'Weekly_Thursday',
      taskType: 'MVP',
      isPerAccount: true
    },
    {
      taskId: 'mvp-bonus-70-exp',
      name: 'MVP 70% Bonus EXP Coupon',
      maxClearCount: 1,
      resetType: 'Weekly_Thursday',
      taskType: 'MVP',
      isPerAccount: true
    },
    {
      taskId: 'mvp-superpower',
      name: 'MVP Superpower Buff',
      maxClearCount: 1,
      resetType: 'Weekly_Thursday',
      taskType: 'MVP',
      isPerAccount: true
    },
    {
      taskId: 'mvp-bonus-70-exp-atmospheric',
      name: 'MVP 70% Bonus EXP Atmospheric Effect',
      maxClearCount: 1,
      resetType: 'Weekly_Thursday',
      taskType: 'MVP',
      isPerAccount: true
    },
    {
      taskId: 'mvp-monthly-resort',
      name: 'MVP Resort',
      maxClearCount: 1,
      resetType: 'Monthly',
      taskType: 'MVP',
      isPerAccount: true
    },
    {
      taskId: 'mvp-pendant',
      name: 'MVP Prepared Pendant of the Spirit',
      maxClearCount: 1,
      resetType: 'Monthly',
      taskType: 'MVP',
      isPerAccount: true
    },
    {
      taskId: 'mvp-exp-ring',
      name: 'MVP EXP Boost Ring',
      maxClearCount: 1,
      resetType: 'Monthly',
      taskType: 'MVP',
      isPerAccount: true
    },
    {
      taskId: 'mvp-sol-erda',
      name: 'MVP Sol Erda',
      maxClearCount: 1,
      resetType: 'Monthly',
      taskType: 'MVP',
      isPerAccount: true
    },
    {
      taskId: 'mvp-kinship-ring',
      name: 'MVP Kinship Ring',
      maxClearCount: 1,
      resetType: 'Monthly',
      taskType: 'MVP',
      isPerAccount: true
    },
    {
      taskId: 'mvp-unlimited-elixir',
      name: 'MVP Unlimited Elixir',
      maxClearCount: 1,
      resetType: 'Monthly',
      taskType: 'MVP',
      isPerAccount: false
    },
    {
      taskId: 'mvp-damage-skin',
      name: 'MVP Basic Damage Skin (Unit)',
      maxClearCount: 1,
      resetType: 'Monthly',
      taskType: 'MVP',
      isPerAccount: false
    },
    {
      taskId: 'mvp-title',
      name: 'MVP Title',
      maxClearCount: 1,
      resetType: 'Monthly',
      taskType: 'MVP',
      isPerAccount: false
    },
    {
      taskId: 'mvp-medal',
      name: 'MVP Medal',
      maxClearCount: 1,
      resetType: 'Monthly',
      taskType: 'MVP',
      isPerAccount: false
    },
    {
      taskId: 'mvp-chair',
      name: 'MVP Chair',
      maxClearCount: 1,
      resetType: 'Monthly',
      taskType: 'MVP',
      isPerAccount: false
    },
    {
      taskId: 'mvp-chat-ring',
      name: 'MVP Chat Ring',
      maxClearCount: 1,
      resetType: 'Monthly',
      taskType: 'MVP',
      isPerAccount: false
    },
    {
      taskId: 'mvp-label-ring',
      name: 'MVP Label Ring',
      maxClearCount: 1,
      resetType: 'Monthly',
      taskType: 'MVP',
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
      resetType: 'Weekly_Thursday',
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

const EVENT_2024_02_V248_TASKS: Task[] = [
  {
    taskId: '2024-02-strawberry-farm-daily',
    name: 'Strawberry Farm Daily',
    maxClearCount: 1,
    resetType: 'Daily',
    taskType: 'Event',
    isPerAccount: true,
    startDate: new Date('2024-02-07T00:00:00Z'),
    endDate: new Date('2024-02-20T23:59:59Z')
  },
  {
    taskId: '2024-02-gold-richies-safe',
    name: 'Gold Richie\'s Safe',
    maxClearCount: 1,
    resetType: 'Daily',
    taskType: 'Event',
    isPerAccount: true,
    startDate: new Date('2024-03-06T00:00:00Z'),
    endDate: new Date('2024-03-19T23:59:59Z')
  },
  {
    taskId: '2024-02-fairy-bros-golden-giveaway',
    name: 'Fairy Bros Golden Giveaway',
    maxClearCount: 1,
    resetType: 'Daily',
    taskType: 'Event',
    isPerAccount: true,
    startDate: new Date('2024-02-07T00:00:00Z'),
    endDate: new Date('2024-06-11T23:59:59Z')
  }
]

const EVENT_2024_02_KONOSUBA_TASKS: Task[] = [
  {
    taskId: '2024-02-konosuba-aqua',
    name: 'Recieve Daily Aqua\'s Cheer',
    maxClearCount: 1,
    resetType: 'Daily',
    taskType: 'Event',
    isPerAccount: true,
    startDate: new Date('2024-02-21T00:00:00Z'),
    endDate: new Date('2024-03-18T23:59:59Z')
  },
  {
    taskId: '2024-02-konosuba-megumin',
    name: 'Use Megumin\'s Explosion Magic',
    maxClearCount: 1,
    resetType: 'Daily',
    taskType: 'Event',
    isPerAccount: true,
    startDate: new Date('2024-02-21T00:00:00Z'),
    endDate: new Date('2024-03-18T23:59:59Z')
  },
  {
    taskId: '2024-02-konosuba-darkness',
    name: 'Use Darkness\'s Joyful Sacrifice',
    maxClearCount: 1,
    resetType: 'Daily',
    taskType: 'Event',
    isPerAccount: true,
    startDate: new Date('2024-02-21T00:00:00Z'),
    endDate: new Date('2024-03-18T23:59:59Z')
  },
  {
    taskId: '2024-02-konosuba-kazuma',
    name: 'Do Kazuma\'s Small Fortune 5 times',
    maxClearCount: 1,
    resetType: 'Daily',
    taskType: 'Event',
    isPerAccount: true,
    startDate: new Date('2024-02-21T00:00:00Z'),
    endDate: new Date('2024-03-18T23:59:59Z')
  }
]

const EVENT_2024_03_MINAR_FOREST_TASKS: Task[] = [
  {
    taskId: '2024-03-minar-checkin',
    name: 'Minar Picnic Daily Check In',
    maxClearCount: 1,
    resetType: 'Daily',
    taskType: 'Event',
    isPerAccount: true,
    startDate: new Date('2024-03-20T00:00:00Z'),
    endDate: new Date('2024-04-30T23:59:59Z')
  },
  {
    taskId: '2024-03-minar-treasure',
    name: 'Minar Picnic Treasure Hunt',
    maxClearCount: 1,
    resetType: 'Daily',
    taskType: 'Event',
    isPerAccount: true,
    startDate: new Date('2024-03-20T00:00:00Z'),
    endDate: new Date('2024-04-30T23:59:59Z')
  },
  {
    taskId: '2024-03-minar-forest-blast',
    name: 'Minar Picnic Dragon Minigame',
    maxClearCount: 1,
    resetType: 'Daily',
    taskType: 'Event',
    isPerAccount: true,
    startDate: new Date('2024-03-20T00:00:00Z'),
    endDate: new Date('2024-04-30T23:59:59Z')
  },
  {
    taskId: '2024-03-minar-drop-the-acorn',
    name: 'Minar Picnic Acorn Punchking',
    maxClearCount: 1,
    resetType: 'Weekly_Wednesday',
    taskType: 'Event',
    isPerAccount: true,
    startDate: new Date('2024-03-20T00:00:00Z'),
    endDate: new Date('2024-04-30T23:59:59Z')
  },
  {
    taskId: '2024-03-minar-make-bracelet',
    name: 'Minar Picnic Make Bracelet',
    maxClearCount: 1,
    resetType: 'Daily',
    taskType: 'Event',
    isPerAccount: true,
    startDate: new Date('2024-04-17T00:00:00Z'),
    endDate: new Date('2024-04-30T23:59:59Z')
  },
  {
    taskId: '2024-03-minar-yellow-leaves',
    name: 'Minar Picnic Claim Yellow Maple Leaves',
    maxClearCount: 1,
    resetType: 'Weekly_Thursday',
    taskType: 'Event',
    isPerAccount: true,
    startDate: new Date('2024-03-20T00:00:00Z'),
    endDate: new Date('2024-04-30T23:59:59Z')
  }
]

const EVENT_2024_05_MAYPLE_ISLAND: Task[] = [
  {
    taskId: '2024-05-mayple-checkin',
    name: 'Mayple Island Daily Check In',
    maxClearCount: 1,
    resetType: 'Daily',
    taskType: 'Event',
    isPerAccount: true,
    startDate: new Date('2024-05-01T00:00:00Z'),
    endDate: new Date('2024-06-11T23:59:59Z')
  },
  {
    taskId: '2024-05-mayple-claim-mayple-leaves',
    name: 'Mayple Island Claim Mayple Leaves',
    maxClearCount: 1,
    resetType: 'Daily',
    taskType: 'Event',
    isPerAccount: false,
    startDate: new Date('2024-05-01T00:00:00Z'),
    endDate: new Date('2024-06-11T23:59:59Z')
  },
  {
    taskId: '2024-05-mayple-claim-mayple-candies',
    name: 'Mayple Island Claim Mayple Candies',
    maxClearCount: 1,
    resetType: 'Daily',
    taskType: 'Event',
    isPerAccount: false,
    startDate: new Date('2024-05-01T00:00:00Z'),
    endDate: new Date('2024-06-11T23:59:59Z')
  },
  {
    taskId: '2024-05-mayple-play-mayple-adventure',
    name: 'Mayple Island Play Mayple Adventure',
    maxClearCount: 1,
    resetType: 'Daily',
    taskType: 'Event',
    isPerAccount: false,
    startDate: new Date('2024-05-01T00:00:00Z'),
    endDate: new Date('2024-06-11T23:59:59Z')
  },
  {
    taskId: '2024-05-mayple-leona-chances',
    name: 'Mayple Island Use 5 Leona Chances',
    maxClearCount: 1,
    resetType: 'Daily',
    taskType: 'Event',
    isPerAccount: true,
    startDate: new Date('2024-05-01T00:00:00Z'),
    endDate: new Date('2024-06-11T23:59:59Z')
  },
  {
    taskId: '2024-05-mayple-claim-mayple-stars',
    name: 'Mayple Island Claim Mayple Stars',
    maxClearCount: 1,
    resetType: 'Weekly_Thursday',
    taskType: 'Event',
    isPerAccount: true,
    startDate: new Date('2024-05-01T00:00:00Z'),
    endDate: new Date('2024-06-11T23:59:59Z')
  }
]

const EVENT_2024_06_GO_WEST: Task[] = [
  {
    taskId: '2024-06-dreamer-daily-checkin',
    name: 'Dreamer Daily Party Check In',
    maxClearCount: 1,
    resetType: 'Daily',
    taskType: 'Event',
    isPerAccount: true,
    startDate: new Date('2024-06-12T00:00:00Z'),
    endDate: new Date('2024-08-27T23:59:59Z')
  },
  {
    taskId: '2024-06-dreamer-weekly-checkin',
    name: 'Dreamer Weekly Party Check In',
    maxClearCount: 1,
    resetType: 'Daily',
    taskType: 'Event',
    isPerAccount: true,
    startDate: new Date('2024-06-12T00:00:00Z'),
    endDate: new Date('2024-08-27T23:59:59Z')
  },
  {
    taskId: '2024-06-dreamer-boss-crystals',
    name: 'Dreamer Claim Boss Night Fragments',
    maxClearCount: 1,
    resetType: 'Weekly_Thursday',
    taskType: 'Event',
    isPerAccount: true,
    startDate: new Date('2024-06-12T00:00:00Z'),
    endDate: new Date('2024-08-27T23:59:59Z')
  },
  {
    taskId: '2024-06-dreamer-midnight-dreamcatcher',
    name: 'Dreamer Midnight Dreamcatcher',
    maxClearCount: 1,
    resetType: 'Daily',
    taskType: 'Event',
    isPerAccount: true,
    startDate: new Date('2024-06-12T00:00:00Z'),
    endDate: new Date('2024-08-27T23:59:59Z')
  },
  {
    taskId: '2024-06-dreamer-tomato-punchking',
    name: 'Dreamer Tomato Punch King',
    maxClearCount: 1,
    resetType: 'Weekly_Wednesday',
    taskType: 'Event',
    isPerAccount: true,
    startDate: new Date('2024-07-03T00:00:00Z'),
    endDate: new Date('2024-08-27T23:59:59Z')
  },
  {
    taskId: '2024-06-dreamer-monster-arcade',
    name: 'Dreamer Get Dance Fragments',
    maxClearCount: 1,
    resetType: 'Daily',
    taskType: 'Event',
    isPerAccount: true,
    startDate: new Date('2024-06-12T00:00:00Z'),
    endDate: new Date('2024-08-27T23:59:59Z')
  },
  {
    taskId: '2024-06-dreamer-safe',
    name: 'Dreamer Enter In Gold Richie\'s Safe',
    maxClearCount: 1,
    resetType: 'Daily',
    taskType: 'Event',
    isPerAccount: true,
    startDate: new Date('2024-07-03T00:00:00Z'),
    endDate: new Date('2024-07-30T23:59:59Z')
  },
  {
    taskId: '2024-06-dreamer-day-dream-party',
    name: 'Dreamer Day Dream Party Check In',
    maxClearCount: 1,
    resetType: 'Daily',
    taskType: 'Event',
    isPerAccount: true,
    startDate: new Date('2024-08-14T00:00:00Z'),
    endDate: new Date('2024-08-27T23:59:59Z')
  },
  {
    taskId: '2024-06-go-west-world-tour',
    name: 'Go West Maple World Tour',
    maxClearCount: 1,
    resetType: 'Daily',
    taskType: 'Event',
    isPerAccount: true,
    startDate: new Date('2024-06-12T00:00:00Z'),
    endDate: new Date('2024-08-27T23:59:59Z')
  },
  {
    taskId: '2024-06-go-west-star-queue',
    name: 'Cap Go West Star Queue Hours',
    maxClearCount: 1,
    resetType: 'Daily',
    taskType: 'Event',
    isPerAccount: true,
    startDate: new Date('2024-06-12T00:00:00Z'),
    endDate: new Date('2024-08-27T23:59:59Z')
  },
  {
    taskId: '2024-06-go-west-7000-days',
    name: 'Complete Go West 7000 days mission',
    maxClearCount: 1,
    resetType: 'Daily',
    taskType: 'Event',
    isPerAccount: true,
    startDate: new Date('2024-07-10T00:00:00Z'),
    endDate: new Date('2024-07-14T23:59:59Z')
  },
  {
    taskId: '2024-06-ab-daily-checkin',
    name: 'AB Remaster Checkin',
    maxClearCount: 1,
    resetType: 'Daily',
    taskType: 'Event',
    isPerAccount: true,
    startDate: new Date('2024-06-12T00:00:00Z'),
    endDate: new Date('2024-07-16T23:59:59Z')
  }
]

const EVENT_2024_07_GO_WEST: Task[] = [
  {
    taskId: '2024-07-pharoahs-treasure',
    name: 'Run Pharoah\'s treasure',
    maxClearCount: 1,
    resetType: 'Daily',
    taskType: 'Event',
    isPerAccount: false,
    startDate: new Date('2024-07-17T00:00:00Z'),
    endDate: new Date('2024-08-27T23:59:59Z')
  },
  {
    taskId: '2024-07-ab-lucid-conquest',
    name: 'AB x Lucid Complete Conquest Check In',
    maxClearCount: 1,
    resetType: 'Daily',
    taskType: 'Event',
    isPerAccount: true,
    startDate: new Date('2024-07-17T00:00:00Z'),
    endDate: new Date('2024-08-06T23:59:59Z')
  }
]

const EVENT_2024_08_BUGCAT: Task[] = [
  {
    taskId: '2024-08-bugcat-dungeon-adventure',
    name: 'Bugcat Capoo Dungeon Adventure',
    maxClearCount: 1,
    resetType: 'Daily',
    taskType: 'Event',
    isPerAccount: false,
    startDate: new Date('2024-08-28T00:00:00Z'),
    endDate: new Date('2024-10-01T23:59:59Z')
  },
  {
    taskId: '2024-08-nexon-30th-checkin',
    name: 'Nexon 30th Anniversary Checkin',
    maxClearCount: 1,
    resetType: 'Daily',
    taskType: 'Event',
    isPerAccount: false,
    startDate: new Date('2024-08-28T00:00:00Z'),
    endDate: new Date('2024-10-08T23:59:59Z')
  },
  {
    taskId: '2024-08-chuchu-slushy',
    name: 'Chu Chu Slushy Checkin',
    maxClearCount: 1,
    resetType: 'Daily',
    taskType: 'Event',
    isPerAccount: false,
    startDate: new Date('2024-08-28T00:00:00Z'),
    endDate: new Date('2024-09-17T23:59:59Z')
  },
  {
    taskId: '2024-08-rockspirit-checkin',
    name: 'Rock Spirit Giveaway Checkin',
    maxClearCount: 1,
    resetType: 'Daily',
    taskType: 'Event',
    isPerAccount: false,
    startDate: new Date('2024-08-28T00:00:00Z'),
    endDate: new Date('2024-10-08T23:59:59Z')
  }
]

const EVENT_2024_10_NIGHT_TROUPE: Task[] = [
  {
    taskId: '2024-10-nighttroupe-coin-cap',
    name: 'Night Troupe Coin Cap',
    maxClearCount: 1,
    resetType: 'Daily',
    taskType: 'Event',
    isPerAccount: false,
    startDate: new Date('2024-10-09T00:00:00Z'),
    endDate: new Date('2024-11-19T23:59:59Z')
  },
  {
    taskId: '2024-10-nighttroupe-punch-king',
    name: 'Night Troupe Punch King Blockulatus',
    maxClearCount: 1,
    resetType: 'Weekly_Wednesday',
    taskType: 'Event',
    isPerAccount: false,
    startDate: new Date('2024-10-16T00:00:00Z'),
    endDate: new Date('2024-11-19T23:59:59Z')
  },
  {
    taskId: '2024-10-nighttroupe-claw-machine',
    name: 'Night Troupe Claw Machine Minigame',
    maxClearCount: 1,
    resetType: 'Daily',
    taskType: 'Event',
    isPerAccount: false,
    startDate: new Date('2024-10-16T00:00:00Z'),
    endDate: new Date('2024-11-19T23:59:59Z')
  },
  {
    taskId: '2024-10-nighttroupe-bumper-car',
    name: 'Night Troupe Bumper Car Minigame',
    maxClearCount: 1,
    resetType: 'Weekly_Wednesday',
    taskType: 'Event',
    isPerAccount: false,
    startDate: new Date('2024-10-23T00:00:00Z'),
    endDate: new Date('2024-11-19T23:59:59Z')
  },
  {
    taskId: '2024-10-nighttroupe-candy-dispenser',
    name: 'Night Troupe Lucky Candy Dispenser',
    maxClearCount: 1,
    resetType: 'Daily',
    taskType: 'Event',
    isPerAccount: false,
    startDate: new Date('2024-10-30T00:00:00Z'),
    endDate: new Date('2024-11-19T23:59:59Z')
  },
  {
    taskId: '2024-10-rockspirit-checkin',
    name: 'Rock Spirit Giveaway Checkin',
    maxClearCount: 1,
    resetType: 'Daily',
    taskType: 'Event',
    isPerAccount: false,
    startDate: new Date('2024-10-09T00:00:00Z'),
    endDate: new Date('2024-11-19T23:59:59Z')
  },
  {
    taskId: '2024-10-fashion-week',
    name: 'Fashion Week Daily Reward',
    maxClearCount: 1,
    resetType: 'Daily',
    taskType: 'Event',
    isPerAccount: false,
    startDate: new Date('2024-10-23T00:00:00Z'),
    endDate: new Date('2024-11-19T23:59:59Z')
  },
  {
    taskId: '2024-10-legion-relay',
    name: 'Legion Relay Daily Missions',
    maxClearCount: 1,
    resetType: 'Daily',
    taskType: 'Event',
    isPerAccount: false,
    startDate: new Date('2024-11-06T00:00:00Z'),
    endDate: new Date('2024-11-19T23:59:59Z')
  }
]

const EVENT_2024_11_DARK_RIDE: Task[] = [
  {
    taskId: '2024-11-remaster-aran-checkin',
    name: 'Aran Remaster Check In',
    maxClearCount: 1,
    resetType: 'Daily',
    taskType: 'Event',
    isPerAccount: true,
    startDate: new Date('2024-11-20T00:00:00Z'),
    endDate: new Date('2025-02-11T23:59:59Z')
  },
  {
    taskId: '2024-11-remaster-shade-checkin',
    name: 'Shade Remaster Check In',
    maxClearCount: 1,
    resetType: 'Daily',
    taskType: 'Event',
    isPerAccount: true,
    startDate: new Date('2024-11-20T00:00:00Z'),
    endDate: new Date('2025-02-11T23:59:59Z')
  },
  {
    taskId: '2024-11-darkride-weekly-participation',
    name: 'Dark Ride Complete Challenges',
    maxClearCount: 1,
    resetType: 'Weekly_Wednesday',
    taskType: 'Event',
    isPerAccount: true,
    startDate: new Date('2024-11-20T00:00:00Z'),
    endDate: new Date('2025-02-11T23:59:59Z')
  },
  {
    taskId: '2024-11-memories-basic-research',
    name: 'Book of Forgotten Festivals Basic Research',
    maxClearCount: 1,
    resetType: 'Daily',
    taskType: 'Event',
    isPerAccount: true,
    startDate: new Date('2024-11-20T00:00:00Z'),
    endDate: new Date('2025-01-14T23:59:59Z')
  },
  {
    taskId: '2024-11-memories-advanced-research',
    name: 'Book of Forgotten Festivals 3x Advanced Research',
    maxClearCount: 1,
    resetType: 'Weekly_Wednesday',
    taskType: 'Event',
    isPerAccount: true,
    startDate: new Date('2024-11-20T00:00:00Z'),
    endDate: new Date('2025-01-14T23:59:59Z')
  },
  {
    taskId: '2024-11-memories-punch-king',
    name: 'Preserving Secret Records Punch King',
    maxClearCount: 1,
    resetType: 'Weekly_Wednesday',
    taskType: 'Event',
    isPerAccount: true,
    startDate: new Date('2024-11-20T00:00:00Z'),
    endDate: new Date('2025-01-14T23:59:59Z')
  }
]

const EVENT_2024_12_DARK_MAPLEMAS: Task[] = [
  {
    taskId: '2024-12-burning-express-checkin',
    name: 'Burning Express Check In',
    maxClearCount: 1,
    resetType: 'Daily',
    taskType: 'Event',
    isPerAccount: true,
    startDate: new Date('2024-12-17T00:00:00Z'),
    endDate: new Date('2025-01-14T23:59:59Z')
  },
  {
    taskId: '2024-12-dark-maplemas-ornaments',
    name: 'Maplemas Place 10 Tree Ornaments',
    maxClearCount: 1,
    resetType: 'Daily',
    taskType: 'Event',
    isPerAccount: true,
    startDate: new Date('2024-12-17T00:00:00Z'),
    endDate: new Date('2025-01-14T23:59:59Z')
  },
  {
    taskId: '2024-12-dark-maplemas-login-time',
    name: 'Maplemas Play for 5 Hours',
    maxClearCount: 1,
    resetType: 'Daily',
    taskType: 'Event',
    isPerAccount: true,
    startDate: new Date('2024-12-17T00:00:00Z'),
    endDate: new Date('2025-01-14T23:59:59Z')
  },
  {
    taskId: '2024-12-dark-maplemas-holy-fright',
    name: 'Maplemas Clear O Holy Fright 5 times',
    maxClearCount: 1,
    resetType: 'Weekly_Wednesday',
    taskType: 'Event',
    isPerAccount: true,
    startDate: new Date('2024-12-17T00:00:00Z'),
    endDate: new Date('2025-01-14T23:59:59Z')
  },
  {
    taskId: '2024-12-dark-maplemas-slay-ride',
    name: 'Maplemas Clear Slay Ride 5 times',
    maxClearCount: 1,
    resetType: 'Weekly_Wednesday',
    taskType: 'Event',
    isPerAccount: true,
    startDate: new Date('2024-12-17T00:00:00Z'),
    endDate: new Date('2025-01-14T23:59:59Z')
  },
  {
    taskId: '2024-12-new-year-blue-snake-checkin',
    name: 'Complete Blue Snake Altar ',
    maxClearCount: 1,
    resetType: 'Daily',
    taskType: 'Event',
    isPerAccount: true,
    startDate: new Date('2025-01-01T00:00:00Z'),
    endDate: new Date('2025-01-07T23:59:59Z')
  }
]

const EVENT_2025_01_EXTRADIMENSIONAL_VISITORS: Task[] = [
  {
    taskId: '2025-01-Champion-Burning-Double-Up-Points',
    name: 'Champion Double Up Cap Weekly Points',
    maxClearCount: 1,
    resetType: 'Weekly_Thursday',
    taskType: 'Event',
    isPerAccount: true,
    startDate: new Date('2025-01-15T00:00:00Z'),
    endDate: new Date('2025-03-18T23:59:59Z')
  },
  {
    taskId: '2025-01-Champion-Burning-Double-Up-Checkin',
    name: 'Champion Double Up 3x Coin Checkin',
    maxClearCount: 1,
    resetType: 'Weekly_Thursday',
    taskType: 'Event',
    isPerAccount: true,
    startDate: new Date('2025-01-15T00:00:00Z'),
    endDate: new Date('2025-03-18T23:59:59Z')
  },
  {
    taskId: '2025-01-Extradimensional-Visitors-Basic-Draft',
    name: 'Blueprints for Tirnog Basic Draft',
    maxClearCount: 1,
    resetType: 'Daily',
    taskType: 'Event',
    isPerAccount: true,
    startDate: new Date('2025-01-15T00:00:00Z'),
    endDate: new Date('2025-03-18T23:59:59Z')
  },
  {
    taskId: '2025-01-Extradimensional-Visitors-Detailed-Draft',
    name: 'Blueprints for Tirnog 3x Detailed Draft',
    maxClearCount: 1,
    resetType: 'Weekly_Wednesday',
    taskType: 'Event',
    isPerAccount: true,
    startDate: new Date('2025-01-15T00:00:00Z'),
    endDate: new Date('2025-03-18T23:59:59Z')
  },
  {
    taskId: '2025-01-Extradimensional-Visitors-Expedition',
    name: 'Dimensional Crack Expedition',
    maxClearCount: 1,
    resetType: 'Daily',
    taskType: 'Event',
    isPerAccount: true,
    startDate: new Date('2025-01-15T00:00:00Z'),
    endDate: new Date('2025-02-11T23:59:59Z')
  },
  {
    taskId: '2025-01-Extradimensional-Visitors-Hashtag',
    name: 'Tirnog Hashtag Check In',
    maxClearCount: 1,
    resetType: 'Daily',
    taskType: 'Event',
    isPerAccount: true,
    startDate: new Date('2025-02-12T00:00:00Z'),
    endDate: new Date('2025-03-18T23:59:59Z')
  }
]

const EVENT_2025_03_KIMETSU_NO_YAIBA: Task[] = [
  {
    taskId: '2025-03-KnY-Check-In',
    name: 'Demon Slayer Training Journal Check In',
    maxClearCount: 1,
    resetType: 'Daily',
    taskType: 'Event',
    isPerAccount: true,
    startDate: new Date('2025-03-19T00:00:00Z'),
    endDate: new Date('2025-04-28T23:59:59Z')
  },
  {
    taskId: '2025-03-KnY-Gourd-Training-Test',
    name: 'Demon Slayer Gourd Training Test',
    maxClearCount: 1,
    resetType: 'Daily',
    taskType: 'Event',
    isPerAccount: true,
    startDate: new Date('2025-04-02T00:00:00Z'),
    endDate: new Date('2025-04-28T23:59:59Z')
  },
  {
    taskId: '2025-03-KnY-Coin-Flip-Challenge',
    name: 'Demon Slayer Coin Flip Challenge',
    maxClearCount: 1,
    resetType: 'Daily',
    taskType: 'Event',
    isPerAccount: true,
    startDate: new Date('2025-04-16T00:00:00Z'),
    endDate: new Date('2025-04-28T23:59:59Z')
  },
  {
    taskId: '2025-03-rockspirit-checkin',
    name: 'Rock Spirit Giveaway Checkin',
    maxClearCount: 1,
    resetType: 'Daily',
    taskType: 'Event',
    isPerAccount: false,
    startDate: new Date('2025-03-19T00:00:00Z'),
    endDate: new Date('2025-04-28T23:59:59Z')
  }
]

const EVENT_2025_04_VICTORIA_CUP: Task[] = [
  {
    taskId: '2025-04-VC-Daily-Checkin',
    name: 'Victoria Cup Stamp Book Check In',
    maxClearCount: 1,
    resetType: 'Daily',
    taskType: 'Event',
    isPerAccount: true,
    startDate: new Date('2025-04-29T00:00:00Z'),
    endDate: new Date('2025-06-10T23:59:59Z')
  },
  {
    taskId: '2025-04-VC-Minigame-Checkin',
    name: 'Victoria Cup Colection Book Check In',
    maxClearCount: 1,
    resetType: 'Daily',
    taskType: 'Event',
    isPerAccount: true,
    startDate: new Date('2025-04-29T00:00:00Z'),
    endDate: new Date('2025-06-10T23:59:59Z')
  },
  {
    taskId: '2025-04-VC-Goodbye-Checkin',
    name: 'Goodbye Victoria Cup Check In',
    maxClearCount: 1,
    resetType: 'Daily',
    taskType: 'Event',
    isPerAccount: true,
    startDate: new Date('2025-05-28T00:00:00Z'),
    endDate: new Date('2025-06-10T23:59:59Z')
  },
  {
    taskId: '2025-04-VC-Trophy',
    name: 'Victoria Cup Earn Boss Trophies',
    maxClearCount: 1,
    resetType: 'Weekly_Thursday',
    taskType: 'Event',
    isPerAccount: true,
    startDate: new Date('2025-04-29T00:00:00Z'),
    endDate: new Date('2025-06-10T23:59:59Z')
  },
  {
    taskId: '2025-04-VC-Punch-King',
    name: 'Victoria Cup Balloon Pop Punch King',
    maxClearCount: 1,
    resetType: 'Weekly_Wednesday',
    taskType: 'Event',
    isPerAccount: true,
    startDate: new Date('2025-04-29T00:00:00Z'),
    endDate: new Date('2025-06-10T23:59:59Z')
  },
  {
    taskId: '2025-04-VC-Snack-Break',
    name: 'Victoria Cup Snack Break',
    maxClearCount: 1,
    resetType: 'Daily',
    taskType: 'Event',
    isPerAccount: true,
    startDate: new Date('2025-04-29T00:00:00Z'),
    endDate: new Date('2025-06-10T23:59:59Z')
  },
  {
    taskId: '2025-04-VC-Running',
    name: 'Victoria Cup Long Distance Running Point Cap',
    maxClearCount: 1,
    resetType: 'Daily',
    taskType: 'Event',
    isPerAccount: true,
    startDate: new Date('2025-04-29T00:00:00Z'),
    endDate: new Date('2025-05-20T23:59:59Z')
  },
  {
    taskId: '2025-04-Hit-The-Road-Checkin',
    name: 'Hit the Road Check In',
    maxClearCount: 1,
    resetType: 'Daily',
    taskType: 'Event',
    isPerAccount: true,
    startDate: new Date('2025-05-28T00:00:00Z'),
    endDate: new Date('2025-06-24T23:59:59Z')
  }
]

const EVENT_2025_06_STARGAZER: Task[] = [
  {
    taskId: '2025-06-Daily-Feast-Prep',
    name: 'Morning Star Feast Daily Feast Prep',
    maxClearCount: 1,
    resetType: 'Daily',
    taskType: 'Event',
    isPerAccount: true,
    startDate: new Date('2025-06-11T00:00:00Z'),
    endDate: new Date('2025-08-26T23:59:59Z')
  },
  {
    taskId: '2025-06-Special-Feast-Prep',
    name: 'Morning Star Feast Special Feast Prep x3',
    maxClearCount: 1,
    resetType: 'Weekly_Wednesday',
    taskType: 'Event',
    isPerAccount: true,
    startDate: new Date('2025-06-11T00:00:00Z'),
    endDate: new Date('2025-08-26T23:59:59Z')
  },
  {
    taskId: '2025-06-Boss-Badges',
    name: 'Earn Boss Victory Badges',
    maxClearCount: 1,
    resetType: 'Weekly_Thursday',
    taskType: 'Event',
    isPerAccount: true,
    startDate: new Date('2025-06-11T00:00:00Z'),
    endDate: new Date('2025-08-26T23:59:59Z')
  },
  {
    taskId: '2025-06-Challenger-World-Hunting-Mission',
    name: 'Challenger World Hunting Mission',
    maxClearCount: 1,
    resetType: 'Daily',
    taskType: 'Event',
    isPerAccount: true,
    startDate: new Date('2025-06-11T00:00:00Z'),
    endDate: new Date('2025-09-24T02:00:00Z')
  }
]

const EVENT_2025_07_DAVE_THE_DIVER: Task[] = [
  {
    taskId: '2025-07-Dave-The-Diver-Blue-Hole',
    name: 'Daily Blue Hole Exploration Preparation',
    maxClearCount: 1,
    resetType: 'Daily',
    taskType: 'Event',
    isPerAccount: true,
    startDate: new Date('2025-07-16T00:00:00Z'),
    endDate: new Date('2025-08-26T23:59:59Z')
  },
  {
    taskId: '2025-07-Ride-Or-Die',
    name: 'Clear Ride or Die Bosses',
    maxClearCount: 1,
    resetType: 'Weekly_Wednesday',
    taskType: 'Event',
    isPerAccount: true,
    startDate: new Date('2025-07-16T00:00:00Z'),
    endDate: new Date('2025-08-26T23:59:59Z')
  },
  {
    taskId: '2025-07-Morning-Star-Fountain',
    name: 'Morning Star Fountain Check In',
    maxClearCount: 1,
    resetType: 'Daily',
    taskType: 'Event',
    isPerAccount: true,
    startDate: new Date('2025-07-16T00:00:00Z'),
    endDate: new Date('2025-08-05T23:59:59Z')
  },
  {
    taskId: '2025-07-Morning-Star-Fountain-Challenger-World',
    name: 'Morning Star Fountain Challenger World Check In',
    maxClearCount: 1,
    resetType: 'Daily',
    taskType: 'Event',
    isPerAccount: true,
    startDate: new Date('2025-07-16T00:00:00Z'),
    endDate: new Date('2025-08-05T23:59:59Z')
  },
  {
    taskId: '2025-08-Burning-Express-Check-In',
    name: 'Burning Express Check In',
    maxClearCount: 1,
    resetType: 'Daily',
    taskType: 'Event',
    isPerAccount: true,
    startDate: new Date('2025-08-13T00:00:00Z'),
    endDate: new Date('2025-09-05T23:59:59Z')
  }
]

const EVENT_2025_08_NIGHT_TROUPE: Task[] = [
  {
    taskId: '2025-08-Night-Troupe-Coin-Cap',
    name: 'Night Troupe Coin Cap',
    maxClearCount: 1,
    resetType: 'Daily',
    taskType: 'Event',
    isPerAccount: true,
    startDate: new Date('2025-08-27T00:00:00Z'),
    endDate: new Date('2025-09-23T23:59:59Z')
  },
  {
    taskId: '2025-08-Night-Troupe-Acuity-Training',
    name: 'Night Troupe Acuity Training Minigame',
    maxClearCount: 1,
    resetType: 'Daily',
    taskType: 'Event',
    isPerAccount: true,
    startDate: new Date('2025-09-10T00:00:00Z'),
    endDate: new Date('2025-09-23T23:59:59Z')
  },
  {
    taskId: '2025-08-Night-Troupe-Fortune-Sticks',
    name: 'Night Troupe Fortune Sticks Minigame',
    maxClearCount: 1,
    resetType: 'Daily',
    taskType: 'Event',
    isPerAccount: true,
    startDate: new Date('2025-09-17T00:00:00Z'),
    endDate: new Date('2025-09-23T23:59:59Z')
  },
  {
    taskId: '2025-08-Night-Troupe-Mu-Lung-Challenge',
    name: 'Night Troupe Mu Lung Night Challenge',
    maxClearCount: 1,
    resetType: 'Weekly_Wednesday',
    taskType: 'Event',
    isPerAccount: true,
    startDate: new Date('2025-09-03T00:00:00Z'),
    endDate: new Date('2025-09-23T23:59:59Z')
  },
  {
    taskId: '2025-08-Champion-Burning-Double-Up-Points',
    name: 'Champion Double Up Cap Weekly Points',
    maxClearCount: 1,
    resetType: 'Weekly_Thursday',
    taskType: 'Event',
    isPerAccount: true,
    startDate: new Date('2025-08-27T00:00:00Z'),
    endDate: new Date('2025-10-21T23:59:59Z')
  },
  {
    taskId: '2025-08-Champion-Burning-Double-Up-Checkin',
    name: 'Champion Double Up 3x Coin Checkin',
    maxClearCount: 1,
    resetType: 'Weekly_Thursday',
    taskType: 'Event',
    isPerAccount: true,
    startDate: new Date('2025-08-27T00:00:00Z'),
    endDate: new Date('2025-10-21T23:59:59Z')
  }
]

const EVENT_2025_09_STRANGE_TIDES: Task[] = [
  {
    taskId: '2025-09-Carcion-Octo-Fest-Daily-Prep',
    name: 'Carcion Octo Daily Fest Prep',
    maxClearCount: 1,
    resetType: 'Daily',
    taskType: 'Event',
    isPerAccount: true,
    startDate: new Date('2025-09-24T00:00:00Z'),
    endDate: new Date('2025-11-11T23:59:59Z')
  },
  {
    taskId: '2025-09-Carcion-Octo-Fest-Weekly-Prep',
    name: 'Carcion Octo Weekly Fest Prep x3',
    maxClearCount: 1,
    resetType: 'Weekly_Wednesday',
    taskType: 'Event',
    isPerAccount: true,
    startDate: new Date('2025-09-24T00:00:00Z'),
    endDate: new Date('2025-11-11T23:59:59Z')
  },
  {
    taskId: '2025-09-Octo-Hunt',
    name: 'Octo Hunt',
    maxClearCount: 1,
    resetType: 'Weekly_Wednesday',
    taskType: 'Event',
    isPerAccount: true,
    startDate: new Date('2025-09-24T00:00:00Z'),
    endDate: new Date('2025-11-11T23:59:59Z')
  },
  {
    taskId: '2025-09-Raise-A-Golden-Octopus',
    name: 'Raise a Golden Octopus',
    maxClearCount: 1,
    resetType: 'Weekly_Wednesday',
    taskType: 'Event',
    isPerAccount: true,
    startDate: new Date('2025-09-24T00:00:00Z'),
    endDate: new Date('2025-11-11T23:59:59Z')
  },
  {
    taskId: '2025-09-Strange-Tides-Luxe-Sauna',
    name: 'Luxe Sauna',
    maxClearCount: 1,
    resetType: 'Weekly_Thursday',
    taskType: 'Event',
    isPerAccount: true,
    startDate: new Date('2025-09-24T00:00:00Z'),
    endDate: new Date('2025-10-21T23:59:59Z')
  },
  {
    taskId: '2025-09-Strange-Tides-Haunted-Mansion',
    name: 'Haunted Mansion',
    maxClearCount: 1,
    resetType: 'Daily',
    taskType: 'Event',
    isPerAccount: true,
    startDate: new Date('2025-10-22T00:00:00Z'),
    endDate: new Date('2025-11-04T23:59:59Z')
  },
  {
    taskId: '2025-09-Strange-Tides-Winter-Countdown',
    name: 'Winter Countdown',
    maxClearCount: 1,
    resetType: 'Daily',
    taskType: 'Event',
    isPerAccount: true,
    startDate: new Date('2025-10-15T00:00:00Z'),
    endDate: new Date('2025-11-11T23:59:59Z')
  }
]

const EVENT_2025_11_ASSEMBLE: Task[] = [
  {
    taskId: '2025-11-Assemble-Wanderers-Travelogue-Weekly-Missions',
    name: 'Wanderer\'s Travelogue Weekly Missions',
    maxClearCount: 1,
    resetType: 'Weekly_Wednesday',
    taskType: 'Event',
    isPerAccount: true,
    startDate: new Date('2025-11-12T00:00:00Z'),
    endDate: new Date('2026-02-03T23:59:59Z')
  },
  {
    taskId: '2025-11-Assemble-Challenger-World-Hunting-Mission',
    name: 'Challenger World Hunting Mission',
    maxClearCount: 1,
    resetType: 'Daily',
    taskType: 'Event',
    isPerAccount: true,
    startDate: new Date('2025-11-12T00:00:00Z'),
    endDate: new Date('2026-04-22T14:00:00Z')
  },
  {
    taskId: '2025-11-Assemble-Challenger-Pass-Weekly-Missions',
    name: 'Challenger Pass Weekly Missions',
    maxClearCount: 1,
    resetType: 'Weekly_Wednesday',
    taskType: 'Event',
    isPerAccount: true,
    startDate: new Date('2025-11-12T00:00:00Z'),
    endDate: new Date('2026-02-03T23:59:59Z')
  },
  {
    taskId: '2025-11-Assemble-Frontier-Pass-Weekly-Missions',
    name: 'Frontier Pass Weekly Missions',
    maxClearCount: 1,
    resetType: 'Weekly_Wednesday',
    taskType: 'Event',
    isPerAccount: true,
    startDate: new Date('2025-11-12T00:00:00Z'),
    endDate: new Date('2026-04-21T23:59:59Z')
  },
  {
    taskId: '2025-11-Assemble-Evernias-Bounty-Exploration',
    name: 'Evernia\'s Bounty Exploration',
    maxClearCount: 1,
    resetType: 'Daily',
    taskType: 'Event',
    isPerAccount: true,
    startDate: new Date('2025-11-12T00:00:00Z'),
    endDate: new Date('2026-02-03T23:59:59Z')
  },
  {
    taskId: '2025-11-Assemble-Sands-of-Time-Cap',
    name: 'Sands of Time Cap',
    maxClearCount: 1,
    resetType: 'Weekly_Wednesday',
    taskType: 'Event',
    isPerAccount: true,
    startDate: new Date('2025-11-12T00:00:00Z'),
    endDate: new Date('2026-02-03T23:59:59Z')
  }
]

const EVENT_2025_11_ASSEMBLE_PART2: Task[] = [
  {
    taskId: '2025-12-Ride-or-Die-Bosses',
    name: 'Ride or Die Bosses',
    maxClearCount: 1,
    resetType: 'Weekly_Wednesday',
    taskType: 'Event',
    isPerAccount: true,
    startDate: new Date('2025-12-17T00:00:00Z'),
    endDate: new Date('2026-02-03T23:59:59Z')
  },
  {
    taskId: '2025-12-Evernian-Trade-King-Alpaca-Merchant',
    name: 'Alpaca Merchant All 3 Trades',
    maxClearCount: 1,
    resetType: 'Weekly_Wednesday',
    taskType: 'Event',
    isPerAccount: true,
    startDate: new Date('2025-12-17T00:00:00Z'),
    endDate: new Date('2026-01-13T23:59:59Z')
  },
  {
    taskId: '2026-1-Evernia-In-Bloom',
    name: 'Bloom 10 Wildflowers',
    maxClearCount: 1,
    resetType: 'Daily',
    taskType: 'Event',
    isPerAccount: true,
    startDate: new Date('2026-01-21T00:00:00Z'),
    endDate: new Date('2026-02-03T23:59:59Z')
  },
  {
    taskId: '2025-12-Twenteenas-Adventure-Day',
    name: 'Defeat Twenteena 10 Times',
    maxClearCount: 1,
    resetType: 'Daily',
    taskType: 'Event',
    isPerAccount: true,
    startDate: new Date('2025-12-17T00:00:00Z'),
    endDate: new Date('2026-02-03T23:59:59Z')
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
    EVENT_2023_12_ABYSS_EXPEDITION_TASKS,
    EVENT_2024_02_V248_TASKS,
    EVENT_2024_02_KONOSUBA_TASKS,
    EVENT_2024_03_MINAR_FOREST_TASKS,
    EVENT_2024_05_MAYPLE_ISLAND,
    EVENT_2024_06_GO_WEST,
    EVENT_2024_07_GO_WEST,
    EVENT_2024_08_BUGCAT,
    EVENT_2024_10_NIGHT_TROUPE,
    EVENT_2024_11_DARK_RIDE,
    EVENT_2024_12_DARK_MAPLEMAS,
    EVENT_2025_01_EXTRADIMENSIONAL_VISITORS,
    EVENT_2025_03_KIMETSU_NO_YAIBA,
    EVENT_2025_04_VICTORIA_CUP,
    EVENT_2025_06_STARGAZER,
    EVENT_2025_07_DAVE_THE_DIVER,
    EVENT_2025_08_NIGHT_TROUPE,
    EVENT_2025_09_STRANGE_TIDES,
    EVENT_2025_11_ASSEMBLE,
    EVENT_2025_11_ASSEMBLE_PART2
  ]
    .flat()
}

const GROUPED_TASKS: GroupedTasks[] = [
  EVENT_TASKS,
  SACRED_SYMBOL_DAILIES,
  ARCANE_SYMBOL_DAILIES,
  SIXTH_JOB_DAILIES,
  OTHER_DAILIES,
  DAILY_BOSSES,
  WEEKLY_BOSSES,
  MONTHLY_BLACK_MAGE,
  ARCANE_SYMBOL_WEEKLIES,
  GUILD_TASKS,
  LEGION_TASKS,
  MVP_TASKS,
  OTHER_WEEKLIES,
  THREADS_OF_FATE
].map(filterInactiveTasks)

export const PREDEFINED_TASKS = new TaskList(GROUPED_TASKS)
