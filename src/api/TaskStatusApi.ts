import * as Firestore from 'firebase/firestore';
import { db } from '../config/FirebaseConfig';
import { User } from 'firebase/auth';
import { AllTasks, TaskStatus, TaskStatusesForAccount, Task, TaskAndStatusForAccount, TaskAndStatus } from '../models/tasks';

const getDocRef = (user: User) => {
    const userCollectionRef = Firestore.collection(db, "TaskStatus");
    const docRef = Firestore.doc(userCollectionRef, user.uid);
    return docRef
}

// Storing Methods

const setStatusesInFirebase = async (user: User, data: TaskStatusesForAccount): Promise<String> => {
    try {
        const docRef = getDocRef(user);
        await Firestore.setDoc(docRef, data);
        console.log(`Document written with ID ${docRef.id}`)
        return docRef.id;
    } catch (e) {
        console.error(`Error writing document ${JSON.stringify(data)} error=${e}`)
        throw e;
    }
}

const trimTaskStatusInfo = (accountTasksAndStatuses: TaskAndStatusForAccount): TaskStatusesForAccount => {
    // this is the inverse function of joinStatusesWithTaskList
    const characters = accountTasksAndStatuses.characters.map((characterTasksAndStatuses) => {
        const isTaskStatusEmpty = (task: TaskAndStatus) => {
            return (!task.isPriority) && (task.clearTimes.length===0)
        }
        const taskStatuses = characterTasksAndStatuses.tasks.filter((t) => !(isTaskStatusEmpty(t))).map((taskAndStatus) => {
            return {
                taskId: taskAndStatus.taskId,
                clearTimes: taskAndStatus.clearTimes,
                isPriority: taskAndStatus.isPriority,
            }
        })
        return {
            characterName: characterTasksAndStatuses.characterName,
            taskStatuses
        }
    })
    return { characters };
}

const trimAndSet = async (user: User, accountTasksAndStatuses: TaskAndStatusForAccount): Promise<String> => {
    const taskStatuses = trimTaskStatusInfo(accountTasksAndStatuses);
    return await setStatusesInFirebase(user, taskStatuses);
}

// Fetching Methods

const getStatusesFromFirebase = async (user: User): Promise<TaskStatusesForAccount> => {
    try {
        const docRef = getDocRef(user);
        const docData = await Firestore.getDoc(docRef);
        const userData = docData.data() as TaskStatusesForAccount;
        if (userData === undefined) {
            console.log(`could not find document for user ${user.uid}. Returning default value`);
            return TaskStatusesForAccount.parse({characters: []});
        } else {
            console.log(`found document with data=${JSON.stringify(userData)}`)
            return TaskStatusesForAccount.parse(userData);
        }
    } catch (e) {
        console.error(`Error fetching document error=${e}`)
        throw e;
    }
}

const joinStatusesWithTaskList = (accountStatuses: TaskStatusesForAccount): TaskAndStatusForAccount => {
    // this is the inverse function of trimTaskStatusInfo
    const characters = accountStatuses.characters.map((characterStatuses) => {
        const tasks = AllTasks.map((task) => {
            var taskStatus = characterStatuses.taskStatuses.find((t) => t.taskId===task.taskId);
            if (taskStatus === undefined || taskStatus === null) {
                taskStatus = {
                    taskId: task.taskId,
                    clearTimes: [],
                    isPriority: false
                }
            }
            return {
                ...task,
                clearTimes: taskStatus.clearTimes,
                isPriority: taskStatus.isPriority
            }
        })
        return {
            characterName: characterStatuses.characterName,
            tasks
        }
    })
    return { characters }
}

const getAndJoin = async (user: User): Promise<TaskAndStatusForAccount> => {
    const taskStatuses = await getStatusesFromFirebase(user);
    const tasksAndStatuses = joinStatusesWithTaskList(taskStatuses);
    return tasksAndStatuses
}

export default {
    set: trimAndSet,
    get: getAndJoin,
}