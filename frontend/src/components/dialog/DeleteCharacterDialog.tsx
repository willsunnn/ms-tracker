import React from 'react'
import { useDialogContext } from '../../contexts/DialogContext'
import { useAuth } from '../../contexts/AuthContext'
import { useAlertCallback } from '../../contexts/AlertContext'
import { Model, type CharacterWithMapleGgData, type TaskAndStatus, Character } from 'ms-tracker-library'
import { useApi } from '../../contexts/ApiContext'

export const DeleteCharacterComponent = (props: { character: CharacterWithMapleGgData }) => {
  const { character } = props

  const { user } = useAuth()
  const alert = useAlertCallback()
  const { closeDialog } = useDialogContext()
  const { taskStatusApi, characterApi } = useApi()

  const deleteConfirmed = () => {
    closeDialog()
  }

  const name = character.mapleGgData?.name ?? character.name
  return (
    <>
      <div className="text-lg font-bold text-center">Are you sure you want to delete {name}?</div>
      <div className="flex justify-center py-3">
        <button className="btn btn-md btn-error mx-1" onClick={deleteConfirmed}>Delete</button>
        <button className="btn btn-md btn-success mx-1" onClick={closeDialog}>Cancel</button>
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
