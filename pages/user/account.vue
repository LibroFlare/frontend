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
            class="w-full p-3 border border-gray-600 rounded-lg placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            :placeholder="t('account.username')"
          />
          <input
            v-model="user.email"
            type="email"
            class="w-full p-3 border border-gray-600 rounded-lg placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            :placeholder="t('account.email')"
          />
          <input
            v-model="data.password"
            type="password"
            class="w-full p-3 border border-gray-600 rounded-lg placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            :placeholder="t('account.password')"
          />
        </div>

        <div class="flex justify-center mt-8">
          <button
            class="font-bold py-2 px-8 rounded-full bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-gray-500 hover:bg-gray-600 transition-all"
            @click="saveChanges"
          >
            {{ t('account.saveChanges') }}
          </button>
        </div>
      </div>
    </div>

    <template v-else>
      <div class="flex justify-center gap-4 mb-6">
        <button
          :class="['tab', !isRegistering ? 'tab-active' : '']"
          @click="toggleForm(false)"
        >
          {{ t('account.signIn') }}
        </button>
        <button
          :class="['tab', isRegistering ? 'tab-active' : '']"
          @click="toggleForm(true)"
        >
          {{ t('account.register') }}
        </button>
      </div>

      <div
        v-if="!isRegistering"
        class="w-full max-w-md mx-auto p-8 rounded-lg shdw"
      >
        <form class="form flex flex-col gap-4" @submit.prevent="onSubmit">
          <h1 class="text-2xl font-bold text-center mb-4">
            {{ t('account.signIn') }}
          </h1>
          <FormField
            v-model="email"
            v-bind="emailProps"
            type="email"
            autocomplete="email"
          >
            <span class="text-white">{{ t('account.email') }}</span>
          </FormField>
          <FormField
            v-model="password"
            v-bind="passwordProps"
            type="password"
            autocomplete="password"
          >
            <span class="text-white">{{ t('account.password') }}</span>
          </FormField>
          <button
            class="w-full py-2 bg-gray-600 hover:bg-gray-500 text-white font-bold rounded-lg transition"
          >
            {{ t('account.signIn') }}
          </button>
        </form>
      </div>

      <div
        v-if="isRegistering"
        class="w-full max-w-md mx-auto p-8 rounded-lg shdw"
      >
        <form class="flex flex-col gap-4" @submit.prevent="onRegister">
          <h1 class="text-2xl font-bold text-center mb-4">
            {{ t('account.register') }}
          </h1>
          <input
            v-model="newEmail"
            type="email"
            class="w-full p-3 border border-gray-600 rounded-lg placeholder-gray-400 focus:ring-2 focus:ring-gray-500 focus:border-transparent transition"
            :placeholder="t('account.email')"
          />
          <input
            v-model="newPassword"
            type="password"
            class="w-full p-3 border border-gray-600 rounded-lg placeholder-gray-400 focus:ring-2 focus:ring-gray-500 focus:border-transparent transition"
            :placeholder="t('account.password')"
          />
          <input
            v-model="confirmPassword"
            type="password"
            class="w-full p-3 border border-gray-600 rounded-lg placeholder-gray-400 focus:ring-2 focus:ring-gray-500 focus:border-transparent transition"
            :placeholder="t('account.confirmPassword')"
          />
          <button
            class="w-full py-2 bg-gray-600 hover:bg-gray-500 text-white font-bold rounded-lg transition"
          >
            {{ t('account.register') }}
          </button>
        </form>
      </div>
    </template>

    <button
      class="mt-8 px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white font-bold rounded-lg transition"
      @click="signOut"
    >
      {{ t('account.signOut') }}
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

const isRegistering = ref(false)
const newEmail = ref('')
const newPassword = ref('')
const confirmPassword = ref('')

const toggleForm = (status: boolean) => {
  isRegistering.value = status
}

const onRegister = () =>
  console.log(
    'Register submitted:',
    newEmail.value,
    newPassword.value,
    confirmPassword.value,
  )

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

<style scoped lang="scss">
.tab {
  @apply cursor-pointer py-2 px-4 rounded-lg text-gray-600 hover:text-gray-800 transition-colors;
}

.tab-active {
  @apply bg-gray-800 text-white;
}

.shdw {
  @apply shadow-lg;
}
</style>
