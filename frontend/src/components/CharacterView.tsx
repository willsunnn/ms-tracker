import DefaultCharacter from '../resources/blank-character-square.png'
import { type MapleGgCachedData } from 'ms-tracker-library'

export const CharacterView = (props: { name: string, mapleGgData?: MapleGgCachedData, showName: boolean }) => {
  const { mapleGgData, showName } = props

  // mapleGgs name is the right case whereas character.name is user input
  const name = mapleGgData?.name ?? props.name
  const image = mapleGgData?.image ?? DefaultCharacter

  return (<div className="flex flex-col max-w-md h-full object-contain overflow-clip">
    <img className="object-contain min-w-full min-h-fit max-h-full" src={image} alt="Album"/>
    { showName && <div className="w-full text-center text-lg font-semibold truncate">{name}</div> }
  </div>)
}
