import { type TaskAndStatus, Model, type CharacterWithMapleGgData } from 'ms-tracker-library'
import { useApi } from '../../../contexts/ApiContext'
import { useSettings } from '../../../contexts/SettingsContext'
import { type TaskViewProps } from '../TaskViewPage'

interface TaskAndStatusAndCharacter {
  status: TaskAndStatus
  taskIndex: number
  character: CharacterWithMapleGgData
  characterIndex: number
  resetDate: Date
}

export const TaskViewByReset = (props: { taskViewAttrs: TaskViewProps }) => {
  const { user, characters, taskStatus, tasks } = props.taskViewAttrs
  const { taskStatusApi } = useApi()
  const { dateFormat } = useSettings()

  // Data here will be ordered by (resetDate, characterIndex, taskIndex)

  const allTaskStatusCharacters: TaskAndStatusAndCharacter[] = tasks.flatMap((task, taskIndex) => {
    return characters.map((character, characterIndex) => {
      const status = taskStatus.get(character.id)?.get(task.taskId) ?? Model.defaultTaskStatus(user.uid, character.id, task.taskId)
      const taskAndStatus: TaskAndStatus = Model.trimClearTimes({
        ...status,
        ...task
      })
      const resetDate = Model.nextReset(new Date(), task.resetType)
      return {
        status: taskAndStatus,
        taskIndex,
        character,
        characterIndex,
        resetDate
      }
    })
  })

  const todo = allTaskStatusCharacters.filter((task) => task.status.isPriority)
    .filter((task) => task.status.clearTimes.length < task.status.maxClearCount)
  todo.sort((a, b) => (a.resetDate.getTime() - b.resetDate.getTime()) || (a.characterIndex - b.characterIndex) || (a.taskIndex - b.taskIndex))

  const groupedTasks: Array<{ resetDate: Date, tasks: TaskAndStatusAndCharacter[] }> = []
  let lastTime: number | null = null
  todo.forEach((task) => {
    if (task.resetDate.getTime() !== lastTime) {
      lastTime = task.resetDate.getTime()
      groupedTasks.push({
        resetDate: task.resetDate,
        tasks: []
      })
    }
    groupedTasks[groupedTasks.length - 1].tasks.push(task)
  })

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
    <div className='flex flex-col'>
      {
        groupedTasks.map((groupedTasks) => {
          return (<div className='flex flex-col' key={`todoview-${groupedTasks.resetDate.getTime()}`}>
            <p>{Model.getReadableTime(groupedTasks.resetDate, dateFormat)}</p>
            {
              groupedTasks.tasks.map((task) => {
                return (
                  <div className='flex flex-row' key={`todoview-${groupedTasks.resetDate.getTime()}-${task.status.name}-${task.character.id}`}>
                    <p>{task.character.name}</p>
                    <p>{task.status.name}</p>
                    <input type="checkbox" key={`todoview-${groupedTasks.resetDate.getTime()}-${task.status.name}-${task.character.id}`} className="checkbox checkbox-sm" checked={task.status.clearTimes.length >= task.status.maxClearCount} onChange={checkBoxOnClickCurryFunc(task.status)}/>
                  </div>
                )
              })
            }
          </div>)
        })
      }
    </div>
  )
}
