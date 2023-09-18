import { CharacterView } from '../../CharacterView'
import { type CharacterWithMapleGgData, type TaskAndStatus } from 'ms-tracker-library'
import { CharacterContextActionsDropdown } from './CharacterContextActionsDropdown'
import { CharacterTaskList } from './CharacterTaskList'

interface CharacterTaskViewProps {
  character: CharacterWithMapleGgData
  tasks: TaskAndStatus[]
  isPreview?: boolean
}

export const CharacterTaskView = (props: CharacterTaskViewProps) => {
  const { character, tasks } = props
  const isPreview = props.isPreview ?? false

  // render data
  const prioritizedTasks = tasks.filter((task) => task.isPriority)
  return (
    <div className="card bg-base-200 shadow-xl my-2 p-3 min-h-fit h-full">

      {/* This div contains the dropdown button that has the Edit and Delete Options
          This and the hint div are rendered absolute from the top right */}
      <div className="absolute right-4 top-4">
        <CharacterContextActionsDropdown
          hasPrioritizedTasks={prioritizedTasks.length !== 0}
          character={character}
          tasks={tasks}
          isPreview={isPreview}/>
      </div>

      {/* This div contains the content for the card
          This means the CharacterView and the grid of prioritized tasks */}
      <div className="flex flex-row pr-10">
        <div className='min-w-[8rem] max-w-[8rem] min-h-fit '>
          <CharacterView name={character.name} mapleGgData={character.mapleGgData} showName={true}/>
        </div>
        <CharacterTaskList tasks={prioritizedTasks} isPreview={isPreview}/>
      </div>
    </div>
  )
}
