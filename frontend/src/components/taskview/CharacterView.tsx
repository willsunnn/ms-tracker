import React from 'react'
import DefaultCharacter from '../../resources/blank-character.png'
import { type CharacterWithMapleGgData } from 'ms-tracker-library'

export const CharacterView = (props: { character: CharacterWithMapleGgData }) => {
  const { character } = props
  // mapleGgs name is then right case whereas character.name is user input
  const name = character.mapleGgData?.name ?? character.name
  const image = character.mapleGgData?.image ?? DefaultCharacter

  return (<div className="join join-vertical w-32">
    <img className="object-contain w-32 h-32" src={image} alt="Album"/>
    <h2 className="w-32 text-center text-lg font-semibold truncate">{name}</h2>
  </div>)
}
