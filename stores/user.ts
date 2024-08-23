import { defineStore } from 'pinia'
import type { Media, Themes } from '~/types'

type Role = 'ROLE_USER' | 'ROLE_ADMIN'

interface UserPreferences {
  language?: string
  theme?: Themes
  provider?: ProviderSources
}

interface UserLibrary {
  bookmarks: Media[]
  readings: Media[]
}

interface UserData {
  id: number
  username: string
  email: string
  roles: Role[]
  preferences: UserPreferences
  library: UserLibrary
}

export const useUserStore = defineStore(
  'user',
  () => {
    const baseURL = useRuntimeConfig().public.apiUrl + '/api'

    const user = ref<UserData>()
    const token = useCookie('LIBROFLARE_TOKEN', {
      maxAge: 60 * 60,
    })

    const setToken = (data?: string) => (token.value = data)
    const setUser = (data?: UserData) => (user.value = data)

    const signIn = async (credentials: { email: string; password: string }) => {
      try {
        const { data } = await useFetch<{ token: string }>('/auth/login', {
          baseURL,
          method: 'POST',
          body: credentials,
        })

        if (!data.value) throw new Error('Wrong Sign In Credentials...')

        setToken(data.value.token)
        await authMe()
      } catch (error) {
        console.error(error)
        setToken()
        setUser()
      }
    }

    const authMe = async () => {
      if (!token.value) throw new Error('Token Not Found...')

      try {
        const { data } = await useFetch<UserData>('/auth/me', {
          baseURL,
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        })

        if (!data.value) throw new Error('Unvalid Token...')

        setUser(data.value)
      } catch (error) {
        console.error(error)
        setUser()
      }
    }

    const signOut = () => {
      setToken()
      setUser()
    }

    return {
      user,
      token,
      signIn,
      signOut,
      authMe,
    }
  },
  { persist: true },
)
