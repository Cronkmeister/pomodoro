'use client'

import Pomodoro from '../components/Pomodoro'
import { SettingsProvider } from '../contexts/SettingsContext'

export default function Home() {
  return (
    <SettingsProvider>
      <main>
        <Pomodoro />
      </main>
    </SettingsProvider>
  )
}

