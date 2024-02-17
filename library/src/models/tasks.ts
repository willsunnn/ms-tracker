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
  "6thJob",
  "Guild",
  "Event",
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
  startDate: z.date().optional(),
  endDate: z.date().optional(),
});
export type Task = z.infer<typeof Task>

// TaskGroup
export const GroupedTasks = z.object({
  name: z.string(),
  tasks: z.array(Task),
});
export type GroupedTasks = z.infer<typeof GroupedTasks>

// TaskStatus
export const TaskStatus = z.object({
  userId: z.string(),
  characterId: z.string().nullable(),
  taskId: z.string(),
  clearTimes: z.array(z.number()),
  isPriority: z.boolean(),
});
export type TaskStatus = z.infer<typeof TaskStatus>

// TaskAndStatus
export const TaskAndStatus = z.intersection(Task, TaskStatus);
export type TaskAndStatus = z.infer<typeof TaskAndStatus>

// TaskAndStatusGroup
export const GroupedTasksAndStatuses = z.object({
  name: z.string(),
  tasks: z.array(TaskAndStatus),
});
export type GroupedTasksAndStatuses = z.infer<typeof GroupedTasksAndStatuses>

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

// DateFormat
export type DateFormat = "absolute" | "relative" | "relative-short";

// Helper class for holding a list of tasks
export class TaskList {
  private groupedTasks: GroupedTasks[];
  private taskList: Task[];
  private taskMap: Map<string, Task>;

  constructor(groupedTasks: GroupedTasks[]) {
    this.groupedTasks = groupedTasks;
    this.taskList = this.groupedTasks.map((group) => group.tasks).flat(1);
    this.taskMap = new Map(this.taskList.map((task) => [task.taskId, task]));

    const tasksAreUniqueById = (this.taskList.length === this.taskMap.size);
    if (!tasksAreUniqueById) {
      throw new Error("Tasks are not unique by ID");
    }
  }

  getTasks = () => {
    return this.taskList;
  };

  getGroupedTasks = () => {
    return this.groupedTasks;
  };

  getTask = (taskId: string) => {
    return this.taskMap.get(taskId);
  };
}
