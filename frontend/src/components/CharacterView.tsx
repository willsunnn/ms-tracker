import DefaultCharacter from '../resources/blank-character-square.png'
import { type CharacterWithMapleGgData } from 'ms-tracker-library'

export const CharacterView = (props: { character: CharacterWithMapleGgData, showName: boolean }) => {
  const { character, showName } = props
  // mapleGgs name is then right case whereas character.name is user input
  const name = character.mapleGgData?.name ?? character.name
  const image = character.mapleGgData?.image ?? DefaultCharacter

  return (<div className="flex flex-col max-w-md h-full object-contain overflow-clip">
    <img className="object-contain min-w-full min-h-fit max-h-full" src={image} alt="Album"/>
    { showName && <div className="w-full text-center text-lg font-semibold truncate">{name}</div> }
  </div>)
}
