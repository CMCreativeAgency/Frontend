'use client'
import Loader from '@/components/ui/loader'
import { createContext, useContext, useState } from 'react'

export const LoaderContext = createContext({})

interface LoaderContextProps {
  children: React.ReactNode
}

export default function LoaderContextProvider({ children }: LoaderContextProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  const context = {
    isLoaded,
  }

  return (
    <LoaderContext.Provider value={context}>
      {!isLoaded && <Loader setState={setIsLoaded} />}
      {children}
    </LoaderContext.Provider>
  )
}

export const useLoaderContext = () => {
  return useContext(LoaderContext)
}
