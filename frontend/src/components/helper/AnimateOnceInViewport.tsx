import React from 'react'
import 'animate.css/animate.min.css'

export const AnimateOnceInViewport = (props: { children: React.ReactNode, animateIn: string, className?: string }) => {
  const { className, children, animateIn } = props
  const [triggered, setTriggered] = React.useState<boolean>(false)
  const ref = React.createRef<HTMLDivElement>()

  React.useEffect(() => {
    const observer = new IntersectionObserver((entries, observer) => {
      if (!(ref.current)) {
        return
      }
      if (entries[0].intersectionRatio < 0.3) {
        return
      }
      setTriggered(true)
      observer.disconnect()
    }, { root: null, threshold: 0.5 })

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])
  return (
    <div ref={ref} className={`${(triggered ? `animate__animated animate__${animateIn}` : 'invisible')} ${className ?? ''}`}>
      {children}
    </div>
  )
}
