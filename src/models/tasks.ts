import AllTasksJson from './tasks.json';
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
})
export type Task = z.infer<typeof Task>
export const AllTasks = AllTasksJson.map((json) => Task.parse(json));

// TaskStatus
export const TaskStatus = z.object({
    taskId: z.string(),
    clearTimes: z.array(z.date()),
    isPriority: z.boolean(),
})
export type TaskStatus = z.infer<typeof TaskStatus>;

// TaskAndStatus
export const TaskAndStatus = z.intersection(Task, TaskStatus);
export type TaskAndStatus = z.infer<typeof TaskAndStatus>

// TaskStatusesForCharacter and TaskAndStatusesForCharacter
export const TaskStatusesForCharacter = z.object({
    taskStatuses: z.array(TaskStatus),
    characterName: z.string(),
})
export type TaskStatusesForCharacter = z.infer<typeof TaskStatusesForCharacter>;
export const TaskAndStatusesForCharacter = z.object({
    taskStatuses: z.array(TaskAndStatus),
    characterName: z.string(),
})
export type TaskAndStatusesForCharacter = z.infer<typeof TaskAndStatusesForCharacter>;

// TaskStatusesForAccount and TaskAndStatusesForAccount
export const TaskStatusesForAccount = z.object({
    characters: z.array(TaskStatusesForCharacter)
});
export type TaskStatusesForAccount = z.infer<typeof TaskStatusesForAccount>;
export const TaskAndStatusesForAccount = z.object({
    characters: z.array(TaskAndStatusesForCharacter)
});
export type TaskAndStatusesForAccount = z.infer<typeof TaskAndStatusesForAccount>;

// TaskAndStatus
export type TaskAndStatusForCharacter = {
    tasks: TaskAndStatus[],
    characterName: string,
}
export type TaskAndStatusForAccount = {
    characters: TaskAndStatusForCharacter[]
}