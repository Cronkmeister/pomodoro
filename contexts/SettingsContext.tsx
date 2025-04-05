'use client'

import React, { createContext, useState, useContext } from 'react'

type Font = 'sans' | 'serif' | 'mono'
type Color = '#f87070' | '#70f3f8' | '#d881f8'

interface Settings {
  pomodoro: number
  shortBreak: number
  longBreak: number
  font: Font
  color: Color
}

interface SettingsContextType {
  settings: Settings
  setSettings: React.Dispatch<React.SetStateAction<Settings>>
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

export const useSettings = () => {
  const context = useContext(SettingsContext)
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider')
  }
  return context
}

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<Settings>({
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 15,
    font: 'sans',
    color: '#f87070',
  })

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </SettingsContext.Provider>
  )
}

