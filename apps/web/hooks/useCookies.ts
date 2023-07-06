import Cookie from 'js-cookie'

type ValidCookieName = 'access_token' | 'refresh_token' | 'user_id'

export const useCookies = () => {
  const getCookie = (name: ValidCookieName) => {
    return Cookie.get(name)
  }

  const setCookie = (name: ValidCookieName, value: string) => {
    Cookie.set(name, value)
  }

  const removeCookie = (name: ValidCookieName) => {
    Cookie.remove(name)
  }

  return { getCookie, setCookie, removeCookie }
}
