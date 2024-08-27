import { defineStore } from 'pinia'
import type { Themes } from '~/types'

export const usePreferencesStore = defineStore(
  'preferences',
  () => {
    const { user } = toRefs(useUserStore())
    const i18n = useI18n()
    const colorMode = useColorMode()

    const language = ref<string | undefined>()
    const theme = ref<Themes | undefined>()
    const provider = ref<Providers | undefined>()

    const setLanguage = (value?: string) => {
      language.value = value

      if (!language.value) return

      i18n.setLocale(language.value)
    }

    const setTheme = (value?: Themes) => {
      theme.value = value

      if (!theme.value) return

      colorMode.preference = theme.value
    }

    const setProvider = (value?: Providers) => {
      provider.value = value
    }

    // set all prefs on init
    setLanguage(user.value?.preferences.language || i18n.locale.value)
    setTheme(user.value?.preferences.theme || (colorMode.preference as Themes))
    setProvider(user.value?.preferences.provider || Providers.OPENLIBRARY)

    // watch prefs and update them on user if possible
    watchEffect(() => {
      if (!user.value) return

      user.value.preferences = {
        language: language.value,
        provider: provider.value,
        theme: theme.value,
      }
    })

    return {
      language,
      theme,
      provider,
      setLanguage,
      setTheme,
      setProvider,
    }
  },
  { persist: true },
)
