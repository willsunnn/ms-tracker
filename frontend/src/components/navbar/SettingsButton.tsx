import React from 'react'
import { MdSettings } from 'react-icons/md'
import { useTheme } from '../../contexts/ThemeContext'
import { useAlertCallback } from '../../contexts/AlertContext'
import { useDialogContext } from '../../contexts/DialogContext'

export const SettingsComponent = () => {
  const { theme, setTheme } = useTheme()
  const addAlertCallback = useAlertCallback()

  const onSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target
    if (value === 'light' || value === 'dark') {
      setTheme(value)
    } else {
      addAlertCallback({
        text: `Theme ${value} is not supported`,
        alertLevel: 'error'
      })
    }
  }

  return (
        <>
            <h2 className="text-lg font-semibold">Theme: </h2>
            <select className="select select-accent mt-2" onChange={onSelectChange} defaultValue={theme}>
                <option value="dark">Dark mode</option>
                <option value="light">Light mode</option>
            </select>
        </>
  )
}

export const SettingsButton = () => {
  const { openDialog } = useDialogContext()
  const onClick = () => {
    openDialog((<SettingsComponent/>))
  }
  return (
        <button className="btn btn-circle text-xl bg-base-300" onClick={onClick}>
            <MdSettings className="w-max"/>
        </button>
  )
}
