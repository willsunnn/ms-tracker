import React from 'react'
import { useDialogContext } from '../../contexts/DialogContext'
import { useAuth } from '../../contexts/AuthContext'
import { useAlertCallback } from '../../contexts/AlertContext'
import { Model, type CharacterWithMapleGgData, type TaskAndStatus, type GroupedTasksAndStatuses } from 'ms-tracker-library'
import { useApi } from '../../contexts/ApiContext'

const TaskEntryComponent = (props: { character: CharacterWithMapleGgData, task: TaskAndStatus }) => {
  const { user } = useAuth()
  const alert = useAlertCallback()
  const { closeDialog } = useDialogContext()
  const { taskStatusApi } = useApi()

  const { character, task } = props
  const characterName = character.mapleGgData?.name ?? character.name

  const [isPriority, setIsPriority] = React.useState<boolean>(task.isPriority)

  const toggleTaskPriority = () => {
    if (user == null) {
      alert('Failed to update tasks: user was undefined')
      return
    }

    taskStatusApi.updatePriority(user, character, task.taskId, !isPriority)
      .then(() => {
        task.isPriority = !isPriority
        setIsPriority(!isPriority)
        const message = `${task.isPriority ? 'Prioritized' : 'Deprioritized'} ${task.name} for ${characterName}`
        alert({
          text: message,
          alertLevel: 'info'
        })
      })
      .catch((err) => {
        alert(err)
        closeDialog()
      })
  }

  return (
    <div className="flex my-1">
      <input type="checkbox" className="checkbox mx-1" checked={isPriority} onClick={toggleTaskPriority}/>
      <div className="font-bold">
        { task.name }
      </div>
    </div>
  )
}

type GroupChecked = 'none' | 'some' | 'all'

const TaskGroupEntryComponent = (props: { character: CharacterWithMapleGgData, taskGroup: GroupedTasksAndStatuses }) => {
  const { character, taskGroup } = props
  const groupName = taskGroup.name
  const { tasks } = taskGroup
  const numChecked = tasks.filter(t => t.isPriority).length
  const groupChecked: GroupChecked = numChecked === 0 ? 'none' : numChecked === tasks.length ? 'all' : 'some'
  const { taskStatusApi } = useApi()
  const { user } = useAuth()
  const characterName = character.mapleGgData?.name ?? character.name
  const groupCheckboxRef = React.createRef<HTMLInputElement>()
  const alert = useAlertCallback()

  React.useEffect(() => {
    if (groupCheckboxRef.current) {
      groupCheckboxRef.current.indeterminate = (groupChecked) === 'some'
      groupCheckboxRef.current.checked = (groupChecked) === 'all'
    }
  }, [groupChecked])

  const onClick = () => {
    if (!user) {
      console.log(`cannot perform onClick as user is null`)
      return
    }
    // if its currently none, or some, we prioritize them all
    // if its currently all, we deprioritize them all
    const nextIsPriority = groupChecked !== 'all'
    const statuses = new Map()
    tasks.forEach(task => statuses.set(task.taskId, nextIsPriority))
    taskStatusApi.updatePriorities(user, character, statuses)
      .then(() => {
        const message = `${nextIsPriority ? 'Prioritized' : 'Deprioritized'} all ${groupName} tasks for ${characterName}`
        alert({
          text: message,
          alertLevel: 'info'
        })
      })
      .catch(alert)
  }

  return (
    <div className="py-3">
      <div className="flex">
        <input type="checkbox" className="checkbox mx-1" ref={groupCheckboxRef} onClick={onClick}/>
        <div className="text-lg font-bold">{groupName}</div>
      </div>
      <div className="pl-8 overflow-y-scroll">
        {
          tasks.map((task) => {
            return (<TaskEntryComponent task={task} character={character} key={`task-entry-component-${task.taskId}`}/>)
          })
        }
      </div>
    </div>
  )
}

export const EditPrioritizedTasksComponent = (props: { character: CharacterWithMapleGgData, tasks: GroupedTasksAndStatuses[] }) => {
  const { character, tasks } = props
  const characterName = character.mapleGgData?.name ?? character.name

  return (
    <div className="w-full h-full">
      <div className="text-lg font-bold pb-3 text-center">Editing tasks for {characterName}</div>
      {
        tasks.map((taskGroup) => {
          return (<TaskGroupEntryComponent character={character} taskGroup={taskGroup} key={`EditPrioritizedTasksForGroup-${characterName}-${taskGroup.name}`}/>)
        })
      }
    </div>
  )
}
