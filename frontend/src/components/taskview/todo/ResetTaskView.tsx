import { Model } from 'ms-tracker-library'
import { useSettings } from '../../../contexts/SettingsContext'
import { type TasksGroupedByDateAndCharacter } from './TaskTodo'
import { CharacterTaskView } from './CharacterTaskView'

export const ResetTaskView = (props: TasksGroupedByDateAndCharacter) => {
  const { resetDate, characters } = props
  const { dateFormat } = useSettings()

  return (
    <div className='flex flex-col card bg-base-200 shadow-xl my-2 p-5 h-fit w-full' key={`todoview-${resetDate.getTime()}`}>
      <div className='flex flex-row pb-2'>
        <div className='grow text-lg font-bold'>{Model.getReadableTime(resetDate, 'absolute')}</div>
        <div className='text-lg font-semibold'>{Model.getReadableTime(resetDate, 'relative')}</div>
      </div>
      {
        characters.map((character, index) => {
          return (<>
            {
              (index !== 0) && (<div className='divider w-full my-1 p-0'/>)
            }
            <CharacterTaskView key={`TaskTodo-CharacterTaskView-${resetDate.getTime()}-${character.character.id}`} character={character.character} tasks={character.tasks}/>
          </>)
        })
      }
    </div>
  )
}
