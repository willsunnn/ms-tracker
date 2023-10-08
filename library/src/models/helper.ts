import {Model} from ".";
import {Character, CharacterWithMapleGgData} from "./character";
import {DateFormat, GroupedTasks, ResetType, Task, TaskAndStatus, TaskList, TaskStatus, TaskStatusForAccount, TaskStatusForCharacter, TaskType, emptyTaskStatusForCharacter} from "./tasks";

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
    return date.toLocaleString(undefined, {
      year: "2-digit",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: undefined,
      second: undefined,
    });
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

export const joinTasksAndStatuses = (uid: string, character: Character, tasks: Task[], statuses: Map<string, TaskStatus>) => {
  return tasks.map((task) => {
    const status = statuses.get(task.taskId) ?? defaultTaskStatus(uid, character.id, task.taskId);
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

export type StatusesAndCharacter = {
  character: CharacterWithMapleGgData
  tasks: TaskAndStatus[]
}
export type StatusesByCharacter = Array<StatusesAndCharacter>

export type StatusesAndCharactersAndResetDate = {
  resetDate: Date,
  characters: StatusesAndCharacter[]
}
export type StatusesByDateThenCharacter = Array<StatusesAndCharactersAndResetDate>
export type StatusesByCompletionThenDateThenCharacter = {
  completed: StatusesByDateThenCharacter
  pending: StatusesByDateThenCharacter
}

export type StatusesByTaskThenCharacter = {
  task: Task
  statuses: TaskStatus[]
  isPrioritizedByAnyCharacter: boolean
}
export type StatusesByGroupThenTaskThenCharacter = Array<{
  groupName: string,
  tasks: StatusesByTaskThenCharacter[]
  containsPrioritizedTask: boolean
}>
export type TaskAndStatusesAndGroupIndex = {
  task: Task
  statuses: TaskStatus[]
  groupIndex: number
}

export class DataWrapper {
  private userId: string;
  private characters: CharacterWithMapleGgData[];
  private tasks: TaskList;
  private statuses: TaskStatusForAccount;

  constructor(userId: string, characters: CharacterWithMapleGgData[], tasks: TaskList, statuses: TaskStatusForAccount) {
    this.userId = userId;
    this.characters = characters;
    this.tasks = tasks;
    this.statuses = statuses;
  }

  /*
   * Basic getters
   */

  getTaskStatus = (): TaskStatusForAccount => {
    return this.statuses;
  };

  getTaskStatusForCharacter = (characterId: string): TaskStatusForCharacter => {
    return this.statuses.get(characterId) ?? emptyTaskStatusForCharacter();
  };

  getTaskStatusForCharacterAndTask = (chracterId: string, taskId: string): TaskStatus => {
    return this.getTaskStatusForCharacter(chracterId).get(taskId) ?? defaultTaskStatus(this.userId, chracterId, taskId);
  };

  getCharacters = (): CharacterWithMapleGgData[] => {
    return this.characters;
  };

  hasCharacters = (): boolean => {
    return this.characters.length > 0;
  };

  hasMultipleCharacters = (): boolean => {
    return this.characters.length > 1;
  };

  getTasks = (): Task[] => {
    return this.tasks.getTasks();
  };

  getTask = (taskId: string): Task | undefined => {
    return this.tasks.getTask(taskId);
  };

  getGroupedTasks = (): GroupedTasks[] => {
    return this.tasks.getGroupedTasks();
  };

  /*
   * Helper getters that involve multiple of the data structures
   */

  getByCharacterThenTask = (): StatusesByCharacter => {
    return this.characters.map((character) => ({
      character,
      tasks: Model.joinTasksAndStatuses(this.userId, character, this.tasks.getTasks(), this.getTaskStatusForCharacter(character.id)),
    }));
  };

  getByResetTimeThenCharacterThenTask = (): StatusesByCompletionThenDateThenCharacter => {
    const allTaskStatusCharacters = this.getTasks().flatMap((task, taskIndex) => {
      return this.getCharacters().map((character, characterIndex) => {
        const status = this.getTaskStatusForCharacterAndTask(character.id, task.taskId);
        const taskAndStatus: TaskAndStatus = Model.trimClearTimes({
          ...status,
          ...task,
        });
        const resetDate = Model.nextReset(new Date(), task.resetType);
        return {
          status: taskAndStatus,
          taskIndex,
          character,
          characterIndex,
          resetDate,
        };
      });
    });

    // Only show tasks that are prioritized but havent been finished
    // Sort them by (resetDate, characterIndex, taskIndex)
    // Group them by (resetDate, character)
    const pending: StatusesByDateThenCharacter = [];
    const completed: StatusesByDateThenCharacter = [];
    allTaskStatusCharacters.filter((task) => task.status.isPriority)
      .sort((a, b) => (a.resetDate.getTime() - b.resetDate.getTime()) || (a.characterIndex - b.characterIndex) || (a.taskIndex - b.taskIndex))
      .forEach((task) => {
        // decide which list to append it to
        const groupedTasks = (task.status.clearTimes.length < task.status.maxClearCount) ? pending : completed;

        // add it to the back of the list
        const lastTime = groupedTasks.length > 0 ? (groupedTasks[groupedTasks.length - 1].resetDate.getTime()) : undefined;
        if (lastTime !== task.resetDate.getTime()) {
          groupedTasks.push({resetDate: task.resetDate, characters: []});
        }

        const characters = groupedTasks[groupedTasks.length - 1].characters;
        const lastCharacterId = characters.length > 0 ? (characters[characters.length - 1].character.id) : undefined;
        if (lastCharacterId !== task.character.id) {
          characters.push({character: task.character, tasks: []});
        }

        characters[characters.length - 1].tasks.push(task.status);
      });
    return {
      pending,
      completed,
    };
  };

  getByGroupThenTaskThenCharacter = (): StatusesByGroupThenTaskThenCharacter => {
    const groupedTasksAndStatuses: StatusesByGroupThenTaskThenCharacter = this.getGroupedTasks().map(
      (taskGroup) => {
        const tasks = taskGroup.tasks.map((task) => {
          const statuses = this.getCharacters().map((character) => {
            const status = this.getTaskStatusForCharacterAndTask(character.id, task.taskId);
            const taskAndStatus: TaskAndStatus = {
              ...task,
              ...status,
            };
            return Model.trimClearTimes(taskAndStatus);
          });

          return {
            task,
            statuses,
            isPrioritizedByAnyCharacter: statuses.filter((status) => status.isPriority).length > 0,
          };
        });

        return {
          groupName: taskGroup.name,
          tasks,
          containsPrioritizedTask: tasks.filter((task) => task.isPrioritizedByAnyCharacter).length > 0,
        };
      }
    );

    return groupedTasksAndStatuses;
  };

  getPrioritizedByGroupThenTaskThenCharacter = (): TaskAndStatusesAndGroupIndex[] => {
    const groupedTasks = this.getByGroupThenTaskThenCharacter();
    const prioritizedTasksAndStatuses: TaskAndStatusesAndGroupIndex[] = groupedTasks
      // remove groups without prioritized tasks
      .filter((group) => group.containsPrioritizedTask)
      // assign the group index to the group (so we know which is odd/even)
      .map((group, groupIndex) => ({
        ...group,
        groupIndex,
      }))
      // add the groupIndex to each task in the group and flatten the list
      .map((group) => {
        return group.tasks.map((task) => ({
          ...task,
          groupIndex: group.groupIndex,
        }));
      })
      .flat(1);
    return prioritizedTasksAndStatuses;
  };
}
