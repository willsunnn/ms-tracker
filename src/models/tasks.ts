/*eslint @typescript-eslint/no-redeclare: "off" */ // linter conflicts with zod usage documentation

import { z } from 'zod';
import { TASK_MAP } from './PredefinedTasks';

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
])
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
})
export type Task = z.infer<typeof Task>

// TaskStatus
export const TaskStatus = z.object({
    taskId: z.string(),
    clearTimes: z.array(z.date()),
    isPriority: z.boolean(),
})
export type TaskStatus = z.infer<typeof TaskStatus>;
export const defaultTaskStatus: (taskId: string)=>TaskStatus = (taskId: string) => {
    return {
        taskId,
        clearTimes: [],
        isPriority: false
    }
}

// TaskAndStatus
export const TaskAndStatus = z.intersection(Task, TaskStatus);
export type TaskAndStatus = z.infer<typeof TaskAndStatus>;

export type TaskStatusForCharacter = Record<string,TaskStatus>;

// TaskStatusForAccount
export const TaskStatusForAccount = z.object({
    accountTasks: z.record(TaskStatus),
    characterTasks: z.record(z.record(TaskStatus)),
});
export type TaskStatusForAccount = z.infer<typeof TaskStatusForAccount>;
export const defaultTaskStatusForAccount: ()=>TaskStatusForAccount = () => {
    return {
        accountTasks: {},
        characterTasks: {},
    }
}

// Task Helper Functions
const midnight = (date: Date): Date => {
    date.setUTCHours(0,0,0,0);
    return date;
}

const firstDayOfMonth = (date: Date): Date => {
    date.setUTCDate(1);
    return date
}

const setDayOfWeek = (day: number, date: Date): Date => {
    const daysToSubtract = (date.getUTCDay() - day) % 7;
    date.setUTCDate(date.getUTCDate() - daysToSubtract);
    return date;
}

export const lastReset = (resetType: ResetType): Date => {
    const now = new Date();
    switch (resetType) {
        case 'Daily':
            return midnight(now);
        case 'Monthly':
            return firstDayOfMonth(midnight(now));
        case 'Weekly_Monday':
            return setDayOfWeek(1, midnight(now));
        case 'Weekly_Tuesday':
            return setDayOfWeek(2, midnight(now));
        case 'Weekly_Wednesday':
            return setDayOfWeek(3, midnight(now));
        case 'Weekly_Thursday':
            return setDayOfWeek(4, midnight(now));
        case 'Weekly_Friday':
            return setDayOfWeek(5, midnight(now));
        case 'Weekly_Saturday':
            return setDayOfWeek(6, midnight(now));
        case 'Weekly_Sunday':
            return setDayOfWeek(0, midnight(now));
    }
}

export const nextReset = (resetType: ResetType): Date => {
    const lastResetTime = lastReset(resetType);
    switch (resetType) {
        case 'Daily':
            lastResetTime.setUTCDate(lastResetTime.getUTCDate() + 1)
            return lastResetTime
        case 'Monthly':
            lastResetTime.setUTCMonth(lastResetTime.getUTCMonth() + 1);
            return lastResetTime;
        case 'Weekly_Monday':
        case 'Weekly_Tuesday':
        case 'Weekly_Wednesday':
        case 'Weekly_Thursday':
        case 'Weekly_Friday':
        case 'Weekly_Saturday':
        case 'Weekly_Sunday':
            lastResetTime.setUTCDate(lastResetTime.getUTCDate() + 7);
            return lastResetTime;
    }
}

export const trimTaskStatus = (status: TaskStatus, resetType: ResetType) => {
    const lastResetTime = lastReset(resetType);
    status.clearTimes = status.clearTimes.filter((clearTime) => clearTime.getTime() > lastResetTime.getTime());
}

const trimTaskStatusMap = (data: Record<string,TaskStatus>) => {
    // data.forEach((status) => {
    //     const task = TASK_MAP.get(status.taskId)
    //     trimTaskStatus(status, task?.resetType ?? "Monthly");

    //     // since clearTimes=0 and isPriority=false is default we can just remove them
    //     if (status.clearTimes.length === 0 && status.isPriority === false) {
    //         data.delete(status.taskId)
    //     }
    // })
}

export const trimTaskStatusForAccount = (data: TaskStatusForAccount) => {
    // trimTaskStatusMap(data.accountTasks);
    // data.characterTasks.forEach((charStatuses: TaskStatusForCharacter) => {
    //     trimTaskStatusMap(charStatuses.taskStatus)
    // })
}

export const setPriority = (accountStatuses: TaskStatusForAccount, characterName: string|undefined, taskId: string, isPriority: boolean) => {
    let statuses: Record<string,TaskStatus>;
    if (!characterName) {
        statuses = accountStatuses.accountTasks;
    } else {
        const charStatus = accountStatuses.characterTasks[characterName] ?? {};
        accountStatuses.characterTasks[characterName] = charStatus;
        statuses = charStatus
    }

    const status = statuses[taskId] ?? defaultTaskStatus(taskId);
    status.isPriority = isPriority;
    statuses[taskId] = status;
}