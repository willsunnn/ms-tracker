import { type TaskAndStatus, Model } from 'ms-tracker-library'
import { useAlertCallback } from '../../../contexts/AlertContext'
import { useApi } from '../../../contexts/ApiContext'

interface CharacterTaskListProps {
  tasks: TaskAndStatus[]
}

export const CharacterTaskList = (props: CharacterTaskListProps) => {
  const { tasks } = props
  const alert = useAlertCallback()
  const { taskStatusApi } = useApi()

  // define event handlers
  const checkBoxOnChangeCurryFunc = (task: TaskAndStatus) => {
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
    <table className="table w-full"><tbody>
      {
        tasks.map((task) => {
          const { name, resetType } = task
          const resetsAt = Model.nextReset(resetType)
          const key = `TaskViewRow-${task.characterId ?? ''}-${task.taskId}}`
          const isComplete = task.clearTimes.length >= task.maxClearCount
          return (<tr key={key}>
            <td className="p-0">
              <div className="font-bold">{name}</div>
            </td>

            <td className="p-0">
              {resetsAt.toLocaleString()}
            </td>

            <td className="p-0">
              <input type="checkbox" className="checkbox" checked={isComplete} onChange={checkBoxOnChangeCurryFunc(task)}/>
            </td>
          </tr>)
        })
      }
    </tbody></table>
  )
}
