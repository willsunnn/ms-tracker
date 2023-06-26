import {type User} from "firebase/auth";
import {TaskStatusForAccount, defaultTaskStatusForAccount, Model} from "../models";
import {FirestoreApiHelper} from "./FirestoreApiHelper";
import {Firestore, Unsubscribe, getFirestore} from "firebase/firestore";
import {FirebaseOptions, initializeApp} from "firebase/app";

const TASK_STATUS_COLLECTION = "TaskStatus";

export class TaskStatusApi {
  api: FirestoreApiHelper;

  constructor(firestore: Firestore) {
    this.api = new FirestoreApiHelper(firestore, TASK_STATUS_COLLECTION);
  }

  // Storing Methods

  public set = async (user: User, data: TaskStatusForAccount): Promise<string> => {
    return await this.api.set(user.uid, data);
  };

  // Fetching Methods

  public get = async (user: User): Promise<TaskStatusForAccount> => {
    return await this.api.get(user.uid, defaultTaskStatusForAccount, TaskStatusForAccount.parse);
  };

  public listen = (user: User, callback: (_: TaskStatusForAccount) => void, errCallback: (_: unknown) => void): Unsubscribe => {
    return this.api.listen(user.uid, callback, errCallback, defaultTaskStatusForAccount, TaskStatusForAccount.parse);
  };

  // Modify Helper Methods (these should be transactional)

  public updatePriorities = async (user: User, characterName: string, tasksToPrioritize: string[], tasksToDeprioritize: string[]): Promise<string> => {
    const accountStatuses: TaskStatusForAccount = await this.get(user);
    tasksToPrioritize.forEach((taskId) => {
      Model.setPriority(accountStatuses, characterName, taskId, true);
    });
    tasksToDeprioritize.forEach((taskId) => {
      Model.setPriority(accountStatuses, characterName, taskId, false);
    });
    return await this.set(user, accountStatuses);
  };
}

export const taskStatusApi = (config: FirebaseOptions) => {
  const app = initializeApp(config);
  const firestore = getFirestore(app);
  return new TaskStatusApi(firestore);
};
