import React from 'react'
import { useDialogContext } from '../../contexts/DialogContext'
import { useAuth } from '../../contexts/AuthContext'
import { useAlertCallback } from '../../contexts/AlertContext'
import { type CharacterWithMapleGgData } from 'ms-tracker-library'
import { useApi } from '../../contexts/ApiContext'
import { type Alert } from '../AlertList'
import { CharacterView } from '../CharacterView'

export const DeleteCharacterComponent = (props: { character: CharacterWithMapleGgData }) => {
  const { character } = props

  const { user } = useAuth()
  const alert = useAlertCallback()
  const { closeDialog } = useDialogContext()
  const { taskStatusApi, characterApi } = useApi()

  const name = character.mapleGgData?.name ?? character.name

  const deleteConfirmed = () => {
    if (!user) {
      alert('Could not find user')
      return
    }

    Promise.all([
      characterApi.deleteCharacter(user, character),
      taskStatusApi.deleteTasksByCharacter(user, character)
    ]).then(() => {
      const msg: Alert = {
        text: `${name} was deleted`,
        alertLevel: 'info'
      }
      alert(msg)
      closeDialog()
    }).catch((err) => {
      alert(err)
      closeDialog()
    })
  }

  return (
    <div className="flex flex-col items-center">
      <div className="text-xl font-bold text-center mb-8">Are you sure?</div>
      <CharacterView character={character} showName={false}/>
      <div className="text-md text-center mx-20 mt-8 mb-4">Do you really want to delete {name} and all of the characters tasks?</div>
      <div className="flex flex-row items-center py-3">
        <button className="btn btn-sm btn-outline mx-2 w-16" onClick={closeDialog}>Cancel</button>
        <button className="btn btn-sm btn-error mx-2 w-16" onClick={deleteConfirmed}>Delete</button>
      </div>
    </div>
  )
}
