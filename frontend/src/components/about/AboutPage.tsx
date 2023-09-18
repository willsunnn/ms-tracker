import { AboutSegment } from './AboutSegment'
import { GetStartedSegment } from './GetStartedSegment'
import { PagePreview } from './PagePreviewSegment'
import { SecuritySegment } from './SecuritySegment'
import { SettingsPreviewSegment } from './SettingsPreviewSegment'

export const AboutPage = () => {
  return (<div className="w-full h-fit min-h-full py-20">
    <AboutSegment/>
    <PagePreview/>
    <SecuritySegment/>
    <SettingsPreviewSegment/>
    <GetStartedSegment/>
  </div>)
}
