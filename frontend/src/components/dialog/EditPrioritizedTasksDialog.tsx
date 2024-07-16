import React from 'react'
import { useDialogContext } from '../../contexts/DialogContext'
import { useAuth } from '../../contexts/AuthContext'
import { useAlertCallback } from '../../contexts/AlertContext'
import type { CharacterWithCachedData, TaskAndStatus, GroupedTasksAndStatuses } from 'ms-tracker-library'
import { useApi } from '../../contexts/ApiContext'

const TaskEntryComponent = (props: { character: CharacterWithCachedData, task: TaskAndStatus }) => {
  const { user } = useAuth()
  const alert = useAlertCallback()
  const { closeDialog } = useDialogContext()
  const { taskStatusApi } = useApi()

  const { character, task } = props
  const characterName = character.cachedData?.name ?? character.name

  const toggleTaskPriority = () => {
    if (user == null) {
      alert('Failed to update tasks: user was undefined')
      return
    }

    taskStatusApi.updatePriority(user, character, task.taskId, !task.isPriority)
      .then(() => {
        task.isPriority = !task.isPriority
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
      <input type="checkbox" className="checkbox mx-1" checked={task.isPriority} onClick={toggleTaskPriority}/>
      <div className="font-bold">
        { task.name }
      </div>
    </div>
  )
}

type GroupChecked = 'none' | 'some' | 'all'

const TaskGroupEntryComponent = (props: { character: CharacterWithCachedData, taskGroup: GroupedTasksAndStatuses }) => {
  const { taskStatusApi } = useApi()
  const { user } = useAuth()
  const alert = useAlertCallback()

  const { character } = props
  const characterName = character.cachedData?.name ?? character.name

  const { taskGroup } = props
  const groupName = taskGroup.name
  const { tasks } = taskGroup
  const numChecked = tasks.filter(t => t.isPriority).length
  const groupChecked: GroupChecked = numChecked === 0 ? 'none' : numChecked === tasks.length ? 'all' : 'some'
  const groupCheckboxRef = React.createRef<HTMLInputElement>()

  const updateGroupCheckbox = () => {
    if (groupCheckboxRef.current) {
      groupCheckboxRef.current.indeterminate = (groupChecked) === 'some'
      groupCheckboxRef.current.checked = (groupChecked) === 'all'
    } else {
      alert('TaskGroupEntryComponent cannot update checkbox state as ref is null')
    }
  }

  React.useEffect(updateGroupCheckbox, [groupChecked])

  const onClick = () => {
    // the click event will change the state, but we don't want it to show the state
    // change until after we recieved a response from firebase
    // so we revert it to its unchanged state with this function
    updateGroupCheckbox()
    if (!user) {
      alert('TaskGroupEntryComponent cannot perform onClick as user is null')
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
        tasks.forEach((t) => {
          t.isPriority = nextIsPriority
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

export const EditPrioritizedTasksComponent = (props: { character: CharacterWithCachedData, tasks: GroupedTasksAndStatuses[] }) => {
  const { character, tasks } = props
  const characterName = character.cachedData?.name ?? character.name

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
