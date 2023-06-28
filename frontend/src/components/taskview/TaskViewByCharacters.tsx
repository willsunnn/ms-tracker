import React from 'react'
import { AddCharacterButton } from '../dialog/AddCharacterDialog'
import { type TaskViewProps } from './TaskViewPage'
import { EditPrioritizedTasksComponent } from '../dialog/EditPrioritizedTasksDialog'
import { CharacterView } from '../CharacterView'
import { type Character, type Task, type TaskAndStatus, type TaskStatusForCharacter, Model, type CharacterWithMapleGgData, emptyTaskStatusForCharacter, taskStatusApi } from 'ms-tracker-library'
import { defaultTaskStatus } from 'ms-tracker-library/lib/models/helper'
import { type User } from 'firebase/auth'
import { useDialogContext } from '../../contexts/DialogContext'
import { BsFillGearFill } from 'react-icons/bs'
import { FaArrowTurnUp } from 'react-icons/fa6'
import { DeleteCharacterComponent } from '../dialog/DeleteCharacterDialog'
import { useApi } from '../../contexts/ApiContext'
import { Alert } from '../AlertList'
import { useAlertCallback } from '../../contexts/AlertContext'

const joinTasksAndStatuses = (user: User, character: CharacterWithMapleGgData, tasks: Task[], statuses: TaskStatusForCharacter): TaskAndStatus[] => {
  return tasks.map((task) => {
    const status = statuses.get(task.taskId) ?? defaultTaskStatus(user.uid, character.id, task.taskId)
    return {
      ...task,
      ...status
    }
  })
}

interface TaskViewSingleCharacterProps {
  tasks: TaskAndStatus[]
  character: Character
  openEditPrioritizedTasksComponent: (character: CharacterWithMapleGgData, tasks: TaskAndStatus[]) => void
  openDeleteCharacterComponent: (character: CharacterWithMapleGgData, tasks: TaskAndStatus[]) => void
}

const TaskViewSingleCharacter = (props: TaskViewSingleCharacterProps) => {
  const { tasks, character, openEditPrioritizedTasksComponent, openDeleteCharacterComponent } = props
  const alert = useAlertCallback()
  const { taskStatusApi } = useApi()

  const onEditClicked = () => {
    openEditPrioritizedTasksComponent(character, tasks)
  }

  const onDeleteClicked = () => {
    openDeleteCharacterComponent(character, tasks)
  }

  const checkBoxOnClickCurryFunc = (task: TaskAndStatus) => {
    return () => {
      const numClears = task.clearTimes.length
      const isComplete = numClears >= task.maxClearCount
      if (isComplete) {
        task.clearTimes = []
      } else {
        const now = new Date().getTime()
        while (task.clearTimes.length < task.maxClearCount) {
          task.clearTimes.push(now)
        }
      }
      taskStatusApi.set(task).then(() => {}).catch(alert)
    }
  }

  const prioritizedTasks = tasks.filter((task) => task.isPriority)
  return (
    <div className="card bg-base-200 shadow-xl my-2 p-3 w-full min-w-200">
      <div className="join join-horizontal pb-3">
        <CharacterView character={character}/>
        {prioritizedTasks.length === 0 && <div className="flex flex-row-reverse content-start w-full -m-4 pt-6">
          <FaArrowTurnUp size={15}/>
          <div className="font-bold mr-1">
            Add some tasks!
          </div>
        </div>}
        {prioritizedTasks.length > 0 && <table className="table w-full">
          <tbody>
            {
              prioritizedTasks.map((task) => {
                const { name, imageIcon, resetType } = task
                const resetsAt = Model.nextReset(resetType)
                const key = `CharacterTaskViewRow-${character.name}-${task.taskId}}`
                const isComplete = task.clearTimes.length >= task.maxClearCount
                return (<tr key={key}>
                  <td>
                    <div className="flex items-center space-x-3">
                      { imageIcon &&
                        (<div className="avatar">
                          <div className="mask mask-squircle w-10 h-10">
                            <img src={imageIcon} alt={name} />
                          </div>
                        </div>)
                      }
                      <div>
                        <div className="font-bold">{name}</div>
                      </div>
                    </div>
                  </td>

                  <td>
                    {resetsAt.toLocaleString()}
                  </td>

                  <td>
                    <input type="checkbox" className="checkbox" checked={isComplete} onClick={checkBoxOnClickCurryFunc(task)}/>
                  </td>
                </tr>)
              })
            }
          </tbody>
        </table>}
        <div className="dropdown dropdown-end">
          <label tabIndex={0} >
            <BsFillGearFill size={20}/>
          </label>
          <ul tabIndex={0} className="mt-3 p-2 menu menu-sm disabled dropdown-content rounded-box min-w-36 bg-base-300">
            <li onClick={onEditClicked}><a>Edit Tasks</a></li>
            <li onClick={onDeleteClicked}><a>Delete</a></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export const TaskViewByCharacter = (props: { taskViewAttrs: TaskViewProps }) => {
  const { user, tasks, taskStatus, characters } = props.taskViewAttrs
  const { openDialog } = useDialogContext()

  const openEditPrioritizedTasksComponent = (character: CharacterWithMapleGgData, tasks: TaskAndStatus[]) => {
    openDialog((<EditPrioritizedTasksComponent character={character} tasks={tasks}/>))
  }
  const openDeleteCharacterComponent = (charcter: CharacterWithMapleGgData, tasks: TaskAndStatus[]) => {
    openDialog((<DeleteCharacterComponent character={charcter}/>))
  }

  return (<>
    <div>
      {
        characters.map((character: CharacterWithMapleGgData) => {
          const taskStatusForCharacter = taskStatus.get(character.id) ?? emptyTaskStatusForCharacter()
          const tasksAndStatuses = joinTasksAndStatuses(user, character, tasks, taskStatusForCharacter)
          return (<TaskViewSingleCharacter
            tasks={tasksAndStatuses} character={character}
            openEditPrioritizedTasksComponent={openEditPrioritizedTasksComponent}
            openDeleteCharacterComponent={openDeleteCharacterComponent}
            key={`CharacterTaskView-${character.name}`}/>)
        })
      }
    </div>
    <AddCharacterButton/>
  </>)
}
