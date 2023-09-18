import { AboutSegment } from "./AboutSegment"

const PagePreview = () => {
  return (<div className="flex w-full h-fit items-center justify-center">
    <div className="w-1/3 h-96 text-center">
      You can view your tasks by character, by due date, or in a compact spreadsheet-like form
    </div>
  </div>)
}

const SecurityDescription = () => {
  return (<div className="flex w-full h-fit items-center justify-center">
    <div className="w-1/3 h-96 text-center">
      All your data is securely stored in Google Firebase. Passwords are not handled locally
    </div>
  </div>)
}

const LightDarkModeDemo = () => {
  return (<div className="flex w-full h-fit items-center justify-center">
    <div className="w-1/3 h-96 text-center">
      The App has a light and dark mode too, with more themes coming
    </div>
  </div>)
}

const GetStarted = () => {
  return (<div className="flex w-full h-fit items-center justify-center">
    <div className="w-1/3 h-96 text-center">
      Get Started!
    </div>
  </div>)
}

export const AboutPage = () => {
  return (<div className="w-full h-fit min-h-full">
    <AboutSegment/>
    <PagePreview/>
    <SecurityDescription/>
    <LightDarkModeDemo/>
    <GetStarted/>
  </div>)
}
