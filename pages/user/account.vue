<template>
  <VueFrag>
    <div v-if="user" class="cont-inner flex flex-col items-center py-12">
      <div
        class="shdw w-full max-w-4xl rounded-lg p-8 bg-opacity-80 backdrop-blur-md"
      >
        <div class="flex items-center gap-6 mb-8">
          <div class="relative group cursor-pointer">
            <NuxtImg
              src="/logo.png"
              alt="Profile Image"
              class="w-24 h-24 rounded-full border-2 border-gray-400 transition-transform duration-300 group-hover:scale-105"
            />
            <div
              class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full flex items-center justify-center"
            ></div>
          </div>
          <div class="flex flex-col">
            <h1 class="text-3xl font-bold mb-2">
              {{ t('account.pageTitle') }}
            </h1>
            <p class="text-lg mb-2 border-b border-gray-600 pb-2">
              {{ t('account.username') }}:
              <span class="font-semibold">{{ user.username }}</span>
            </p>
            <p class="text-lg mb-2 border-b border-gray-600 pb-2">
              {{ t('account.email') }}:
              <span class="font-semibold">{{ user.email }}</span>
            </p>
            <p class="text-lg mb-2">
              {{ t('account.password') }}:
              <span class="font-semibold">{{ data.password }}</span>
            </p>
          </div>
        </div>

        <div class="space-y-4">
          <input
            v-model="user.username"
            type="text"
            class="w-full p-3 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            placeholder="Změnit uživatelské jméno"
          />
          <input
            v-model="user.email"
            type="email"
            class="w-full p-3 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            placeholder="Změnit email"
          />
          <input
            v-model="data.password"
            type="password"
            class="w-full p-3 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            placeholder="Změnit heslo"
          />
        </div>

        <div class="flex justify-center mt-8">
          <button
            class="font-bold py-2 px-8 text-slate-900 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            @click="saveChanges"
          >
            {{ t('account.saveChanges') }}
          </button>
        </div>
      </div>
    </div>
    <template v-else>
      <form class="w-4/5 form flex flex-col gap-4" @submit.prevent="onSubmit">
        <h1>Sign In</h1>
        <FormField
          v-model="email"
          v-bind="emailProps"
          type="email"
          autocomplete="email"
        >
          E-mail
        </FormField>
        <FormField
          v-model="password"
          v-bind="passwordProps"
          type="password"
          autocomplete="password"
        >
          Password
        </FormField>
        <button
          class="px-4 py-2 bg-gray-800 hover:bg-gray-700 transition-colors rounded-xl shdw"
        >
          Sign In
        </button>
      </form>
    </template>
    <button
      class="px-4 py-2 bg-gray-800 hover:bg-gray-700 transition-colors rounded-xl shdw"
      @click="signOut"
    >
      Sign Out
    </button>
  </VueFrag>
</template>

<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/yup'
import { object, string } from 'yup'
import type { AccountButtons } from '~/types'

const { t } = useI18n()
useSeoMeta({ title: computed(() => t('account.pageTitle')) })

const { user } = toRefs(useUserStore())
const { signIn, signOut } = useUserStore()

const data = ref<AccountButtons>({
  username: 'ahoj',
  email: 'llll@example.com',
  password: '●●●●●●●●',
})

const saveChanges = () => {
  console.log('Změny byly uloženy:', data.value)
}

// VEE VALIDATE FORM
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
</script>
