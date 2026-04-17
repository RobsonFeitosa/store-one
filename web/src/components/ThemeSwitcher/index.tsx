import { useTheme } from 'next-themes'
import { Moon, Sun } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { ButtonSwitcher } from '../styles'

export const ThemeSwitcher = () => {
  const [isDark, setDark] = useState(() => {
    return false
    // return process.env.NODE_ENV === 'development'
  })
  const { setTheme } = useTheme()

  function handleMode(darkMode: boolean) {
    setDark(darkMode)
  }

  useEffect(() => {
    setTheme(isDark ? 'dark' : 'light')
  }, [isDark, setTheme])

  return (
    <div>
      <ButtonSwitcher onClick={() => handleMode(!isDark)}>
        {isDark ? <Moon /> : <Sun />}
      </ButtonSwitcher>
    </div>
  )
}
