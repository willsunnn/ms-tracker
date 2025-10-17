import { useApi } from '../../../contexts/ApiContext'
import { type CharacterWithCachedData, type TaskAndStatus } from 'ms-tracker-library'

interface CharacterTaskViewProps {
  character: CharacterWithCachedData
  tasks: TaskAndStatus[]
}

export const CharacterTaskView = (props: CharacterTaskViewProps) => {
  const { character, tasks } = props
  const characterName = character.cachedData?.name ?? character.name
  const { taskStatusApi } = useApi()

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
    <div className="w-full flex flex-col my-1">
      <div className="w-full font-semibold text-lg">{characterName}</div>
      {tasks.map((task) => {
        return (
          <div
            className="w-full flex flex-row hover:bg-base-300 pl-4 transition-colors"
            key={`CharacterTaskView-${task.name}-${character.id}`}
          >
            <div className="flex-grow">{task.name}</div>
            <input
              type="checkbox"
              className="checkbox checkbox-sm"
              checked={task.clearTimes.length >= task.maxClearCount}
              onChange={checkBoxOnClickCurryFunc(task)}
            />
          </div>
        )
      })}
    </div>
  )
}
