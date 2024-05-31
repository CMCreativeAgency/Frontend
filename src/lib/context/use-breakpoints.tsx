'use client'
import { createContext, useContext, useEffect, useState } from 'react'

export const BreakpointsContext = createContext({})

interface BreakpointsContextProviderProps {
  children: React.ReactNode
}

export default function BreakpointsContextProvider({ children }: BreakpointsContextProviderProps) {
  const [device, setDevice] = useState<string>()

  useEffect(() => {
    function resizeHandler() {
      if (window.innerWidth > 1024) {
        setDevice('desktop')
      } else {
        setDevice('mobile')
      }
    }

    resizeHandler()

    window.addEventListener('resize', resizeHandler)
    return () => {
      window.removeEventListener('resize', resizeHandler)
    }
  }, [])

  const context = {
    device,
  }

  return <BreakpointsContext.Provider value={context}>{children}</BreakpointsContext.Provider>
}

export const useBreakpointsContext = () => {
  return useContext(BreakpointsContext)
}
