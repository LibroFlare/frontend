<script setup lang="ts">
const { t } = useI18n()
useSeoMeta({ title: computed(() => t('account.signUp')) })

const { signIn } = useUserStore()
const { values, errors, isSubmitting, validateField, handleSubmit } =
  useZodForm(signUpSchema, { username: '', email: '', password: '' })

const onSubmit = handleSubmit(signIn)
</script>

<template>
  <VueFrag>
    <AccountSignSwitcher sign="up" />
    <form
      class="cont-inner form flex flex-col gap-4"
      novalidate
      @submit.prevent="onSubmit"
    >
      <h1 class="text-2xl font-bold text-center mb-4">
        {{ t('account.signUp') }}
      </h1>
      <FormField
        v-model="values.username"
        name="username"
        :errors="errors.username"
        required
        type="text"
        autocomplete="username"
        @blur="validateField('username')"
      >
        <span class="text-white">{{ t('account.credentials.username') }}</span>
      </FormField>
      <FormField
        v-model="values.email"
        name="email"
        :errors="errors.email"
        required
        type="email"
        autocomplete="email"
        @blur="validateField('email')"
      >
        <span class="text-white">{{ t('account.credentials.email') }}</span>
      </FormField>
      <FormField
        v-model="values.password"
        name="password"
        :errors="errors.password"
        required
        type="password"
        autocomplete="password"
        @blur="validateField('password')"
      >
        <span class="text-white">{{ t('account.credentials.password') }}</span>
      </FormField>
      <button
        type="submit"
        :disabled="isSubmitting"
        class="w-full py-2 bg-gray-600 hover:bg-gray-500 text-white font-bold rounded-lg transition"
      >
        {{ t('account.signUp') }}
      </button>
    </form>
  </VueFrag>
</template>
