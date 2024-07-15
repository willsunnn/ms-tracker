import { FaGithub } from "react-icons/fa"
import { ExternalLinkWrapper } from "../helper/ExternalLinkWrapper"

export const GithubSegment = () => {
  return (<div className="flex flex-col w-full h-fit items-center justify-center">
    <div className="w-1/3 h-fit text-center mb-4">
      Want to see how it works or help out in development? <br/> Check out the code on GitHub!
    </div>
    <ExternalLinkWrapper link={"https://github.com/willsunnn/ms-tracker"}>
      <FaGithub size={52}/>
    </ExternalLinkWrapper>
  </div>)
}
