import { type TaskViewProps } from '../TaskViewPage'
import { type CharacterWithMapleGgData, emptyTaskStatusForCharacter, Model } from 'ms-tracker-library'
import { CharacterTaskView } from './CharacterTaskView'
import { AddCharacterFullPageSpread } from '../../pagespread/AddCharacterFullPageSpread'
import { AddCharacterHelperPrompt } from '../../pagespread/AddCharacterHelperPrompt'

export const TaskViewByCharacter = (props: { taskViewAttrs: TaskViewProps }) => {
  const { user, tasks, taskStatus, characters } = props.taskViewAttrs
  if (characters.length === 0) {
    return <AddCharacterFullPageSpread />
  }

  return (
    <div className="grid grid-cols-1 w-full gap-8 lg:grid-cols-2 2xl:grid-cols-3 pb-4">
      {characters.map((character: CharacterWithMapleGgData) => {
        // For each character we return a card that contains the CharacterTaskView
        const taskStatusForCharacter = taskStatus.get(character.id) ?? emptyTaskStatusForCharacter()
        const tasksAndStatuses = Model.joinTasksAndStatuses(user, character, tasks, taskStatusForCharacter)
        return (
          <div className="max-w-full" key={`TaskViewByCharacter-character-${character.id}`}>
            <CharacterTaskView
              tasks={tasksAndStatuses} character={character}/>
          </div>
        )
      })}
      {characters.length === 1 && <AddCharacterHelperPrompt/>}
    </div>
  )
}
