import React from 'react'
import { useDialogContext } from '../../contexts/DialogContext'
import { useAuth } from '../../contexts/AuthContext'
import { useAlertCallback } from '../../contexts/AlertContext'
import { type CharacterWithMapleGgData } from 'ms-tracker-library'
import { useApi } from '../../contexts/ApiContext'
import { type Alert } from '../AlertList'

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
    <>
      <div className="text-lg font-bold text-center">Are you sure you want to delete {name}?</div>
      <div className="flex justify-center py-3">
        <button className="btn btn-md btn-success mx-1" onClick={closeDialog}>Cancel</button>
        <button className="btn btn-md btn-error mx-1" onClick={deleteConfirmed}>Delete</button>
      </div>
    </>
  )
}

export const DeleteCharacterButton = (props: { character: CharacterWithMapleGgData }) => {
  const { character } = props
  const { openDialog } = useDialogContext()
  const onClick = () => {
    openDialog((<DeleteCharacterComponent character={character}/>))
  }
  return (
    <button className="btn btn-primary" onClick={onClick}>
      Delete Character
    </button>
  )
}
