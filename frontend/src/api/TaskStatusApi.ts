import { type User } from 'firebase/auth'
import { TaskStatusForAccount, defaultTaskStatusForAccount, setPriority, trimTaskStatusForAccount } from '../models/tasks'
import { FireBaseApiHelper } from './FireBaseApiHelper'

const TASK_STATUS_COLLECTION = 'TaskStatus'

// Storing Methods

const set = async (user: User, data: TaskStatusForAccount): Promise<string> => {
  trimTaskStatusForAccount(data)
  return await FireBaseApiHelper.set(user.uid, TASK_STATUS_COLLECTION, data)
}

const updatePriorities = async (user: User, characterName: string, tasksToPrioritize: string[], tasksToDeprioritize: string[]): Promise<string> => {
  const accountStatuses: TaskStatusForAccount = await get(user)
  tasksToPrioritize.forEach((taskId) => {
    setPriority(accountStatuses, characterName, taskId, true)
  })
  tasksToDeprioritize.forEach((taskId) => {
    setPriority(accountStatuses, characterName, taskId, false)
  })
  return await set(user, accountStatuses)
}

// Fetching Methods

const get = async (user: User): Promise<TaskStatusForAccount> => {
  return await FireBaseApiHelper.get(user.uid, TASK_STATUS_COLLECTION, defaultTaskStatusForAccount, TaskStatusForAccount.parse)
}

const listen = (user: User, callback: (_: TaskStatusForAccount) => void, errCallback: (_: any) => void) => {
  return FireBaseApiHelper.listen(user.uid, TASK_STATUS_COLLECTION, callback, errCallback, defaultTaskStatusForAccount, TaskStatusForAccount.parse)
}

export const TaskStatusApi = {
  set,
  updatePriorities,
  listen
}
