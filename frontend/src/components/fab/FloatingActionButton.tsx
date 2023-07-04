import { BsChevronUp } from 'react-icons/bs'
import { useFabContext } from '../../contexts/FabContext'
import { EditCharacterOrderButton } from './EditCharacterOrderActionButton'
import { AddCharacterButton } from './AddCharacterActionButton'

export const FloatingActionButton = () => {
  const { isOpen, toggleFab, characters } = useFabContext()

  return (
    <div className='flex flex-col items-end space-y-2'>
      { isOpen && characters && characters.length > 1 && <EditCharacterOrderButton characters={characters}/> }
      { isOpen && characters && <AddCharacterButton/> }
      <button className={`btn btn-circle btn-primary ${isOpen ? '-rotate-180' : ''}`} onClick={toggleFab}>
        <BsChevronUp size={18}/>
      </button>
    </div>
  )
}
