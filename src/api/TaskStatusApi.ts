import { User } from 'firebase/auth';
import { TaskStatusForAccount, defaultTaskStatusForAccount } from '../models/tasks';
import { FireBaseApiHelper } from './FireBaseApiHelper';

const TASK_STATUS_COLLECTION = "TaskStatus"

// Storing Methods

const set = async (user: User, data: TaskStatusForAccount): Promise<String> => {
    return await FireBaseApiHelper.set(user, TASK_STATUS_COLLECTION, data)
}

// Fetching Methods

const listen = (user: User, callback:(_:TaskStatusForAccount)=>void, errCallback:(_:any)=>void) => {
    return FireBaseApiHelper.listen(user, TASK_STATUS_COLLECTION, callback, errCallback, defaultTaskStatusForAccount, TaskStatusForAccount.parse)
}

export const TaskStatusApi = {
    set,
    listen,
}