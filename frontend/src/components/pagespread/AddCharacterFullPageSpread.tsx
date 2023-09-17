import { AddCharacterComponent } from '../dialog/AddCharacterDialog'

export const AddCharacterFullPageSpread = () => {
  return (
    <>
      <div className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 card shadow-md p-4 bg-base-200">
        <div className="text-lg font-semibold w-full text-center">Add a Character:</div>
        <AddCharacterComponent />
      </div>
    </>
  )
}
