import React from 'react'
import { useDialogContext } from '../../contexts/DialogContext'
import { useAuth } from '../../contexts/AuthContext'
import { useAlertCallback } from '../../contexts/AlertContext'
import { Model, type CharacterWithMapleGgData, type TaskAndStatus, GroupedTasksAndStatuses } from 'ms-tracker-library'
import { useApi } from '../../contexts/ApiContext'

export const EditPrioritizedTasksComponent = (props: { character: CharacterWithMapleGgData, tasks: GroupedTasksAndStatuses[] }) => {
  const { character } = props
  const characterName = character.mapleGgData?.name ?? character.name

  const { user } = useAuth()
  const alert = useAlertCallback()
  const { closeDialog } = useDialogContext()
  const { taskStatusApi } = useApi()

  const [tasks, setTasks] = React.useState<TaskAndStatus[]>(props.tasks.map((group) => group.tasks).flat(1))
  const priorities = tasks.map(t => t.isPriority)

  const toggleTaskPriorityCurriedFunc = (taskId: string) => {
    return () => {
      if (user == null) {
        alert('Failed to update tasks: user was undefined')
        return
      }
      const task = tasks.find((task) => task.taskId === taskId)
      if (task == null) {
        alert(`Could not find task with taskId ${taskId} to prioritize`)
        return
      }

      // toggle the priority
      task.isPriority = !task.isPriority
      setTasks([...tasks])

      taskStatusApi.updatePriority(user, character, task.taskId, task.isPriority)
        .then(() => {
          const message = `${task.isPriority ? 'Prioritized' : 'Deprioritized'} ${task.name} for ${characterName}`
          alert({
            text: message,
            alertLevel: 'info'
          })
        })
        .catch((err) => {
          alert(err)
          closeDialog()
        })
    }
  }

  return (
    <>
      <div className="text-lg font-bold pb-3 text-center">Editing tasks for {characterName}</div>
      <table className="max-h-120 min-h-80 overflow-y-scroll">
        <tbody>
          {
            tasks.map((task, index) => {
              const { name, resetType, taskType } = task
              const isPriority = priorities[index]
              return (<tr key={`EditPrioritizedTasksRow-${characterName}-${name}`}>
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
                  <input type="checkbox" className="checkbox" checked={isPriority} onChange={toggleTaskPriorityCurriedFunc(task.taskId)}/>
                </td>
              </tr>)
            })
          }
        </tbody>
      </table>
    </>
  )
}
