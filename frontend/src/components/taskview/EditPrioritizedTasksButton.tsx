import React from 'react'
import { useDialogContext } from '../../contexts/DialogContext'
import { useAuth } from '../../contexts/AuthContext'
import { useAlertCallback } from '../../contexts/AlertContext'
import { Model, type Character, type TaskAndStatus } from 'ms-tracker-library'
import { taskStatusApi } from '../api'

export const EditPrioritizedTasksComponent = (props: { character: Character, tasks: TaskAndStatus[] }) => {
  const { character, tasks } = props
  const { user } = useAuth()
  const alert = useAlertCallback()
  const { closeDialog } = useDialogContext()

  const [priorities, setPriorities] = React.useState<boolean[]>(tasks.map((t) => t.isPriority))

  const toggleTaskPriorityCurriedFunc = (task: TaskAndStatus, index: number) => {
    return () => {
      priorities[index] = !priorities[index]
      console.log(priorities)
      setPriorities([...priorities])
    }
  }

  const submit = () => {
    if (user == null) {
      alert('Failed to save: user was undefined')
      return
    };

    const tasksToPrioritize: string[] = []
    const tasksToDeprioritize: string[] = []
    priorities.forEach((shouldPrioritize, index) => {
      const arr = (shouldPrioritize) ? tasksToPrioritize : tasksToDeprioritize
      const taskId = tasks[index].taskId
      arr.push(taskId)
    })

    taskStatusApi.updatePriorities(user, character.name, tasksToPrioritize, tasksToDeprioritize)
      .then(() => {
        alert({
          text: `Successfully updated ${character.name}'s prioritized tasks`,
          alertLevel: 'info'
        })
        closeDialog()
      })
      .catch((err) => {
        alert(err)
        closeDialog()
      })
  }

  return (
    <>
      <div className="text-lg font-bold pb-3 text-center">Editing tasks for {character.name}</div>
      <div className="max-h-120 min-h-80 overflow-y-scroll">
        <tbody>
          {
            tasks.map((task, index) => {
              const { name, resetType, taskType } = task
              const isPriority = priorities[index]
              return (<tr key={`EditPrioritizedTasksRow-${character.name}-${name}`}>
                <td>
                  <div className="flex items-center space-x-3 font-bold">
                    { name }
                  </div>
                </td>

                <td>
                  {Model.getReadableResetText(resetType)}
                </td>

                <td>
                  {Model.getReadableTaskType(taskType)}
                </td>

                <td>
                  <input type="checkbox" className="checkbox" checked={isPriority} onChange={toggleTaskPriorityCurriedFunc(task, index)}/>
                </td>
              </tr>)
            })
          }
        </tbody>
      </div>

      <div className="flex items-center w-full max-w-xs pb-5 pt-3 px-3">
        <span className="btn btn-primary btn-sm ml-auto" onClick={submit}>Save</span>
      </div>
    </>
  )
}

export const EditPrioritizedTasksButton = (props: { character: Character, tasks: TaskAndStatus[] }) => {
  const { character, tasks } = props
  const { openDialog } = useDialogContext()
  const onClick = () => {
    openDialog((<EditPrioritizedTasksComponent character={character} tasks={tasks}/>))
  }
  return (
    <button className="btn btn-primary" onClick={onClick}>
            Edit Tasks
    </button>
  )
}
