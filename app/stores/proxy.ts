import { defineStore } from 'pinia'

export const proxyUrl = 'https://cors-anywhere.herokuapp.com'

export const useProxyStore = defineStore(
  'proxy',
  () => {
    const isAllowed = ref<boolean>()
    const isDismissed = ref<boolean>()
    const verifyTimestamp = ref<number>(0)

    const verifyAccess = async (): Promise<boolean> => {
      try {
        const res = await $fetch('/', {
          baseURL: proxyUrl,
          headers: { 'X-Requested-With': 'XMLHttpRequest' },
        })

        isAllowed.value = res ? true : false
      } catch (error) {
        console.log(error)
        isAllowed.value = false
      }

      return isAllowed.value
    }

    return { isAllowed, isDismissed, verifyTimestamp, verifyAccess }
  },
  { persist: true },
)
