import { type Task } from 'ms-tracker-library'
import HardHillaIcon from '../resources/tasks/hard-hilla.gif'

export const TASK_LIST: Task[] = [
  {
    taskId: 'boss-weekly-hilla',
    name: 'Hard Hilla',
    maxClearCount: 1,
    resetType: 'Weekly_Thursday',
    taskType: 'Boss',
    isPerAccount: false,
    imageIcon: HardHillaIcon
  },
  // {
  //     taskId: "boss-weekly-pink-bean",
  //     name: "Chaos Pink Bean",
  //     maxClearCount: 1,
  //     resetType: "Weekly_Thursday",
  //     taskType: "Boss"
  // },
  // {
  //     taskId: "boss-weekly-cygnus",
  //     name: "Easy/Normal Cygnus",
  //     maxClearCount: 1,
  //     resetType: "Weekly_Thursday",
  //     taskType: "Boss"
  // },
  // {
  //     taskId: "boss-weekly-zakum",
  //     name: "Chaos Zakum",
  //     maxClearCount: 1,
  //     resetType: "Weekly_Thursday",
  //     taskType: "Boss"
  // },
  // {
  //     taskId: "boss-weekly-von-bon",
  //     name: "Chaos Von Bon",
  //     maxClearCount: 1,
  //     resetType: "Weekly_Thursday",
  //     taskType: "Boss"
  // },
  // {
  //     taskId: "boss-weekly-pierre",
  //     name: "Chaos Pierre",
  //     maxClearCount: 1,
  //     resetType: "Weekly_Thursday",
  //     taskType: "Boss"
  // },
  // {
  //     taskId: "boss-weekly-crimson-queen",
  //     name: "Chaos Crimson Queen",
  //     maxClearCount: 1,
  //     resetType: "Weekly_Thursday",
  //     taskType: "Boss"
  // },
  // {
  //     taskId: "boss-weekly-vellum",
  //     name: "Chaos Vellum",
  //     maxClearCount: 1,
  //     resetType: "Weekly_Thursday",
  //     taskType: "Boss"
  // },
  // {
  //     taskId: "claim-boss-coins",
  //     name: "Wongstaunt Boss Coins",
  //     maxClearCount: 1,
  //     resetType: "Weekly_Wednesday",
  //     taskType: "Other"
  // },
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
    resetType: 'Weekly_Sunday',
    taskType: 'Guild',
    isPerAccount: false
  },
  {
    taskId: 'boss-monthly-black-mage',
    name: 'Black Mage',
    maxClearCount: 1,
    resetType: 'Monthly',
    taskType: 'Boss',
    isPerAccount: false
  },
  {
    taskId: 'sacred-odium',
    name: 'Odium Dailies',
    maxClearCount: 1,
    resetType: 'Daily',
    taskType: 'SacredSymbol',
    isPerAccount: false
  }
]

export const TASK_MAP = new Map(TASK_LIST.map((task) => [task.taskId, task]))
