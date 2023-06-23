import { User } from 'firebase/auth';
import { TaskStatusForAccount, defaultTaskStatusForAccount, setPriority, trimTaskStatusForAccount } from '../models/tasks';
import { FireBaseApiHelper } from './FireBaseApiHelper';

const TASK_STATUS_COLLECTION = "TaskStatus"

// Storing Methods

const set = async (user: User, data: TaskStatusForAccount): Promise<String> => {
    trimTaskStatusForAccount(data);
    return await FireBaseApiHelper.set(user, TASK_STATUS_COLLECTION, data)
}

const updatePriority = async (user: User, characterName: string, taskId: string, isPriority: boolean): Promise<String> => {
    const accountStatuses: TaskStatusForAccount = await get(user);
    setPriority(accountStatuses, characterName, taskId, isPriority);
    return await set(user, accountStatuses);
}

// Fetching Methods

const get = async (user: User): Promise<TaskStatusForAccount> => {
    return await FireBaseApiHelper.get(user, TASK_STATUS_COLLECTION, defaultTaskStatusForAccount, TaskStatusForAccount.parse)
}

const listen = (user: User, callback:(_:TaskStatusForAccount)=>void, errCallback:(_:any)=>void) => {
    return FireBaseApiHelper.listen(user, TASK_STATUS_COLLECTION, callback, errCallback, defaultTaskStatusForAccount, TaskStatusForAccount.parse)
}

export const TaskStatusApi = {
    set,
    updatePriority,
    listen,
}