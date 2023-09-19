import React from 'react'
import 'animate.css/animate.min.css'

export const AnimateOnceInViewport = (props: { children: React.ReactNode, animateIn: string, className?: string }) => {
  const { className, children, animateIn } = props
  const [intersected, setIntersected] = React.useState<boolean>(false)

  const [element, setElement] = React.useState<HTMLDivElement | null>(null)
  const observerRef = React.useRef<IntersectionObserver | null>(null)

  React.useEffect(() => {
    if (!element) {
      return
    }
    if (observerRef.current) {
      observerRef.current.disconnect()
    }
    const observer = new IntersectionObserver((entries, observer) => {
      if (intersected || !(element) || entries[0].intersectionRatio < 0.1) {
        return
      }
      setIntersected(true)
    }, { root: null, threshold: 0.1, rootMargin: '-50px' })

    observer.observe(element)
    observerRef.current = observer

    return () => {
      observer.disconnect()
    }
  }, [element])
  return (
    <div ref={setElement} className={`${(intersected ? `animate__animated animate__${animateIn}` : 'invisible')} ${className ?? ''}`}>
      {children}
    </div>
  )
}
