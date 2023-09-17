import { Model, type TaskAndStatus } from 'ms-tracker-library'
import { type TaskViewProps } from '../TaskViewPage'
import { useApi } from '../../../contexts/ApiContext'
import { useSettings } from '../../../contexts/SettingsContext'
import { NoTaskRenavigateFullPageSpread } from '../../pagespread/NoTasksRenavigateFullPageSpread'

export const TaskViewCompact = (props: { taskViewAttrs: TaskViewProps }) => {
  const { user, characters } = props.taskViewAttrs
  const { taskStatusApi } = useApi()
  const { dateFormat } = useSettings()

  const groupedTasksAndStatuses = props.taskViewAttrs.groupedTasks.map(
    (taskGroup) => {
      return taskGroup.map((task) => {
        const statuses = characters.map((character) => {
          const status = props.taskViewAttrs.taskStatus.get(character.id)?.get(task.taskId) ?? Model.defaultTaskStatus(user.uid, character.id, task.taskId)
          const taskAndStatus: TaskAndStatus = {
            ...task,
            ...status
          }
          return Model.trimClearTimes(taskAndStatus)
        })
        const hasAnyCharacterThatPrioritizes = statuses.filter((status) => status.isPriority).length > 0

        return {
          ...task,
          statuses,
          isAnyPriority: hasAnyCharacterThatPrioritizes
        }
      })
    }
  )

  const prioritizedGroupedTasksAndStatuses = groupedTasksAndStatuses.map((taskGroup) => taskGroup.filter((task) => task.isAnyPriority))
    .filter((taskGroup) => taskGroup.length > 0)
  const prioritizedGroupedTasksAndStatusesAndGroupIndex = prioritizedGroupedTasksAndStatuses.map((taskGroup, groupIndex) => {
    return taskGroup.map((task) => {
      return {
        ...task,
        groupIndex
      }
    })
  })
  const prioritizedTasksAndStatuses = prioritizedGroupedTasksAndStatusesAndGroupIndex.flat(1)
  const hasTasks = prioritizedTasksAndStatuses.length > 0

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

  if (!hasTasks) {
    return <NoTaskRenavigateFullPageSpread/>
  }

  return (
    <div className="absolute w-screen h-screen left-0 top-0 right-0 py-20 px-5">
      <table className="table w-full h-full">
        <thead>
          <tr>
            <th/>
            <th/>
            {
              characters.map((character) => {
                const name = character.mapleGgData?.name ?? character.name
                return (
                  <th key={`header-${name}`} className='w-[32px] h-[120px]'>
                    <div className="-translate-x-1/4 -rotate-45 w-[30px]">
                      {name}
                    </div>
                  </th>
                )
              })
            }
          </tr>
        </thead>
        <tbody className='overflow-scroll'>
        {
          prioritizedTasksAndStatuses.map((task) => {
            const { name, resetType } = task
            const resetsAt = Model.nextReset(new Date(), resetType)
            const key = `TaskOverviewRow-${task.taskId}}`
            const backgroundColor = task.groupIndex % 2 === 0 ? 'bg-primary bg-opacity-5' : 'bg-secondary bg-opacity-5'
            const focusedBackgroundColor = task.groupIndex % 2 === 0 ? 'bg-primary bg-opacity-20' : 'bg-secondary bg-opacity-20'
            const contentColor = task.groupIndex % 2 === 0 ? 'primary-content' : 'secondary-content'
            return (<tr key={key} className={`${backgroundColor}`}>
              <td className={`p-0 ${contentColor}`}>
                <div className="font-bold">{name}</div>
              </td>

              <td className="p-0">
                {Model.getReadableTime(resetsAt, dateFormat)}
              </td>

              {
                task.statuses.map((status) => {
                  const isComplete = status.clearTimes.length >= status.maxClearCount
                  return (
                    <td className={`p-1 w-fit h-fit align-middle ${status.isPriority ? focusedBackgroundColor : backgroundColor}`} key={`TaskOverviewCell-${task.taskId}-${status.characterId ?? ''}`}>
                      <input type="checkbox" className={`checkbox checkbox-sm w-4 h-4`} checked={isComplete} onChange={checkBoxOnClickCurryFunc(status)}/>
                    </td>
                  )
                })
              }
            </tr>)
          })
        }
      </tbody>
      </table>
    </div>
  )
}
