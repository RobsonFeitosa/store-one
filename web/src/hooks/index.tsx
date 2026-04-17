import React, { ReactNode } from 'react'

import { GoogleOAuthProvider } from '@react-oauth/google'

import 'keen-slider/keen-slider.min.css'

import { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import { AuthProvider } from './providers/auth'
import { OrderProvider } from './providers/order'
import { ToastProvider } from './providers/toast'
import { WishesProvider } from './providers/wishes'
import { SettingsProvider } from './providers/settings'

const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <GoogleOAuthProvider
      clientId={process.env.NEXT_PUBLIC_GOOGLE_CLOUD_ID_CLIENT || ''}
    >
      <AuthProvider>
        <ToastProvider>
          <SkeletonTheme baseColor="#f1f1f6" highlightColor="white">
            <OrderProvider>
              <WishesProvider>
                <SettingsProvider>{children}</SettingsProvider>
              </WishesProvider>
            </OrderProvider>
          </SkeletonTheme>
        </ToastProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  )
}

export default AppProvider
