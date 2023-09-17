import { useNavigate } from 'react-router-dom'

export const NoTaskRenavigateFullPageSpread = () => {
  const navigate = useNavigate()

  return (
    <div className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 ">
      <p className="text-lg text-center">Head to the <a className="link font-semibold" onClick={() => { navigate('signin') }}>Characters Page</a> to add some tasks</p>
    </div>
  )
}
