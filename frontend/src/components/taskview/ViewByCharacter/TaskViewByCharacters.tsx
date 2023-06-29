import { AddCharacterButton } from '../../dialog/AddCharacterDialog'
import { type TaskViewProps } from '../TaskViewPage'
import { EditPrioritizedTasksComponent } from '../../dialog/EditPrioritizedTasksDialog'
import { type TaskAndStatus, type CharacterWithMapleGgData, emptyTaskStatusForCharacter, Model } from 'ms-tracker-library'
import { useDialogContext } from '../../../contexts/DialogContext'
import { DeleteCharacterComponent } from '../../dialog/DeleteCharacterDialog'
import { DragDropContext, Draggable, type DropResult } from 'react-beautiful-dnd'
import { StrictModeDroppable } from '../../helper/StrictModeDroppable'
import { TaskViewSingleCharacter } from './TaskViewSingleCharacter'

export const TaskViewByCharacter = (props: { taskViewAttrs: TaskViewProps }) => {
  const { user, tasks, taskStatus, characters } = props.taskViewAttrs
  const { openDialog } = useDialogContext()

  const openEditTasksDialog = (character: CharacterWithMapleGgData, tasks: TaskAndStatus[]) => {
    openDialog((<EditPrioritizedTasksComponent character={character} tasks={tasks}/>))
  }
  const openDeleteCharacterDialog = (charcter: CharacterWithMapleGgData, tasks: TaskAndStatus[]) => {
    openDialog((<DeleteCharacterComponent character={charcter}/>))
  }

  const onDragEnd = (result: DropResult) => {
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
