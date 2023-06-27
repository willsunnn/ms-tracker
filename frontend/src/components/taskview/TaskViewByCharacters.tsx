import React from 'react'
import { AddCharacterButton } from './AddCharacterButton'
import { type TaskViewProps } from './TaskViewPage'
import { EditPrioritizedTasksButton } from './EditPrioritizedTasksButton'
import { CharacterView } from '../CharacterView'
import { type Character, type Task, type TaskAndStatus, type TaskStatusForCharacter, Model, type CharacterWithMapleGgData, emptyTaskStatusForCharacter } from 'ms-tracker-library'
import { defaultTaskStatus } from 'ms-tracker-library/lib/models/helper'
import { type User } from 'firebase/auth'

const joinTasksAndStatuses = (user: User, character: CharacterWithMapleGgData, tasks: Task[], statuses: TaskStatusForCharacter): TaskAndStatus[] => {
  return tasks.map((task) => {
    const status = statuses.get(task.taskId) ?? defaultTaskStatus(user.uid, character.id, task.taskId)
    return {
      ...task,
      ...status
    }
  })
}

const TaskViewSingleCharacter = (props: { user: User, tasks: Task[], taskStatus: TaskStatusForCharacter, character: Character }) => {
  const { user, tasks, taskStatus, character } = props
  const tasksAndStatuses = joinTasksAndStatuses(user, character, tasks, taskStatus)

  return (
    <div className="card bg-base-200 shadow-xl my-2 p-3 w-full min-w-200">
      <div className="join join-horizontal pb-3">
        <CharacterView character={character}/>
        <table className="table w-full">
          <tbody>
            {
              tasksAndStatuses
                .filter((task) => task.isPriority)
                .map((task) => {
                  const { name, imageIcon, resetType } = task
                  const resetsAt = Model.nextReset(resetType)
                  const key = `CharacterTaskViewRow-${character.name}-${task.taskId}}`
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
                      <input type="checkbox" className="checkbox" />
                    </td>
                  </tr>)
                })
            }
          </tbody>
        </table>
      </div>
      <div className="flex-row-reverse justify-end w-full">

        <EditPrioritizedTasksButton character={character} tasks={tasksAndStatuses}/>
      </div>
    </div>
  )
}

export const TaskViewByCharacter = (props: { taskViewAttrs: TaskViewProps }) => {
  const { user, tasks, taskStatus, characters } = props.taskViewAttrs
  return (<>
    <div>
      {
        characters.map((character: CharacterWithMapleGgData) => {
          const taskStatusForCharacter = taskStatus.get(character.id) ?? emptyTaskStatusForCharacter()
          return (<TaskViewSingleCharacter user={user} tasks={tasks} taskStatus={taskStatusForCharacter} character={character} key={`CharacterTaskView-${character.name}`}/>)
        })
      }
    </div>
    <AddCharacterButton/>
  </>)
}
