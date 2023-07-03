import React from 'react'
import { useDialogContext } from '../../contexts/DialogContext'
import { useAuth } from '../../contexts/AuthContext'
import { useAlertCallback } from '../../contexts/AlertContext'
import { useApi } from '../../contexts/ApiContext'
import { uuidv4 } from '@firebase/util'

export const AddCharacterComponent = () => {
  const { characterApi } = useApi()

  const [nameEntryText, setNameEntryText] = React.useState<string>('')
  const [nameEntryError, setNameEntryError] = React.useState<string | null>(null)

  const { user } = useAuth()
  const alert = useAlertCallback()
  const { closeDialog } = useDialogContext()

  const submit = () => {
    const text = nameEntryText.trim()
    if (text === '') {
      setNameEntryError('Name must not be blank')
      return
    }
    if (!user) {
      alert('Unknown Error could not find User')
      return
    }
    characterApi.addCharacter(user, {
      name: text,
      id: uuidv4()
    }).then(() => {
      alert({
        alertLevel: 'success',
        text: `${text} successfully added`
      })
    }).catch((err: any) => {
      alert(err)
    })
    closeDialog()
  }

  return (
    <>
      <div className="my-3">
        <input type="text" placeholder="Character Name" className={`input input-bordered w-full ${nameEntryError ? ' input-error' : ''}`}
          value={nameEntryText}
          onChange={(event) => {
            setNameEntryText(event.target.value)
          }}/>
        <label className="label">
          <span></span>
          <span className="text-xs text-error">{nameEntryError ?? ''}</span>
        </label>
      </div>

      <div className="flex items-center w-full max-w-xs pb-5 pt-3 px-3">
        <span className="btn btn-primary btn-sm ml-auto" onClick={submit}>Next</span>
      </div>
    </>
  )
}

export const AddCharacterButton = (props: { additionalOnClick?: () => void }) => {
  const { openDialog } = useDialogContext()
  const { additionalOnClick } = props
  const onClick = () => {
    openDialog((<AddCharacterComponent/>))
    if (additionalOnClick) {
      additionalOnClick()
    }
  }
  return (
    <button className="btn btn-primary" onClick={onClick}>
            Add Character
    </button>
  )
}
