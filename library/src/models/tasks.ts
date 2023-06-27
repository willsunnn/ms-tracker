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
  userId: z.string(),
  characterId: z.string().nullable(),
  taskId: z.string(),
  clearTimes: z.array(z.date()),
  isPriority: z.boolean(),
});
export type TaskStatus = z.infer<typeof TaskStatus>

// TaskAndStatus
export const TaskAndStatus = z.intersection(Task, TaskStatus);
export type TaskAndStatus = z.infer<typeof TaskAndStatus>

// TaskStatusForCharacter
export type TaskStatusForCharacter = Map<string, TaskStatus>;
export const emptyTaskStatusForCharacter = () => {
  return new Map<string, TaskStatus>();
};

// TaskStatusForAccount
export type TaskStatusForAccount = Map<string | null, TaskStatusForCharacter>;
export const emptyTaskStatusForAcccount = () => {
  return new Map<string | null, TaskStatusForCharacter>();
};
