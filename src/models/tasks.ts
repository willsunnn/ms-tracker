/*eslint @typescript-eslint/no-redeclare: "off" */ // linter conflicts with zod usage documentation

import { z } from 'zod';

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

export const lastReset: (_:ResetType)=>Date = (resetType: ResetType) => {
    const now = new Date();
    return now;
}

export const nextReset: (_:ResetType)=>Date = (resetType: ResetType) => {
    const now = new Date();
    return now;
}

// TaskType
const TaskType = z.enum([
    "Boss",
    "Ursus",
    "ArcaneSymbol",
    "SacredSymbol",
    "Other",
])
export type TaskType = z.infer<typeof TaskType>

// Task
const Task = z.object({
    taskId: z.string(),
    name: z.string(),
    maxClearCount: z.number(),
    resetType: ResetType,
    taskType: TaskType,
    imageIcon: z.string().optional(),
})
export type Task = z.infer<typeof Task>

// TaskStatus
export const TaskStatus = z.object({
    taskId: z.string(),
    clearTimes: z.array(z.date()),
    isPriority: z.boolean(),
})
export type TaskStatus = z.infer<typeof TaskStatus>;
export const defaultTaskStatus: (_:string)=>TaskStatus = (taskId: string) => {
    return {
        taskId,
        clearTimes: [],
        isPriority: false
    }
}

// TaskAndStatus
export const TaskAndStatus = z.intersection(Task, TaskStatus);
export type TaskAndStatus = z.infer<typeof TaskAndStatus>

// TaskStatusForCharacter
export const TaskStatusForCharacter = z.object({
    taskStatus: z.map(z.string(), TaskStatus),
    characterName: z.string(),
})
export type TaskStatusForCharacter = z.infer<typeof TaskStatusForCharacter>;
export const defaultTaskStatusForCharacter: (_:string)=>TaskStatusForCharacter = (characterName: string) => {
    return {
        characterName,
        taskStatus: new Map<string, TaskStatus>()
    }
}

// TaskStatusForAccount
export const TaskStatusForAccount = z.map(z.string(), TaskStatusForCharacter);
export type TaskStatusForAccount = z.infer<typeof TaskStatusForAccount>;
export const defaultTaskStatusForAccount: ()=>TaskStatusForAccount = () => {
    return new Map<string, TaskStatusForCharacter>();
}