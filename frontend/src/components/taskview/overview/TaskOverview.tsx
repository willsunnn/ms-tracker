import { Model, type Task, type TaskStatus } from 'ms-tracker-library'
import { useApi } from '../../../contexts/ApiContext'
import { useSettings } from '../../../contexts/SettingsContext'
import { NoTaskRenavigateFullPageSpread } from '../../pagespread/NoTasksRenavigateFullPageSpread'
import { type DataWrapper, type TaskAndStatusesAndGroupIndex } from 'ms-tracker-library/lib/models/helper'

export const TaskViewCompact = (props: { data: DataWrapper }) => {
  const { data } = props
  const { taskStatusApi } = useApi()
  const { dateFormat } = useSettings()

  const tasks = data.getPrioritizedByGroupThenTaskThenCharacter()
  const hasTasks = tasks.length > 0

  const checkBoxOnClickCurryFunc = (task: Task, status: TaskStatus) => {
    return () => {
      const numClears = status.clearTimes.length
      const isComplete = numClears >= task.maxClearCount
      if (isComplete) {
        status.clearTimes = []
      } else {
        const now = new Date().getTime()
        while (status.clearTimes.length < task.maxClearCount) {
          status.clearTimes.push(now)
        }
      }
      taskStatusApi.set(status).then(() => {}).catch(alert)
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
              tasks.map((task) => {
                const { backgroundColor, contentColor } = colors(task)
                return (
                  <div key={`task-title-${task.task.taskId}`} className={`${rowHeightStyle} truncate ${backgroundColor} px-2`}>
                    <div className={contentColor}>
                      {task.task.name}
                    </div>
                  </div>
                )
              })
            }
          </div>
          <div className='flex flex-col w-fit h-fit grow'>
            <div className={tableHeaderHeight}/>
            {
              tasks.map((task) => {
                const { backgroundColor, contentColor } = colors(task)
                const resetDate = Model.nextReset(new Date(), task.task.resetType)
                return (
                  <div key={`task-expire-${task.task.taskId}`} className={`${rowHeightStyle} truncate ${backgroundColor} px-2`}>
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
                data.getCharacters().map((character) => {
                  const name = character.mapleGgData?.name ?? character.name
                  return (
                    <div key={`header-${name}`} className='w-[32px] h-[120px]'>
                      <div className="translate-x-1/4 -rotate-45 w-[30px] translate-y-20">
                        {name}
                      </div>
                    </div>
                  )
                })
              }
            </div>
            {
              tasks.map((task) => {
                const { backgroundColor, focusedBackgroundColor, contentColor } = colors(task)
                return (
                  <div className={`flex flex-row ${rowHeightStyle} w-fit`} key={`task-statuses-${task.task.taskId}`}>
                    {
                      task.statuses.map((status) => {
                        const isComplete = status.clearTimes.length >= task.task.maxClearCount
                        return (
                          <div className={`${columnWidthStyle} ${status.isPriority ? focusedBackgroundColor : backgroundColor} flex items-center justify-center`} key={`TaskOverviewCell-${task.task.taskId}-${status.characterId ?? ''}`}>
                            <input type="checkbox" className={`checkbox checkbox-sm w-4 h-4 ${contentColor}`} checked={isComplete} onChange={checkBoxOnClickCurryFunc(task.task, status)}/>
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
