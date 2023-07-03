import React from 'react'
import { useDialogContext } from '../../contexts/DialogContext'
import { useAuth } from '../../contexts/AuthContext'
import { useAlertCallback } from '../../contexts/AlertContext'
import { useApi } from '../../contexts/ApiContext'
import { DragDropContext, Draggable, type DropResult } from 'react-beautiful-dnd'
import { type CharacterWithMapleGgData } from 'ms-tracker-library'
import { StrictModeDroppable } from '../helper/StrictModeDroppable'
import { CharacterView } from '../CharacterView'

export const EditCharacterOrderComponent = (props: { characters: CharacterWithMapleGgData[] }) => {
  const { characterApi } = useApi()
  const { user } = useAuth()
  const alert = useAlertCallback()

  const [characters, setCharacters] = React.useState<CharacterWithMapleGgData[]>(props.characters)

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return
    }
    if (result.destination.index === result.source.index) {
      return
    }
    const charToMove = characters[result.source.index]
    const remainingChars = characters.slice(0, result.source.index).concat(characters.slice(result.source.index + 1))
    const finalOrder = [...remainingChars.slice(0, result.destination.index), charToMove, ...remainingChars.slice(result.destination.index)]

    // Update the local model
    setCharacters(finalOrder)

    // Send update to firebase
    if (user) {
      characterApi.set(user, {
        characters: finalOrder
      }).then(() => {
        alert({
          text: 'Successfully updated character oder',
          alertLevel: 'info'
        })
      }).catch(alert)
    }
  }

  return (
  <DragDropContext onDragEnd={onDragEnd}>
    <StrictModeDroppable droppableId={'character-list'}>
      {provided => (
        <div ref={provided.innerRef} {...provided.droppableProps} className="w-full">
            {characters.map((character: CharacterWithMapleGgData, index: number) => {
            // For each character we return a card that is draggable
            // that contains the TaskViewSingleCharacter
              return (
                <Draggable draggableId={character.id} index={index} key={`TaskViewSingleCharacter-${character.name}`}>
                  {provided => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="w-fit">
                      <CharacterView character={character} showName={true}/>
                    </div>
                  )}
                </Draggable>
              )
            })}
          { provided.placeholder }
        </div>
      )}
    </StrictModeDroppable>
  </DragDropContext>
  )
}

export const EditCharacterOrderButton = (props: { characters: CharacterWithMapleGgData[] }) => {
  const { openDialog } = useDialogContext()
  const onClick = () => {
    openDialog((<EditCharacterOrderComponent characters={props.characters}/>))
  }
  return (
    <button className="btn btn-primary" onClick={onClick}>
      Edit Character Order
    </button>
  )
}
