import { useNavigate } from 'react-router-dom'
import BugcatThink from '../../resources/bugcat-think.png'

export const TouchGrassFullPageSpread = () => {
  const navigate = useNavigate()

  return (
    <div className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex-col items-center">
      <img className="object-contain h-20 w-full mb-4" src={BugcatThink} alt="Album"/>
      <p className="text-lg text-center">You have no pending tasks...</p>
      <p className="text-md text-center">Head to the <a className="link font-semibold" onClick={() => { navigate('/characters') }}>Characters Page</a> to add some tasks</p>
      <p className="text-sm text-center">or go touch some grass</p>
    </div>
  )
}
