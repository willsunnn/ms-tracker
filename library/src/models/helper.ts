import {ResetType, Task, TaskStatus, TaskStatusForAccount, TaskType} from "./tasks";


// Task Helper Functions
const midnight = (date: Date): Date => {
  date.setUTCHours(0, 0, 0, 0);
  return date;
};

const firstDayOfMonth = (date: Date): Date => {
  date.setUTCDate(1);
  return date;
};

const setDayOfWeek = (day: number, date: Date): Date => {
  const daysToSubtract = (date.getUTCDay() - day) % 7;
  date.setUTCDate(date.getUTCDate() - daysToSubtract);
  return date;
};

export const lastReset = (resetType: ResetType): Date => {
  const now = new Date();
  switch (resetType) {
  case "Daily":
    return midnight(now);
  case "Monthly":
    return firstDayOfMonth(midnight(now));
  case "Weekly_Monday":
    return setDayOfWeek(1, midnight(now));
  case "Weekly_Tuesday":
    return setDayOfWeek(2, midnight(now));
  case "Weekly_Wednesday":
    return setDayOfWeek(3, midnight(now));
  case "Weekly_Thursday":
    return setDayOfWeek(4, midnight(now));
  case "Weekly_Friday":
    return setDayOfWeek(5, midnight(now));
  case "Weekly_Saturday":
    return setDayOfWeek(6, midnight(now));
  case "Weekly_Sunday":
    return setDayOfWeek(0, midnight(now));
  }
};

export const nextReset = (resetType: ResetType): Date => {
  const lastResetTime = lastReset(resetType);
  switch (resetType) {
  case "Daily":
    lastResetTime.setUTCDate(lastResetTime.getUTCDate() + 1);
    return lastResetTime;
  case "Monthly":
    lastResetTime.setUTCMonth(lastResetTime.getUTCMonth() + 1);
    return lastResetTime;
  case "Weekly_Monday":
  case "Weekly_Tuesday":
  case "Weekly_Wednesday":
  case "Weekly_Thursday":
  case "Weekly_Friday":
  case "Weekly_Saturday":
  case "Weekly_Sunday":
    lastResetTime.setUTCDate(lastResetTime.getUTCDate() + 7);
    return lastResetTime;
  }
};

export const getReadableResetText = (resetType: ResetType): string => {
  switch (resetType) {
  case "Daily":
  case "Monthly":
    return resetType.toString();
  case "Weekly_Monday":
  case "Weekly_Tuesday":
  case "Weekly_Wednesday":
  case "Weekly_Thursday":
  case "Weekly_Friday":
  case "Weekly_Saturday":
  case "Weekly_Sunday":
    return "Weekly";
  }
};

export const getReadableTaskType = (taskType: TaskType): string => {
  switch (taskType) {
  case "Boss":
  case "Ursus":
  case "Guild":
  case "Other":
    return taskType.toString();
  case "ArcaneSymbol":
    return "Arcane Symbol";
  case "SacredSymbol":
    return "Sacred Symbol";
  }
};

export const defaultTaskStatus: (taskId: string) => TaskStatus = (taskId: string) => {
  return {
    taskId,
    clearTimes: [],
    isPriority: false,
  };
};

export const trimTaskStatus = (status: TaskStatus, resetType: ResetType) => {
  const lastResetTime = lastReset(resetType);
  status.clearTimes = status.clearTimes.filter((clearTime) => clearTime.getTime() > lastResetTime.getTime());
};

const trimTaskStatusMap = (data: Record<string, TaskStatus>, taskMap: Map<string, Task>) => {
  Object.entries(data).forEach((entry) => {
    const [taskId, status] = entry;
    const task = taskMap.get(status.taskId);
    trimTaskStatus(status, task?.resetType ?? "Monthly");

    // since clearTimes=0 and isPriority=false is default we can just remove them
    if (status.clearTimes.length === 0 && !status.isPriority) {
      delete data[taskId];
    }
  });
};

export const trimTaskStatusForAccount = (data: TaskStatusForAccount, taskMap: Map<string, Task>) => {
  trimTaskStatusMap(data.accountTasks, taskMap);
  Object.entries(data.characterTasks).forEach((entry) => {
    const charStatuses = entry[1];
    trimTaskStatusMap(charStatuses, taskMap);
  });
};

export const setPriority = (accountStatuses: TaskStatusForAccount, characterName: string | undefined, taskId: string, isPriority: boolean) => {
  let statuses: Record<string, TaskStatus>;
  if (!characterName) {
    statuses = accountStatuses.accountTasks;
  } else {
    const charStatus = accountStatuses.characterTasks[characterName] ?? {};
    accountStatuses.characterTasks[characterName] = charStatus;
    statuses = charStatus;
  }

  const status = statuses[taskId] ?? defaultTaskStatus(taskId);
  status.isPriority = isPriority;
  statuses[taskId] = status;
};
