import { Model, type TaskAndStatus } from 'ms-tracker-library'
import { type TaskViewProps } from '../TaskViewPage'
import { defaultTaskStatus } from 'ms-tracker-library/lib/models/helper'
import { useApi } from '../../../contexts/ApiContext'
import { useSettings } from '../../../contexts/SettingsContext'

export const TaskViewCompact = (props: { taskViewAttrs: TaskViewProps }) => {
  const { user, characters } = props.taskViewAttrs
  const { taskStatusApi } = useApi()
  const { dateFormat } = useSettings()

  const tasksAndStatuses = props.taskViewAttrs.tasks.map((task) => {
    const statuses = characters.map((character) => {
      const status = props.taskViewAttrs.taskStatus.get(character.id)?.get(task.taskId) ?? defaultTaskStatus(user.uid, character.id, task.taskId)
      const taskAndStatus: TaskAndStatus = {
        ...task,
        ...status
      }
      return taskAndStatus
    })
    const hasAnyCharacterThatPrioritizes = statuses.filter((status) => status.isPriority).length > 0

    return {
      ...task,
      statuses,
      isAnyPriority: hasAnyCharacterThatPrioritizes
    }
  })

  const prioritizedTasksAndStatuses = tasksAndStatuses.filter((task) => task.isAnyPriority)

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

  return (
    <div className="card bg-base-200 shadow-xl my-2 p-3">
    <table className="table w-full"><tbody>
      <tr>
        <th/>
        <th/>
        {
          characters.map((character) => {
            const name = character.mapleGgData?.name ?? character.name
            return (
              <th key={`header-${name}`}>{name}</th>
            )
          })
        }
      </tr>
      {
        prioritizedTasksAndStatuses.map((task) => {
          const { name, resetType } = task
          const resetsAt = Model.nextReset(resetType)
          const key = `TaskOverviewRow-${task.taskId}}`
          return (<tr key={key}>
            <td className="p-0">
              <div className="font-bold">{name}</div>
            </td>

            <td className="p-0">
              {Model.getReadableTime(resetsAt, dateFormat)}
            </td>

            {
              task.statuses.map((status) => {
                const isComplete = status.clearTimes.length >= status.maxClearCount
                return (
                  <td className="p-0" key={`TaskOverviewCell-${task.taskId}-${status.characterId ?? ''}`}>
                    <input type="checkbox" className="checkbox checkbox-sm" checked={isComplete} onChange={checkBoxOnClickCurryFunc(status)}/>
                  </td>
                )
              })
            }
          </tr>)
        })
      }
    </tbody></table>
    </div>
  )
}
