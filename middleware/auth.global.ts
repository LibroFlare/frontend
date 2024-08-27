export default defineNuxtRouteMiddleware(async (to) => {
  const { user } = toRefs(useUserStore())

  if (
    user.value &&
    (to.name === 'account-signup' || to.name === 'account-signin')
  ) {
    return await navigateTo('/account')
  } else if (!user.value && to.name === 'account')
    return await navigateTo('/account/signin')
})
