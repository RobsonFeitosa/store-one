import React, { ReactNode, createContext, useContext, useState } from 'react'

interface SettingsContextData {
  currentAside: string
  isMinimizeAside: boolean
  isTopContent: boolean
  setCurrentAside: (item: string) => void
  setTopContent: (isTop: boolean) => void
  setMinimizeAside: () => void
}

const SettingsContext = createContext<SettingsContextData>(
  {} as SettingsContextData,
)

const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentAside, setCurrentCollapseAside] = useState('')
  const [isMinimizeAside, setIsMinimizeCollapseAside] = useState(false)
  const [isTopContent, setIsTopContent] = useState(false)

  function setCurrentAside(item: string) {
    setCurrentCollapseAside(item)
  }

  function setTopContent(scroll: boolean) {
    setIsTopContent(scroll)
  }

  function setMinimizeAside() {
    setIsMinimizeCollapseAside(!isMinimizeAside)
    setCurrentCollapseAside('')
  }

  // useEffect(() => {
  //   if (isMinimizeAside) {
  //     setCurrentCollapseAside('')
  //   }
  // }, [isMinimizeAside])

  return (
    <SettingsContext.Provider
      value={{
        currentAside,
        isMinimizeAside,
        isTopContent,
        setCurrentAside,
        setTopContent,
        setMinimizeAside,
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}

function useSettings(): SettingsContextData {
  const context = useContext(SettingsContext)

  if (!context) {
    throw new Error('use settings must be used within a SettingsProvider')
  }

  return context
}

export { SettingsProvider, useSettings }
