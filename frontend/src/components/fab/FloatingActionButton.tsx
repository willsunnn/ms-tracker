import { BsChevronUp } from 'react-icons/bs'
import { useFabContext } from '../../contexts/FabContext'
import { EditCharacterOrderButton } from './EditCharacterOrderActionButton'
import { AddCharacterButton } from './AddCharacterActionButton'
import { BugReportActionButton } from './BugReportActionButton'
import { FeatureRequestActionButton } from './FeatureRequestButton'
import { DonateButton } from './DonateButton'

export const FloatingActionButton = () => {
  const { isOpen, toggleFab, characters } = useFabContext()

  // You can only reorder characters if there are multiple
  const showEditCharacters = characters && characters.length > 1

  // At 0 characters, we show the character modal on screen, so we want
  // to hid the addcharacter button
  const showAddCharacter = characters && characters.length > 0

  return (
    <div className='flex flex-col items-end space-y-2'>
      { isOpen && (
        <>
          { showEditCharacters && <EditCharacterOrderButton characters={characters}/> }
          { showAddCharacter && <AddCharacterButton/> }
          <FeatureRequestActionButton/>
          <BugReportActionButton/>
          <DonateButton/>
        </>
      )}
      <button className={`btn btn-circle btn-primary ${isOpen ? '-rotate-180' : ''}`} onClick={toggleFab}>
        <BsChevronUp size={18}/>
      </button>
    </div>
  )
}
