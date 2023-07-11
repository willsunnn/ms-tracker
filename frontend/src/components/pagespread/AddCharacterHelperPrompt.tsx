import { FaArrowRight } from "react-icons/fa6"

export const AddCharacterHelperPrompt = () => {
  return (
    <div className="fixed bottom-8 right-20 flex flex-row items-center space-x-2">
      <div className="text-lg font-semibold">You can add another character from here</div>
      <FaArrowRight size={16}/>
    </div>
  )
}
