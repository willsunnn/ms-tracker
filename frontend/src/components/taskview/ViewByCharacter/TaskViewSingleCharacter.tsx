import { FaArrowTurnUp } from 'react-icons/fa6'
import { CharacterView } from '../../CharacterView'
import { type Character, type CharacterWithMapleGgData, Model, type TaskAndStatus } from 'ms-tracker-library'
import { MdSettings } from 'react-icons/md'
import { useAlertCallback } from '../../../contexts/AlertContext'
import { useApi } from '../../../contexts/ApiContext'
import React from 'react'

interface TaskViewSingleCharacterProps {
  character: Character
  tasks: TaskAndStatus[]
  openEditTasksDialog: (character: CharacterWithMapleGgData, tasks: TaskAndStatus[]) => (void)
  openDeleteCharacterDialog: (character: CharacterWithMapleGgData, tasks: TaskAndStatus[]) => void
}

export const TaskViewSingleCharacter = (props: TaskViewSingleCharacterProps) => {
  // unpack props
  const { character, tasks, openEditTasksDialog, openDeleteCharacterDialog } = props

  // get contexts
  const alert = useAlertCallback()
  const { taskStatusApi } = useApi()

  // define event handlers
  const onEditClicked = () => { openEditTasksDialog(character, tasks) }
  const onDeleteClicked = () => { openDeleteCharacterDialog(character, tasks) }
  const checkBoxOnClickCurryFunc = (task: TaskAndStatus) => {
    return () => {
      const numClears = task.clearTimes.length
      const isComplete = numClears >= task.maxClearCount
      if (isComplete) {
        task.clearTimes = []
      } else {
        const now = new Date().getTime()
        while (task.clearTimes.length < task.maxClearCount) {
          task.clearTimes.push(now)
        }
      }
      taskStatusApi.set(task).then(() => {}).catch(alert)
    }
  }

  const [open, setOpen] = React.useState(false)
  const handleOpen = () => { setOpen(true) }

  // render data
  const prioritizedTasks = tasks.filter((task) => task.isPriority)
  return (
    <div className="card bg-base-200 shadow-xl my-2 p-3">

      {/* This div contains the dropdown button that has the Edit and Delete Options
          This and the hint div are rendered absolute from the top right */}
      <div className="absolute right-4 top-4">
        <div className="dropdown absolute right-0 top-0">
          <button tabIndex={0}><MdSettings className="w-max button w-6 h-6 pointer-events-none"/>
          </button>
          <ul tabIndex={0} className="mt-3 p-2 menu menu-sm disabled dropdown-content rounded-box min-w-36 bg-base-300 z-[100]">
            <li onClick={(onEditClicked)}><a>Edit Tasks</a></li>
            <li onClick={onDeleteClicked}><a>Delete</a></li>
          </ul>
        </div>
        {/* This renders the hint for the dropdown button */}
        {prioritizedTasks.length === 0 && (
          <div className="flex flex-row-reverse w-max absolute right-1 top-8">
            <FaArrowTurnUp className="w-4 h-4"/>
            <div className="font-bold mr-1">
                Add some tasks!
            </div>
          </div>
        )}
      </div>

      {/* This div contains the content for the card
          This means the CharacterView and the grid of prioritized tasks */}
      <div className="flex flex-row pr-10">
        <CharacterView character={character}/>
        <table className="table w-full"><tbody>
          {
            prioritizedTasks.map((task) => {
              const { name, imageIcon, resetType } = task
              const resetsAt = Model.nextReset(resetType)
              const key = `CharacterTaskViewRow-${character.name}-${task.taskId}}`
              const isComplete = task.clearTimes.length >= task.maxClearCount
              return (<tr key={key}>
                <td>
                  <div className="flex items-center space-x-3">
                    { imageIcon &&
                        (<div className="avatar">
                          <div className="mask mask-squircle w-10 h-10">
                            <img src={imageIcon} alt={name} />
                          </div>
                        </div>)
                    }
                    <div>
                      <div className="font-bold">{name}</div>
                    </div>
                  </div>
                </td>

                <td>
                  {resetsAt.toLocaleString()}
                </td>

                <td>
                  <input type="checkbox" className="checkbox" checked={isComplete} onClick={checkBoxOnClickCurryFunc(task)}/>
                </td>
              </tr>)
            })
          }
        </tbody></table>
      </div>
    </div>
  )
}
