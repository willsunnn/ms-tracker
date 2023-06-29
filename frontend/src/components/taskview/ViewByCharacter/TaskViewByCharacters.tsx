import React from 'react'
import { AddCharacterButton } from '../../dialog/AddCharacterDialog'
import { type TaskViewProps } from '../TaskViewPage'
import { EditPrioritizedTasksComponent } from '../../dialog/EditPrioritizedTasksDialog'
import { type TaskAndStatus, type CharacterWithMapleGgData, emptyTaskStatusForCharacter, Model } from 'ms-tracker-library'
import { useDialogContext } from '../../../contexts/DialogContext'
import { DeleteCharacterComponent } from '../../dialog/DeleteCharacterDialog'
import { DragDropContext, Draggable, type DropResult } from 'react-beautiful-dnd'
import { StrictModeDroppable } from '../../helper/StrictModeDroppable'
import { TaskViewSingleCharacter } from './TaskViewSingleCharacter'
import { useApi } from '../../../contexts/ApiContext'
import { useAlertCallback } from '../../../contexts/AlertContext'

export const TaskViewByCharacter = (props: { taskViewAttrs: TaskViewProps }) => {
  const { user, tasks, taskStatus } = props.taskViewAttrs
  const { openDialog } = useDialogContext()
  const { characterApi } = useApi()
  const alert = useAlertCallback()

  React.useEffect(() => {
    setCharacters(props.taskViewAttrs.characters)
  }, [props])

  const [characters, setCharacters] = React.useState<CharacterWithMapleGgData[]>(props.taskViewAttrs.characters)

  const openEditTasksDialog = (character: CharacterWithMapleGgData, tasks: TaskAndStatus[]) => {
    openDialog((<EditPrioritizedTasksComponent character={character} tasks={tasks}/>))
  }

  const openDeleteCharacterDialog = (charcter: CharacterWithMapleGgData, tasks: TaskAndStatus[]) => {
    openDialog((<DeleteCharacterComponent character={charcter}/>))
  }

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
    setCharacters(finalOrder)
    characterApi.set(user, {
      characters: finalOrder
    }).then(() => {
      alert({
        text: 'Successfully updated character oder',
        alertLevel: 'info'
      })
    }).catch(alert)
  }

  return (<>
    <DragDropContext onDragEnd={onDragEnd}>
      <StrictModeDroppable droppableId={'character-list'}>
        {provided => (
          <div ref={provided.innerRef} {...provided.droppableProps} className="flex flex-col items-center w-full">
            <div className="flex flex-col">
              {characters.map((character: CharacterWithMapleGgData, index: number) => {
              // For each character we return a card that is draggable
              // that contains the TaskViewSingleCharacter
                const taskStatusForCharacter = taskStatus.get(character.id) ?? emptyTaskStatusForCharacter()
                const tasksAndStatuses = Model.joinTasksAndStatuses(user, character, tasks, taskStatusForCharacter)
                return (
                  <Draggable draggableId={character.id} index={index} key={`TaskViewSingleCharacter-${character.name}`}>
                    {provided => (
                      <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="max-w-full">
                        <TaskViewSingleCharacter
                          tasks={tasksAndStatuses} character={character}
                          openEditTasksDialog={openEditTasksDialog}
                          openDeleteCharacterDialog={openDeleteCharacterDialog}/>
                      </div>
                    )}
                  </Draggable>
                )
              })}
            </div>
            { provided.placeholder }
          </div>
        )}
      </StrictModeDroppable>
    </DragDropContext>
    <AddCharacterButton/>
  </>)
}
