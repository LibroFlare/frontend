import { defineStore } from 'pinia'

export const useSearchStore = defineStore('search', () => {
  const search = ref<string>('')
  const setSearch = (val: string) => {
    search.value = val
  }

  const typing = ref<boolean>(false)
  const setTyping = (val: boolean) => {
    typing.value = val
  }

  return { search, setSearch, typing, setTyping }
})
