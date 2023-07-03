import {User} from "firebase/auth";
import {Character} from "./character";
import {DateFormat, ResetType, Task, TaskAndStatus, TaskStatus, TaskType} from "./tasks";

const midnight = (date: Date): Date => {
  date.setUTCHours(0, 0, 0, 0);
  return date;
};

const firstDayOfMonth = (date: Date): Date => {
  date.setUTCDate(1);
  return date;
};

// % is remainder and not modulo in js
const modulo = (a: number, b: number) => {
  return ((a % b) + b) % b;
};

const setDayOfWeek = (day: number, date: Date): Date => {
  const daysToSubtract = modulo(date.getUTCDay() - day, 7);
  date.setUTCDate(date.getUTCDate() - daysToSubtract);
  return date;
};

export const lastReset = (date: Date, resetType: ResetType): Date => {
  const dateCopy = new Date(date.getTime());
  switch (resetType) {
  case "Daily":
    return midnight(dateCopy);
  case "Monthly":
    return firstDayOfMonth(midnight(dateCopy));
  case "Weekly_Monday":
    return setDayOfWeek(1, midnight(dateCopy));
  case "Weekly_Tuesday":
    return setDayOfWeek(2, midnight(dateCopy));
  case "Weekly_Wednesday":
    return setDayOfWeek(3, midnight(dateCopy));
  case "Weekly_Thursday":
    return setDayOfWeek(4, midnight(dateCopy));
  case "Weekly_Friday":
    return setDayOfWeek(5, midnight(dateCopy));
  case "Weekly_Saturday":
    return setDayOfWeek(6, midnight(dateCopy));
  case "Weekly_Sunday":
    return setDayOfWeek(0, midnight(dateCopy));
  }
};

export const nextReset = (date: Date, resetType: ResetType): Date => {
  const lastResetTime = lastReset(date, resetType);
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

export const getReadableTime = (date: Date, format: DateFormat): string => {
  if (format === "absolute") {
    return date.toLocaleString();
  } else {
    const now = new Date().getTime();
    const diff = Math.abs(date.getTime() - now);

    let seconds = Math.floor(diff / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    hours = hours % 24;
    minutes = minutes % 60;
    seconds = seconds % 60;

    if (format === "relative") {
      if (days === 0 && hours === 0) {
        return `${minutes}m ${seconds}s`;
      } else if (days === 0) {
        return `${hours}h ${minutes}m`;
      } else {
        return `${days}d ${hours}h`;
      }
    } else {
      // relative-short
      if (days === 0 && hours === 0 && minutes === 0) {
        return `${seconds}s`;
      } else if (days === 0 && hours === 0) {
        return `${minutes}m`;
      } else if (days === 0) {
        return `${hours}h`;
      } else {
        return `${days}d`;
      }
    }
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

export const defaultTaskStatus = (userId: string, characterId: string|null, taskId: string): TaskStatus => {
  return {
    userId,
    characterId,
    taskId,
    clearTimes: [],
    isPriority: false,
  };
};

export const trimTaskStatus = (status: TaskStatus, resetType: ResetType) => {
  const now = new Date();
  const lastResetTime = lastReset(now, resetType);
  status.clearTimes = status.clearTimes.filter((clearTime) => clearTime > lastResetTime.getTime());
};

export const joinTasksAndStatuses = (user: User, character: Character, tasks: Task[], statuses: Map<string, TaskStatus>) => {
  return tasks.map((task) => {
    const status = statuses.get(task.taskId) ?? defaultTaskStatus(user.uid, character.id, task.taskId);
    return {
      ...task,
      ...status,
    };
  });
};

export const trimClearTimes = (task: TaskAndStatus): TaskAndStatus => {
  task.clearTimes = task.clearTimes.filter((time) => {
    const reset = lastReset(new Date(), task.resetType).getTime();
    return time > reset;
  });
  return task;
};
