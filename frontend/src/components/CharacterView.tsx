import DefaultCharacter from '../resources/blank-character-square.png'
import { type CachedCharacter } from 'ms-tracker-library'

export const CharacterView = (props: { name: string, cachedCharacter?: CachedCharacter, showName: boolean, characterImage?: string }) => {
  const { cachedCharacter, showName, characterImage } = props

  // 3rd party API's name is the right case whereas character.name is user input
  const name = cachedCharacter?.name ?? props.name

  // if we manually pass an image in, use that image
  // else if the character has an image, use the character's image
  // else use the default character sprite
  const image = characterImage ?? cachedCharacter?.characterImageURL ?? DefaultCharacter

  return (<div className="flex flex-col max-w-md h-full object-contain overflow-clip">
    <img className="object-contain min-w-full min-h-fit max-h-full" src={image} alt="Album"/>
    { showName && <div className="w-full text-center text-lg font-semibold truncate">{name}</div> }
  </div>)
}
