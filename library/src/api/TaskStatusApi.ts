import {type User} from "firebase/auth";
import {TaskStatus, emptyTaskStatusForAcccount, TaskStatusForAccount, emptyTaskStatusForCharacter, Character} from "../models";
import {Unsubscribe, getFirestore} from "firebase/firestore";
import {FirebaseOptions, initializeApp} from "firebase/app";
import {FirestoreApiHelperBase} from "./FirestoreApiHelperBase";
import {FirestoreApiHelper} from "./FirestoreApiHelper";
import {defaultTaskStatus} from "../models/helper";

export class TaskStatusApi {
  public static readonly TASK_STATUS_COLLECTION = "TaskStatus";

  api: FirestoreApiHelperBase;

  constructor(api: (collectionName: string) => FirestoreApiHelperBase) {
    this.api = api(TaskStatusApi.TASK_STATUS_COLLECTION);
  }

  private getKey = (userId: string, characterId: string|null, taskId: string) => {
    return `${userId}-${characterId}-${taskId}`;
  };

  // Storing Methods

  public set = async (taskStatus: TaskStatus) => {
    const key = this.getKey(taskStatus.userId, taskStatus.characterId, taskStatus.taskId);
    return this.api.set(key, taskStatus);
  };

  // Fetching Methods

  public get = async (user: User, characterId: string|null, taskId: string): Promise<TaskStatus> => {
    const key = this.getKey(user.uid, characterId, taskId);
    const result = await this.api.get(key, TaskStatus.parse);
    const retValue = result ?? defaultTaskStatus(user.uid, characterId, taskId);
    return retValue;
  };

  public searchAndListen = (user: User, handler: (_: TaskStatusForAccount)=>void, errHandler: (_:unknown)=>void): Unsubscribe => {
    return this.api.searchAndListen(
      [{
        property: "userId",
        op: "==",
        value: user.uid,
      }],
      (data) => {
        const taskStatusesByCharacter = emptyTaskStatusForAcccount();
        data.forEach((taskStatus) => {
          const taskStatusByTaskId = taskStatusesByCharacter.get(taskStatus.characterId) ?? emptyTaskStatusForCharacter();
          taskStatusesByCharacter.set(taskStatus.characterId, taskStatusByTaskId);
          taskStatusByTaskId.set(taskStatus.taskId, taskStatus);
        });
        handler(taskStatusesByCharacter);
      },
      errHandler,
      TaskStatus.parse
    );
  };

  // Modify Helper Methods (these should be transactional)

  public updatePriority = async (user: User, character: Character, taskId: string, prioritize: boolean): Promise<void> => {
    const taskStatus = await this.get(user, character.id, taskId);
    taskStatus.isPriority = prioritize;
    await this.set(taskStatus);
  };

  public updatePriorities = async (user: User, character: Character, tasksToPrioritize: string[], tasksToDeprioritize: string[]): Promise<void> => {
    await Promise.all(tasksToPrioritize.map((taskId) => {
      return this.updatePriority(user, character, taskId, true);
    }));
    await Promise.all(tasksToDeprioritize.map((taskId) => {
      return this.updatePriority(user, character, taskId, false);
    }));
  };
}

export const taskStatusApi = (config: FirebaseOptions) => {
  const app = initializeApp(config);
  const firestore = getFirestore(app);
  return new TaskStatusApi((coll) => new FirestoreApiHelper(firestore, coll));
};
