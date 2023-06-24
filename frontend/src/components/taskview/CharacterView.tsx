import React from 'react'
import { type Character } from '../../models/character'
import DefaultCharacter from '../../resources/blank-character.png'

export const CharacterView = (props: { character: Character }) => {
  const { character } = props
  const name = character.name
  const image = character.image ?? DefaultCharacter

  return (<div className="join join-vertical w-32">
        <img className="object-contain w-32 h-32" src={image} alt="Album"/>
        <h2 className="w-32 text-center text-lg font-semibold truncate">{name}</h2>
    </div>)
}
