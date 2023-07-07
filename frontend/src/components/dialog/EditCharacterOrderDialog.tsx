import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useAlertCallback } from '../../contexts/AlertContext'
import { useApi } from '../../contexts/ApiContext'
import { type CharacterWithMapleGgData } from 'ms-tracker-library'
import { CharacterView } from '../CharacterView'
import { DndContext, type DragEndEvent, useDroppable } from '@dnd-kit/core'
import { CSS as DndCss } from '@dnd-kit/utilities'
import { SortableContext, arrayMove, useSortable } from '@dnd-kit/sortable'

const CharacterDraggableCard = (props: { character: CharacterWithMapleGgData }) => {
  const { character } = props
  const name = character.mapleGgData?.name ?? character.name
  const className = character.mapleGgData?.class ?? ''
  const level = character.mapleGgData?.level ? `Lvl ${character.mapleGgData.level}` : ''

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: character.id
  })
  const style = {
    transform: DndCss.Translate.toString(transform),
    transition
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div className='h-28 w-96 card card-body bg-base-200 shadow-sm gap-y-1 p-2 grid grid-cols-2'>
        <div className='h-24 w-48 row-span-5'>
          <CharacterView character={character} showName={false}/>
        </div>
        <div/>
        <div className='text-lg font-bold -mb-2 truncate mr-4'>{name}</div>
        <div className='text-sm mr-4'>{className}</div>
        <div className='text-sm -mt-3 mr-4'>{level}</div>
        <div/>
      </div>
    </div>
  )
}

const CharacterDroppable = (props: { children?: React.ReactNode }) => {
  const { setNodeRef } = useDroppable({ id: 'character-list-droppable' })
  return (
    <div ref={setNodeRef} className="flex flex-col space-y-3 items-center px-4 pt-2 pb-4">
      <div className='w-full text-center font-semibold'>Drag and drop characters to reorder them</div>
      {props.children}
    </div>
  )
}

export const EditCharacterOrderComponent = (props: { characters: CharacterWithMapleGgData[] }) => {
  const { characterApi } = useApi()
  const { user } = useAuth()
  const alert = useAlertCallback()

  const [characters, setCharacters] = React.useState<CharacterWithMapleGgData[]>(props.characters)

  // If the parent gets an update here, we need to update this component
  React.useEffect(() => {
    setCharacters(props.characters)
  }, [props.characters])

  // Helper function to update local state and send state to Database
  const setNewOrder = (val: CharacterWithMapleGgData[]) => {
    setCharacters(val)

    // Send update to firebase
    if (user) {
      characterApi.set(user, {
        characters: val
      }).then(() => {
        alert({
          text: 'Successfully updated character oder',
          alertLevel: 'info'
        })
      }).catch(alert)
    }
  }

  // Event Handler
  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (over && active.id !== over?.id) {
      const activeIndex = characters.findIndex((character) => character.id === active.id)
      const overIndex = characters.findIndex((character) => character.id === over.id)
      const newArray = arrayMove(characters, activeIndex, overIndex)
      setNewOrder(newArray)
    }
  }

  return (
    <DndContext onDragEnd={onDragEnd}>
      <SortableContext items={characters}>
        <CharacterDroppable>
          {characters.map((character) =>
            (<CharacterDraggableCard key={`draggable-card-${character.name}`} character={character}/>))
          }
        </CharacterDroppable>
      </SortableContext>
    </DndContext>
  )
}
