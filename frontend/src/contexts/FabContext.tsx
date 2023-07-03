import { type CharacterWithMapleGgData } from 'ms-tracker-library'
import React from 'react'

interface FabContextType {
  characters: CharacterWithMapleGgData[] | undefined
  updateFab: (characters: CharacterWithMapleGgData[] | undefined) => void
}

const FabContext = React.createContext<FabContextType>({
  characters: undefined,
  updateFab: () => { console.log('No FabContext: cannot set characters') }
})

export const useFabContext = () => {
  return React.useContext(FabContext)
}

export const FabContextProvider = (props: { children: React.ReactNode }) => {
  const [characters, setCharacters] = React.useState<CharacterWithMapleGgData[]>()

  const value = {
    characters,
    updateFab: setCharacters
  }

  return (
    <FabContext.Provider value={value}>
      {props.children}
    </FabContext.Provider>
  )
}
