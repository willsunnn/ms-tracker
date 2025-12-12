import React from 'react'
import { useDialogContext } from '../../contexts/DialogContext'
import { useAuth } from '../../contexts/AuthContext'
import { useAlertCallback } from '../../contexts/AlertContext'
import { useApi } from '../../contexts/ApiContext'
import { v4 as uuidv4 } from 'uuid'
import { CharacterView } from '../CharacterView'
import { type Region, type CachedCharacter } from 'ms-tracker-library'

const TIME_AFTER_TYPING_END_BEFORE_CHECKING_IMAGE = 300

export const AddCharacterComponent = () => {
  const name = React.useRef<string>('')
  const [nameEntryError, setNameEntryError] = React.useState<string | null>(null)
  const [character, setCharacter] = React.useState<CachedCharacter | undefined>(undefined)
  const [region, setRegion] = React.useState<Region>('na')
  const lastTypedTime = React.useRef<number>(0)
  const [isLoading, setLoading] = React.useState(false)

  const { user } = useAuth()
  const alert = useAlertCallback()
  const { characterApi, additionalCharacterInfoFirebaseApi } = useApi()
  const { closeDialog } = useDialogContext()

  // We want to fetch the image when the user updates the name input
  // When the user types, we store the last time the textbox change time was
  // Then we wait for TIME_AFTER_TYPING_END_BEFORE_CHECKING_IMAGE milliseconds
  // If the text has changed since then, there's another callback and so we
  // postpone the API request
  // This is so that typing a charactername does not initiate a API request
  // for each character press
  // If the text has not changed for TIME_AFTER_TYPING_END_BEFORE_CHECKING_IMAGE ms
  // then we make the firebase cloud function request to get the Character
  // Image information
  const onChange = (newValue: string, region: Region) => {
    name.current = newValue
    setRegion(region)
    lastTypedTime.current = new Date().getTime()

    if (name.current.trim().length === 0) {
      setCharacter(undefined)
      return
    }
    setNameEntryError(null)

    setTimeout(() => {
      const now = new Date()
      if (now.getTime() - lastTypedTime.current < TIME_AFTER_TYPING_END_BEFORE_CHECKING_IMAGE) {
        return
      }
      if (name.current.trim().length === 0) {
        return
      }
      // At this point, the user has stopped typing and the input is valid
      // so lets make the request and update the image view
      setLoading(true)
      additionalCharacterInfoFirebaseApi.get(name.current, region).then((data) => {
        if (name.current.trim().toLowerCase() === data.loweredName) {
          setLoading(false)
          setCharacter(data)
        }
      }).catch(alert)
    }, TIME_AFTER_TYPING_END_BEFORE_CHECKING_IMAGE)
  }

  const handleInputKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      submit()
    } else if (event.key === 'Escape') {
      closeDialog()
    }
  }

  const onRegionSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target
    if (value === 'na' || value === 'eu') {
      onChange(name.current, value)
    } else {
      alert(`Region ${value} is not supported`)
    }
  }

  const submit = () => {
    const text = name.current.trim()
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
      id: uuidv4(),
      region
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
    <div className='flex flex-col items-center w-full h-full space-y-3 pt-3'>
      <div className='flex flex-row space-x-2'>
        <div className="items-center flex-grow">
          <input type="text" placeholder="Character Name" className={`input input-bordered w-full ${nameEntryError ? ' input-error' : ''}`}
            onChange={(event) => {
              onChange(event.target.value, region)
            }}
            onKeyDown={handleInputKeyDown}/>
          <label className="label">
            <span className="text-xs text-error">{nameEntryError ?? ''}</span>
          </label>
        </div>
        <select className="select select-accent" onChange={onRegionSelectChange} defaultValue={'gms'}>
          <option value="na">NA</option>
          <option value="eu">EU</option>
        </select>
      </div>

      <div className='flex flex-col min-w-[10rem] min-h-[10rem] max-w-[16rem] max-h-[16rem] h-32 w-32 items-center'>
        { isLoading && <div className='flex flex-row items-center h-full'><span className="loading loading-spinner loading-lg place-self-center"></span></div> }
        { !isLoading && <div className='w-full h-full'><CharacterView name={name.current} cachedCharacter={character} showName={false}/></div> }
      </div>

      <div className={`text-xs text-info w-2/3 ${isLoading ? '' : 'invisible'}`}>{'Fetching images for the first time can be slow as we have to search player rankings for your character'}</div>

      <div className="flex items-center w-full pb-5 pt-3 px-3">
        <span className="btn btn-primary btn-sm ml-auto" onClick={submit}>Next</span>
      </div>
    </div>
  )
}
