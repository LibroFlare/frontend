import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', () => {
  const theme = ref('light')

  const setTheme = (newTheme: string) => {
    theme.value = newTheme
    document.documentElement.setAttribute('data-theme', newTheme)
  }

  return { theme, setTheme }
})
