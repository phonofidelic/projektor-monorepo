import Cookie from 'js-cookie'

const ACCESS_TOKEN_NAME = 'access_token'
const REFRESH_TOKEN_NAME = 'refresh_token'

async function getCookie(name: string) {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { cookies } = await import('next/headers')
    const cookieStore = cookies()
    return cookieStore.get(name).value
  } else {
    return Cookie.get(name)
  }
}

async function setCookie(name: string, value: string) {
  if (process.env.NEXT_RUNTIME === 'nodejs' && !window) {
    const { cookies } = await import('next/headers')
    const cookieStore = cookies()
    cookieStore.set(name, value)
  } else {
    Cookie.set(name, value)
  }
}

export async function authFetch(
  endpointUrl: string,
  fetchConfig?: Partial<RequestInit>
) {
  const response = await fetch(endpointUrl, {
    ...fetchConfig,
    headers: {
      ...fetchConfig?.headers,
      Authorization: `Bearer ${await getCookie(ACCESS_TOKEN_NAME)}`,
    },
  })

  if (response.status === 401) {
    // Token expired, starting refresh process...
    const refreshTokenResponse = await fetch(
      `${process.env.NEXT_PUBLIC_PROJEKTOR_API_BASE_URL}/auth/refresh`,
      {
        headers: {
          Authorization: `Bearer ${await getCookie(REFRESH_TOKEN_NAME)}`,
        },
      }
    )

    if (refreshTokenResponse.status === 401) {
      // New login required
      if (process.env.NEXT_RUNTIME === 'edge') {
        Cookie.remove(ACCESS_TOKEN_NAME)
        Cookie.remove(REFRESH_TOKEN_NAME)
      }
      return refreshTokenResponse
    }

    const { accessToken, refreshToken } = await refreshTokenResponse.json()
    if (process.env.NEXT_RUNTIME === 'edge') {
      await setCookie(ACCESS_TOKEN_NAME, accessToken)
      await setCookie(REFRESH_TOKEN_NAME, refreshToken)
    }

    const freshResponse = await fetch(endpointUrl, {
      ...fetchConfig,
      headers: {
        ...fetchConfig?.headers,
        Authorization: `Bearer ${accessToken}`,
      },
    })

    return freshResponse
  } else {
    // Access token is fresh, returning response
    return response
  }
}
