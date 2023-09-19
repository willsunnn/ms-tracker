import { type TaskAndStatus, Model } from 'ms-tracker-library'
import { useAlertCallback } from '../../../contexts/AlertContext'
import { useApi } from '../../../contexts/ApiContext'
import { useSettings } from '../../../contexts/SettingsContext'

interface CharacterTaskListProps {
  tasks: TaskAndStatus[]
  isPreview: boolean
}

export const CharacterTaskList = (props: CharacterTaskListProps) => {
  const { tasks, isPreview } = props
  const alert = useAlertCallback()
  const { taskStatusApi } = useApi()
  const { dateFormat } = useSettings()

  const gridStyle = {
    gridTemplateColumns: '1fr 1fr 2em'
  }

  // define event handlers
  const checkBoxOnChangeCurryFunc = (task: TaskAndStatus) => {
    return () => {
      if (isPreview) {
        return
      }
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
    <div className="grid grid-cols-3 gap-x-2 grow auto-cols-fr h-fit" style={gridStyle}>
      {
        tasks.map((task, index) => {
          task = Model.trimClearTimes(task)
          const { name, resetType } = task
          const characterId = task.characterId ?? ''
          const resetsAt = Model.nextReset(new Date(), resetType)
          const isComplete = task.clearTimes.length >= task.maxClearCount
          return (<>
            { (index !== 0) && <div key={`divider-${name}-${characterId}`} className="divider col-span-3 -my-1.5 w-[1fr]"></div>}
            <div key={`name-${name}-${characterId}`} className="font-bold grow text-sm">{name}</div>

            <div key={`time-${name}-${characterId}`} className="text-sm">
              {Model.getReadableTime(resetsAt, dateFormat)}
            </div>

            <input key={`status-${name}-${characterId}`} type="checkbox" className="checkbox" checked={isComplete} onChange={checkBoxOnChangeCurryFunc(task)}/>
          </>)
        })
      }
    </div>
  )
}
