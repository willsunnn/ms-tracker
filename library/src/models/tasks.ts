/* eslint @typescript-eslint/no-redeclare: "off" */ // linter conflicts with zod usage documentation

import {z} from "zod";

// ResetType
const ResetType = z.enum([
  "Daily",
  "Monthly",
  "Weekly_Monday",
  "Weekly_Tuesday",
  "Weekly_Wednesday",
  "Weekly_Thursday",
  "Weekly_Friday",
  "Weekly_Saturday",
  "Weekly_Sunday",
]);
export type ResetType = z.infer<typeof ResetType>

// TaskType
const TaskType = z.enum([
  "Boss",
  "Ursus",
  "ArcaneSymbol",
  "SacredSymbol",
  "Guild",
  "Other",
]);
export type TaskType = z.infer<typeof TaskType>

// Task
const Task = z.object({
  taskId: z.string(),
  name: z.string(),
  maxClearCount: z.number(),
  resetType: ResetType,
  taskType: TaskType,
  isPerAccount: z.boolean(),
  imageIcon: z.string().optional(),
});
export type Task = z.infer<typeof Task>

// TaskStatus
export const TaskStatus = z.object({
  taskId: z.string(),
  clearTimes: z.array(z.date()),
  isPriority: z.boolean(),
});
export type TaskStatus = z.infer<typeof TaskStatus>

// TaskAndStatus
export const TaskAndStatus = z.intersection(Task, TaskStatus);
export type TaskAndStatus = z.infer<typeof TaskAndStatus>

export type TaskStatusForCharacter = Record<string, TaskStatus>

// TaskStatusForAccount
export const TaskStatusForAccount = z.object({
  accountTasks: z.record(TaskStatus),
  characterTasks: z.record(z.record(TaskStatus)),
});
export type TaskStatusForAccount = z.infer<typeof TaskStatusForAccount>
export const defaultTaskStatusForAccount: () => TaskStatusForAccount = () => {
  return {
    accountTasks: {},
    characterTasks: {},
  };
};
