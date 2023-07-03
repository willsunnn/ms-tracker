import React from 'react'
import { BsChevronUp } from 'react-icons/bs'
import { AddCharacterButton } from '../dialog/AddCharacterDialog'

export const FloatingActionButton = () => {
  const [isOpen, setIsOpen] = React.useState(false)
  const toggleOpen = () => {
    setIsOpen(!isOpen)
  }
  return (
    <div className='flex flex-col items-end space-y-2'>
      {
        isOpen && (<>
          <AddCharacterButton/>
        </>)
      }
      <button className={`btn btn-circle btn-neutral ${isOpen ? '-rotate-180' : ''}`} onClick={toggleOpen}>
        <BsChevronUp size={18}/>
      </button>
    </div>
  )
}
