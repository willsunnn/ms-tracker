import { type GroupedTasksAndStatuses, type Character } from 'ms-tracker-library'
import { FaArrowTurnUp } from 'react-icons/fa6'
import { MdSettings } from 'react-icons/md'
import { useDialogContext } from '../../../contexts/DialogContext'
import { DeleteCharacterComponent } from '../../dialog/DeleteCharacterDialog'
import { EditPrioritizedTasksComponent } from '../../dialog/EditPrioritizedTasksDialog'

interface CharacterContextActionsDropdownProps {
  hasPrioritizedTasks: boolean
  character: Character
  groupedTasks: GroupedTasksAndStatuses[]
  isPreview: boolean
}

export const CharacterContextActionsDropdown = (props: CharacterContextActionsDropdownProps) => {
  const { hasPrioritizedTasks, character, groupedTasks, isPreview } = props
  const { openDialog } = useDialogContext()

  const closeDropdown = () => {
    const elem = document.activeElement
    if (elem && elem instanceof HTMLElement) {
      elem.blur()
    }
  }
  const onEditClicked = () => {
    closeDropdown()
    if (isPreview) {
      return
    }
    openDialog((<EditPrioritizedTasksComponent character={character} tasks={groupedTasks}/>))
  }
  const onDeleteClicked = () => {
    closeDropdown()
    if (isPreview) {
      return
    }
    openDialog((<DeleteCharacterComponent character={character}/>))
  }

  return (
    <div>
      <div className="dropdown dropdown-bottom dropdown-end absolute right-0 top-0">
        <button tabIndex={0}>
          <MdSettings className="w-max button h-6 pointer-events-none"/>
        </button>
        <ul tabIndex={0} className="mt-3 p-2 menu menu-sm disabled dropdown-content rounded-box min-w-36 bg-base-100 z-[50]">
          <li onClick={onEditClicked}><a>{hasPrioritizedTasks ? 'Edit Tasks' : 'Add Tasks'}</a></li>
          <li onClick={onDeleteClicked}><a>Delete Character</a></li>
        </ul>
      </div>
      {/* This renders the hint for the dropdown button */}
      {!hasPrioritizedTasks && (
        <div className="flex flex-row-reverse w-max absolute -right-1 top-8">
          <FaArrowTurnUp className="w-4 h-4"/>
          <div className="font-bold mr-1">
            Add some tasks!
          </div>
        </div>
      )}
    </div>
  )
}
