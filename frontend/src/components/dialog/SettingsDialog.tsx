import React from 'react'
import { MdSettings } from 'react-icons/md'
import { useSettings } from '../../contexts/SettingsContext'
import { useAlertCallback } from '../../contexts/AlertContext'
import { useDialogContext } from '../../contexts/DialogContext'
import { Model } from 'ms-tracker-library'

export const SettingsComponent = () => {
  const { theme, setTheme, dateFormat, setDateFormat } = useSettings()
  const alert = useAlertCallback()

  const onThemeSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target
    if (value === 'light' || value === 'dark') {
      setTheme(value)
    } else {
      alert(`Theme ${value} is not supported`)
    }
  }

  const onDateFormatSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target
    if (value === 'absolute' || value === 'relative' || value === 'relative-short') {
      setDateFormat(value)
    } else {
      alert(`Date format ${value} is not supported`)
    }
  }

  const nextReset = Model.nextReset(new Date(), 'Daily')
  const resetText = Model.getReadableTime(nextReset, dateFormat)

  return (
    <>
      <h2 className="text-lg font-semibold">Theme: </h2>
      <select className="select select-accent mt-2" onChange={onThemeSelectChange} defaultValue={theme}>
        <option value="dark">Dark mode</option>
        <option value="light">Light mode</option>
      </select>

      <div className="divider lg:divider"/>

      <h2 className="text-lg font-semibold">Date Format: </h2>
      <select className="select select-accent mt-2" onChange={onDateFormatSelectChange} defaultValue={dateFormat}>
        <option value="absolute">Absolute</option>
        <option value="relative">Relative</option>
        <option value="relative-short">Relative (short)</option>
      </select>
      <h3 className="text-sm mt-2 ml-2">Example: {resetText}</h3>
    </>
  )
}

export const SettingsButton = () => {
  const { openDialog } = useDialogContext()
  const onClick = () => {
    openDialog((<SettingsComponent/>))
  }
  return (
    <button className="btn btn-circle text-xl bg-transparent border-opacity-0" onClick={onClick}>
      <MdSettings className="w-max"/>
    </button>
  )
}
