import React, { useContext, useState, type ReactNode, useEffect } from 'react'
import Cookies from 'js-cookie'
import { type DateFormat } from 'ms-tracker-library/lib'

type Theme = 'light' | 'dark'

interface Settings {
  theme: Theme
  dateFormat: DateFormat
  setTheme: (_: Theme) => void
  setDateFormat: (_: DateFormat) => void
}

interface CookieValue {
  theme?: Theme
  dateFormat?: DateFormat
}

const SettingsContext = React.createContext<Settings>({
  theme: 'light',
  dateFormat: 'absolute',
  setTheme: () => {},
  setDateFormat: () => {}
})

const SettingsCookieKey = 'settings'

export const useSettings = () => {
  return useContext(SettingsContext)
}

export const SettingsContextProvider = (props: { children: ReactNode }) => {
  // Get information from the cookie
  const rawCookieValue = Cookies.get(SettingsCookieKey) ?? '{}'
  let parsedCookieValue: CookieValue = {}
  try {
    parsedCookieValue = JSON.parse(rawCookieValue) as CookieValue
  } catch (err) {
    console.log(err)
  }

  // Set initial values
  const [theme, setTheme] = useState<Theme>(parsedCookieValue.theme ?? 'light')
  const [dateFormat, setDateFormat] = useState<DateFormat>(parsedCookieValue.dateFormat ?? 'absolute')

  const updateCookie = () => {
    const cookieValue: CookieValue = {
      theme,
      dateFormat
    }
    Cookies.set(SettingsCookieKey, JSON.stringify(cookieValue), { sameSite: 'strict' })
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    updateCookie()
  }, [theme])

  useEffect(() => {
    updateCookie()
  }, [dateFormat])

  const value: Settings = {
    theme,
    dateFormat,
    setTheme,
    setDateFormat
  }

  return (
    <SettingsContext.Provider value={value}>
      {props.children}
    </SettingsContext.Provider>
  )
}
