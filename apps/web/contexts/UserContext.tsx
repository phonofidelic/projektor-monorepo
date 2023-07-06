'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { useCookies } from '@/hooks/useCookies'
import { authFetch } from '@/utils'
import { User } from '@projektor/types'

type UserContextValue = {
  isAuthenticated: boolean
  logout(): void
  login(submitFormEvent: React.FormEvent<HTMLFormElement>): Promise<void>
  getNewToken(): void
  getUser(userId: string): Promise<any>
}

const UserContext = createContext<UserContextValue | null>(null)

type UserProviderProps = {
  accessToken: string
  refreshToken: string
  children: React.ReactNode
}

export const UserProvider = ({
  accessToken,
  refreshToken,
  children,
}: UserProviderProps) => {
  const { setCookie, removeCookie, getCookie } = useCookies()

  const isAuthenticated =
    (accessToken ?? getCookie('access_token')) !== undefined &&
    (refreshToken ?? getCookie('refresh_token')) !== undefined

  const logout = () => {
    removeCookie('access_token')
    removeCookie('refresh_token')
    removeCookie('user_id')
  }

  const login = async (submitFormEvent: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(submitFormEvent.currentTarget)
    const formJson = Object.fromEntries(formData.entries())
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_PROJEKTOR_API_BASE_URL}/auth/login`,
      {
        method: 'POST',
        body: JSON.stringify(formJson),
        headers: {
          'Content-type': 'application/json',
        },
      }
    )
    const { accessToken, refreshToken, userId } = await response.json()

    setCookie('access_token', accessToken)
    setCookie('refresh_token', refreshToken)
    setCookie('user_id', userId)
  }

  const getNewToken = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_PROJEKTOR_API_BASE_URL}/auth/refresh`,
      {
        headers: {
          Authorization: `Bearer ${getCookie('refresh_token')}`,
        },
      }
    )

    const { accessToken, refreshToken, statusCode } = await response.json()

    if (statusCode === 401) {
      logout()
    } else {
      setCookie('access_token', accessToken)
      setCookie('refresh_token', refreshToken)
    }
  }

  const getUser = async (userId: string) => {
    const response = await authFetch(
      `${process.env.NEXT_PUBLIC_PROJEKTOR_API_BASE_URL}/user/${userId}`
    )
    return await response.json()
  }

  const value = { isAuthenticated, logout, login, getNewToken, getUser }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export const useUser = () => {
  const userContext = useContext(UserContext)
  const [user, setUser] = useState<User | null>(null)
  const { getCookie } = useCookies()

  if (!userContext) {
    throw new Error('`useUser` must be used within a `UserProvider`')
  }

  useEffect(() => {
    const userId = getCookie('user_id')
    userContext
      .getUser(userId)
      .then((user) => {
        if (user.statusCode === 401) {
          userContext.getNewToken()
        }
        setUser(user)
      })
      .catch((error) => {
        console.error('Could not get user:', error)
      })
  }, [])

  return { ...userContext, user }
}
