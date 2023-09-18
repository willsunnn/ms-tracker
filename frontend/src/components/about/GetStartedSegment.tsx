import { useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"

export const GetStartedSegment = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const onClick = () => {
    if (!user) {
      navigate("signin")
    } else {
      navigate("characters")
    }
  }
  return (<div className="flex flex-col w-full h-fit items-center justify-center pt-60 pb-40">
    <div className="h-fit text-center text-2xl btn-primary btn py-8 px-12" onClick={onClick}>
      Get Started!
    </div>
  </div>)
}
