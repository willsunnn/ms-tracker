import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useAlertCallback } from '../../contexts/AlertContext'
import { useApi } from '../../contexts/ApiContext'
import { DragDropContext, Draggable, type DropResult } from 'react-beautiful-dnd'
import { type CharacterWithMapleGgData } from 'ms-tracker-library'
import { StrictModeDroppable } from '../helper/StrictModeDroppable'
import { CharacterView } from '../CharacterView'

const CharacterCard = (props: { character: CharacterWithMapleGgData }) => {
  const { character } = props
  const name = character.mapleGgData?.name ?? character.name
  const className = character.mapleGgData?.class ?? ''
  const level = character.mapleGgData?.level ? `Lvl ${character.mapleGgData.level}` : ''

  return (<div className='w-full card card-body bg-base-200 shadow-sm gap-y-1 p-2 items-center'>
    <div className='w-2/3 grid grid-cols-2'>

    <div className='h-24 w-24 row-span-5'>
      <CharacterView character={character} showName={false}/>
    </div>
    <div/>
    <div className='text-lg font-bold -mb-2 truncate mr-4'>{name}</div>
    <div className='text-sm mr-4'>{className}</div>
    <div className='text-sm -mt-3 mr-4'>{level}</div>
    <div/>

    </div>
  </div>)
}

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
        <div ref={provided.innerRef} {...provided.droppableProps} className="grid grid-cols-1 gap-8 px-4 pt-2 pb-4">
            <div className='w-full text-center font-semibold'>Drag and drop characters to reorder them</div>
            {characters.map((character: CharacterWithMapleGgData, index: number) => {
            // For each character we return a card that is draggable
            // that contains the TaskViewSingleCharacter
              return (
                <Draggable draggableId={character.id} index={index} key={`TaskViewSingleCharacter-${character.name}`}>
                  {provided => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="w-full">
                      <CharacterCard character={character}/>
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
