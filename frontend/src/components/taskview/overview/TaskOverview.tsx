import { Model, type Task, type TaskAndStatus } from 'ms-tracker-library'
import { type TaskViewProps } from '../TaskViewPage'
import { useApi } from '../../../contexts/ApiContext'
import { useSettings } from '../../../contexts/SettingsContext'
import { NoTaskRenavigateFullPageSpread } from '../../pagespread/NoTasksRenavigateFullPageSpread'

type TaskAndStatusesAndGroupIndex = Task & {
  statuses: TaskAndStatus []
  groupIndex: number
}

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
  const prioritizedTasksAndStatuses: TaskAndStatusesAndGroupIndex[] = prioritizedGroupedTasksAndStatusesAndGroupIndex.flat(1)
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

  const tableHeaderHeight = 'h-32'
  const columnWidthStyle = 'w-8'
  const rowHeightStyle = 'h-8'

  const colors = (task: TaskAndStatusesAndGroupIndex) => {
    const backgroundColor = task.groupIndex % 2 === 0 ? 'bg-primary bg-opacity-10' : 'bg-secondary bg-opacity-10'
    const focusedBackgroundColor = task.groupIndex % 2 === 0 ? 'bg-primary bg-opacity-25' : 'bg-secondary bg-opacity-25'
    const contentColor = task.groupIndex % 2 === 0 ? 'primary-content' : 'secondary-content'
    return {
      backgroundColor,
      focusedBackgroundColor,
      contentColor
    }
  }

  return (
    <div className='absolute w-screen h-screen left-0 top-0 pt-24 px-5 bg-base-300 overflow-scroll'>
      <div className='pb-12'>
        <div className='flex w-full h-full pb-12'>
          <div className='flex flex-col w-fit h-fit grow'>
            <div className={tableHeaderHeight}/>
            {
              prioritizedTasksAndStatuses.map((task) => {
                const { backgroundColor, contentColor } = colors(task)
                return (
                  <div key={`task-title-${task.taskId}`} className={`${rowHeightStyle} truncate ${backgroundColor} px-2`}>
                    <div className={contentColor}>
                      {task.name}
                    </div>
                  </div>
                )
              })
            }
          </div>
          <div className='flex flex-col w-fit h-fit grow'>
            <div className={tableHeaderHeight}/>
            {
              prioritizedTasksAndStatuses.map((task) => {
                const { backgroundColor, contentColor } = colors(task)
                const resetDate = Model.nextReset(new Date(), task.resetType)
                return (
                  <div key={`task-expire-${task.taskId}`} className={`${rowHeightStyle} truncate ${backgroundColor} px-2`}>
                    <div className={contentColor}>
                      {Model.getReadableTime(resetDate, dateFormat)}
                    </div>
                  </div>
                )
              })
            }
          </div>
          <div className='flex flex-col h-fit mr-12'>
            <div className={`flex flex-row ${tableHeaderHeight}`}>
              {
                characters.map((character) => {
                  const name = character.mapleGgData?.name ?? character.name
                  return (
                    <div key={`header-${name}`} className='w-[32px] h-[120px]'>
                      <div className="translate-x-1/4 -rotate-45 w-[30px] translate-y-20 text-sm">
                        {name}
                      </div>
                    </div>
                  )
                })
              }
            </div>
            {
              prioritizedTasksAndStatuses.map((task) => {
                const { backgroundColor, focusedBackgroundColor, contentColor } = colors(task)
                return (
                  <div className={`flex flex-row ${rowHeightStyle} w-fit`} key={`task-statuses-${task.taskId}`}>
                    {
                      task.statuses.map((status) => {
                        const isComplete = status.clearTimes.length >= status.maxClearCount
                        return (
                          <div className={`${columnWidthStyle} ${status.isPriority ? focusedBackgroundColor : backgroundColor} flex items-center justify-center`} key={`TaskOverviewCell-${task.taskId}-${status.characterId ?? ''}`}>
                            <input type="checkbox" className={`checkbox checkbox-sm w-4 h-4 ${contentColor}`} checked={isComplete} onChange={checkBoxOnClickCurryFunc(status)}/>
                          </div>
                        )
                      })
                    }
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}
