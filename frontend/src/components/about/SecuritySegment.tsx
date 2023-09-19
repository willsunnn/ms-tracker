import { useSettings } from '../../contexts/SettingsContext'
import FirebaseLogoLight from '../../resources/about/Built_with_Firebase_Logo_Light.svg'
import FirebaseLogoDark from '../../resources/about/Built_with_Firebase_Logo_Dark.svg'
import React from 'react'
import { ExternalLinkWrapper } from '../helper/ExternalLinkWrapper'

const FirebaseLink = (props: { children: React.ReactNode }) => {
  const link = 'https://firebase.google.com/'
  return (<ExternalLinkWrapper link={link}>
    {props.children}
  </ExternalLinkWrapper>)
}

export const SecuritySegment = () => {
  const { theme } = useSettings()
  const logo = (theme === 'light') ? FirebaseLogoLight : FirebaseLogoDark

  return (<div className="flex flex-col w-full h-fit items-center justify-center">
    <div className="w-1/3 h-fit text-center mb-2 text-lg">
      All your data, including login and passwords, is securely stored in <FirebaseLink>Google Firebase</FirebaseLink>, not by the application
    </div>
    <div className="w-1/4 h-fit text-center mt-2 max-w-md min-w-[200px]">
      <FirebaseLink>
        <img src={logo}/>
      </FirebaseLink>
    </div>
  </div>)
}
