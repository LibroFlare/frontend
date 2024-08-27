<template>
  <VueFrag>
    <AccountSignSwitcher sign="in" />
    <form
      class="cont-inner form flex flex-col gap-4"
      @submit.prevent="onSubmit"
    >
      <h1 class="text-2xl font-bold text-center mb-4">
        {{ t('account.signIn') }}
      </h1>
      <FormField
        v-model="email"
        v-bind="emailProps"
        type="email"
        autocomplete="email"
      >
        <span class="text-white">{{ t('account.credentials.email') }}</span>
      </FormField>
      <FormField
        v-model="password"
        v-bind="passwordProps"
        type="password"
        autocomplete="password"
      >
        <span class="text-white">{{ t('account.credentials.password') }}</span>
      </FormField>
      <button
        class="w-full py-2 bg-gray-600 hover:bg-gray-500 text-white font-bold rounded-lg transition"
      >
        {{ t('account.signIn') }}
      </button>
    </form>
  </VueFrag>
</template>

<script lang="ts" setup>
import { toTypedSchema } from '@vee-validate/yup'
import { object, string } from 'yup'

const { t } = useI18n()
useSeoMeta({ title: computed(() => t('account.signIn')) })

const { user } = toRefs(useUserStore())
const { signIn } = useUserStore()

const { handleSubmit, defineField } = useForm({
  validationSchema: toTypedSchema(
    object({
      email: string().email().required(),
      password: string().min(4).required(),
    }),
  ),
})

const [email, emailProps] = defineField('email', {
  props: (state) => ({ state }),
})
const [password, passwordProps] = defineField('password', {
  props: (state) => ({ state }),
})

const onSubmit = handleSubmit(async (values) => await signIn(values))

watchEffect(() => {
  if (user.value) navigateTo('/account')
})
</script>

<style lang="scss"></style>
