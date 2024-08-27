<template>
  <VueFrag>
    <AccountSignSwitcher sign="up" />
    <form
      class="cont-inner form flex flex-col gap-4"
      @submit.prevent="onSubmit"
    >
      <h1 class="text-2xl font-bold text-center mb-4">
        {{ t('account.signUp') }}
      </h1>
      <FormField
        v-model="username"
        v-bind="usernameProps"
        type="text"
        autocomplete="username"
      >
        <span class="text-white">{{ t('account.credentials.username') }}</span>
      </FormField>
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
        {{ t('account.signUp') }}
      </button>
    </form>
  </VueFrag>
</template>

<script lang="ts" setup>
import { toTypedSchema } from '@vee-validate/yup'
import { object, string } from 'yup'

const { t } = useI18n()
useSeoMeta({ title: computed(() => t('account.signUp')) })

const { signIn } = useUserStore()

const { handleSubmit, defineField } = useForm({
  validationSchema: toTypedSchema(
    object({
      username: string().required(),
      email: string().email().required(),
      password: string().min(4).required(),
    }),
  ),
})

const [username, usernameProps] = defineField('username', {
  props: (state) => ({ state }),
})
const [email, emailProps] = defineField('email', {
  props: (state) => ({ state }),
})
const [password, passwordProps] = defineField('password', {
  props: (state) => ({ state }),
})

const onSubmit = handleSubmit(async (values) => await signIn(values))
</script>

<style lang="scss"></style>
