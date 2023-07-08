import { type TaskAndStatus, Model, type CharacterWithMapleGgData } from 'ms-tracker-library'
import { useSettings } from '../../../contexts/SettingsContext'
import { type TaskViewProps } from '../TaskViewPage'
import { CharacterTaskView } from './CharacterTaskView'
import { ResetTaskView } from './ResetTaskView'

interface TaskAndStatusAndCharacter {
  status: TaskAndStatus
  taskIndex: number
  character: CharacterWithMapleGgData
  characterIndex: number
  resetDate: Date
}

export interface TasksGroupedByDateAndCharacter {
  resetDate: Date
  characters: Array<{
    character: CharacterWithMapleGgData
    tasks: TaskAndStatus[]
  }>
}

export const TaskViewByReset = (props: { taskViewAttrs: TaskViewProps }) => {
  // Join all the data that the child views will need
  const allTaskStatusCharacters: TaskAndStatusAndCharacter[] = props.taskViewAttrs.tasks.flatMap((task, taskIndex) => {
    return props.taskViewAttrs.characters.map((character, characterIndex) => {
      const status = props.taskViewAttrs.taskStatus.get(character.id)?.get(task.taskId) ?? Model.defaultTaskStatus(props.taskViewAttrs.user.uid, character.id, task.taskId)
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

  // Only show tasks that are prioritized but havent been finished
  // Sort them by (resetDate, characterIndex, taskIndex)
  // Group them by (resetDate, character
  const groupedTasks: TasksGroupedByDateAndCharacter[] = []
  allTaskStatusCharacters.filter((task) => task.status.isPriority)
    .filter((task) => task.status.clearTimes.length < task.status.maxClearCount)
    .sort((a, b) => (a.resetDate.getTime() - b.resetDate.getTime()) || (a.characterIndex - b.characterIndex) || (a.taskIndex - b.taskIndex))
    .forEach((task) => {
      const lastTime = groupedTasks.length > 0 ? (groupedTasks[groupedTasks.length - 1].resetDate.getTime()) : undefined
      if (lastTime !== task.resetDate.getTime()) {
        groupedTasks.push({ resetDate: task.resetDate, characters: [] })
      }

      const characters = groupedTasks[groupedTasks.length - 1].characters
      const lastCharacterId = characters.length > 0 ? (characters[characters.length - 1].character.id) : undefined
      if (lastCharacterId !== task.character.id) {
        characters.push({ character: task.character, tasks: [] })
      }

      characters[characters.length - 1].tasks.push(task.status)
    })

  return (
    <div className="flex flex-col w-full h-fit items-center">
      <div className="flex flex-col max-w-lg w-full">
        {
          groupedTasks.map(({ resetDate, characters }) => (
            // <div className="" key={`TaskTodo-ResetTaskView-${resetDate.getTime()}`}>
              <ResetTaskView key={`TaskTodo-ResetTaskView-${resetDate.getTime()}`} resetDate={resetDate} characters={characters} />
            // </div>
          ))
        }
      </div>

    </div>
  )
}
