import { AboutSegment } from './AboutSegment'
import { PagePreview } from './PagePreviewSegment'

const SecurityDescription = () => {
  return (<div className="flex flex-col w-full h-fit items-center justify-center py-20">
    <div className="w-1/3 h-96 text-center">
      All your data is securely stored in Google Firebase. Passwords are not handled by me, though I would properly salt and encrypt them if i did
    </div>
  </div>)
}

const LightDarkModeDemo = () => {
  return (<div className="flex flex-col w-full h-fit items-center justify-center py-20">
    <div className="w-1/3 h-96 text-center">
      The App has a light and dark mode too, with more themes coming
    </div>
  </div>)
}

const GetStarted = () => {
  return (<div className="flex flex-col w-full h-fit items-center justify-center py-20">
    <div className="w-1/3 h-96 text-center">
      Get Started!
    </div>
  </div>)
}

export const AboutPage = () => {
  return (<div className="w-full h-fit min-h-full py-20">
    <AboutSegment/>
    <PagePreview/>
    <SecurityDescription/>
    <LightDarkModeDemo/>
    <GetStarted/>
  </div>)
}
