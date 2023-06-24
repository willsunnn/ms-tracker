import React from 'react'
import { type Character } from '../../models/character'
import { type Task, type TaskAndStatus, type TaskStatusForCharacter, nextReset } from '../../models/tasks'
import { AddCharacterButton } from './AddCharacterButton'
import { type TaskViewProps } from './TaskViewPage'
import { EditPrioritizedTasksButton } from './EditPrioritizedTasksButton'
import { CharacterView } from './CharacterView'

const joinTasksAndStatuses = (tasks: Task[], statuses: TaskStatusForCharacter): TaskAndStatus[] => {
  return tasks.map((task) => {
    const status = statuses[task.taskId] ?? { clearTimes: [], isPriority: false }
    return {
      ...task,
      ...status
    }
  })
}

const TaskViewSingleCharacter = (props: { tasks: Task[], taskStatus: TaskStatusForCharacter, character: Character }) => {
  const { tasks, taskStatus, character } = props
  const tasksAndStatuses = joinTasksAndStatuses(tasks, taskStatus)

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
                            const resetsAt = nextReset(resetType)
                            return (<tr key={`CharacterTaskViewRow-${character.name}-${task.taskId}}`}>
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
  const { tasks, taskStatus, characters } = props.taskViewAttrs
  return (<>
        <div>
        {
            characters.characters.map((character) => {
              const taskStatusForCharacter = taskStatus.characterTasks[character.name] ?? {}
              return (<TaskViewSingleCharacter tasks={tasks} taskStatus={taskStatusForCharacter} character={character} key={`CharacterTaskView-${character.name}`}/>)
            })
        }
        </div>
        <AddCharacterButton/>
    </>)
}
