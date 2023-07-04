import { type CharacterWithMapleGgData } from 'ms-tracker-library'
import React from 'react'

interface FabContextType {
  isOpen: boolean
  openFab: () => void
  closeFab: () => void
  toggleFab: () => void
  characters: CharacterWithMapleGgData[] | undefined
  updateFab: (characters: CharacterWithMapleGgData[] | undefined) => void
}

const FabContext = React.createContext<FabContextType>({
  isOpen: false,
  characters: undefined,
  openFab: () => { console.log('No FabContext: cannot open') },
  closeFab: () => { console.log('No FabContext: cannot close') },
  toggleFab: () => { console.log('No FabContext: cannot toggle') },
  updateFab: () => { console.log('No FabContext: cannot set characters') }
})

export const useFabContext = () => {
  return React.useContext(FabContext)
}

export const FabContextProvider = (props: { children: React.ReactNode }) => {
  const [characters, setCharacters] = React.useState<CharacterWithMapleGgData[]>()
  const [isOpen, setIsOpen] = React.useState(false)

  const value = {
    isOpen,
    openFab: () => { setIsOpen(true) },
    closeFab: () => { setIsOpen(false) },
    toggleFab: () => { setIsOpen(!isOpen) },
    characters,
    updateFab: setCharacters
  }

  return (
    <FabContext.Provider value={value}>
      {props.children}
    </FabContext.Provider>
  )
}
