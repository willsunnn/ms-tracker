import { AboutSegment } from './AboutSegment'
import { GetStartedSegment } from './GetStartedSegment'
import { PagePreview } from './PagePreviewSegment'
import { SecuritySegment } from './SecuritySegment'
import { SettingsPreviewSegment } from './SettingsPreviewSegment'
import { GithubSegment } from './GithubSegment'
import { AnimateOnceInViewport } from '../helper/AnimateOnceInViewport'

export const AboutPage = () => {
  return (<div className="flex flex-col w-full h-fit min-h-full py-20">
    <AnimateOnceInViewport animateIn='fadeInUp' className='my-32'>
      <AboutSegment/>
    </AnimateOnceInViewport>
    <AnimateOnceInViewport animateIn='fadeInUp' className='my-32'>
      <PagePreview/>
    </AnimateOnceInViewport>
    <AnimateOnceInViewport animateIn='fadeInUp' className='my-32'>
      <SecuritySegment/>
    </AnimateOnceInViewport>
    <AnimateOnceInViewport animateIn='fadeInUp' className='my-32'>
      <SettingsPreviewSegment/>
    </AnimateOnceInViewport>
    <AnimateOnceInViewport animateIn='fadeInUp' className='my-32'>
      <GetStartedSegment/>
    </AnimateOnceInViewport>
    <AnimateOnceInViewport animateIn='fadeInUp' className='my-32'>
      <GithubSegment/>
    </AnimateOnceInViewport>
  </div>)
}
