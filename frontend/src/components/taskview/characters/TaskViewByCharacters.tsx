import { CharacterTaskView } from './CharacterTaskView'
import { AddCharacterFullPageSpread } from '../../pagespread/AddCharacterFullPageSpread'
import { AddCharacterHelperPrompt } from '../../pagespread/AddCharacterHelperPrompt'
import { type DataWrapper } from 'ms-tracker-library/lib/models/helper'

export const TaskViewByCharacter = (props: { data: DataWrapper }) => {
  const { data } = props
  if (!data.hasCharacters()) {
    return <AddCharacterFullPageSpread />
  }

  return (
    <div className="grid grid-cols-1 w-full gap-8 lg:grid-cols-2 2xl:grid-cols-3 pb-4">
      {data.getByCharacterThenGroupThenTask().map((characterAndTasks) => {
        // For each character we return a card that contains the CharacterTaskView
        const { character, tasks } = characterAndTasks
        return (
          <div className="max-w-full" key={`TaskViewByCharacter-character-${character.id}`}>
            <CharacterTaskView
              groupedTasks={tasks} character={character}/>
          </div>
        )
      })}
      {!data.hasMultipleCharacters() && <AddCharacterHelperPrompt/>}
    </div>
  )
}
