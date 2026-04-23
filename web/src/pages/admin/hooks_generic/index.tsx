import React, { ReactNode } from 'react'

import { GoogleOAuthProvider } from '@react-oauth/google'

import { AuthProvider } from './providers/auth'
import { SettingsProvider } from './providers/settings'
import { ToastProvider } from './providers/toast'

const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <GoogleOAuthProvider
      clientId={process.env.NEXT_PUBLIC_GOOGLE_CLOUD_ID_CLIENT || ''}
    >
      <AuthProvider>
        <ToastProvider>
          <SettingsProvider>{children}</SettingsProvider>
        </ToastProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  )
}

export default AppProvider
