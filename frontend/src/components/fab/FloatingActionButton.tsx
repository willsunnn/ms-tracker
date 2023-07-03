import React from 'react'
import { BsChevronUp } from 'react-icons/bs'
import { AddCharacterButton } from '../dialog/AddCharacterDialog'
import { useFabContext } from '../../contexts/FabContext'
import { EditCharacterOrderButton } from '../dialog/EditCharacterOrderDialog'

export const FloatingActionButton = () => {
  const [isOpen, setIsOpen] = React.useState(false)
  const { characters } = useFabContext()

  const toggleOpen = () => {
    setIsOpen(!isOpen)
  }

  const close = () => {
    setIsOpen(false)
  }

  return (
    <div className='flex flex-col items-end space-y-2'>
      { isOpen && characters && <AddCharacterButton additionalOnClick={close}/> }
      { isOpen && characters && characters.length > 1 && <EditCharacterOrderButton characters={characters} additionalOnClick={close}/> }
      <button className={`btn btn-circle btn-neutral ${isOpen ? '-rotate-180' : ''}`} onClick={toggleOpen}>
        <BsChevronUp size={18}/>
      </button>
    </div>
  )
}
