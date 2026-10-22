<script setup lang="ts">
defineOptions({ inheritAttrs: false })

const {
  name,
  errors = [],
  inputClass,
} = defineProps<{
  name: string
  errors?: string[]
  inputClass?: unknown
}>()
const model = defineModel<string>({ default: '' })
const attrs = useAttrs()
const inputId = computed(() => attrs.id?.toString() || name)
const errorId = computed(() => `${inputId.value}-errors`)
const emit = defineEmits<{ blur: [] }>()
</script>

<template>
  <div>
    <div class="field large">
      <input
        :id="inputId"
        v-model="model"
        v-bind="attrs"
        :name
        :placeholder="attrs.placeholder?.toString() || ''"
        :aria-invalid="errors.length ? true : undefined"
        :aria-describedby="errors.length ? errorId : undefined"
        :class="[inputClass, 'bg-primary-800']"
        @blur="emit('blur')"
      />
      <label :for="inputId">
        <slot />
      </label>
    </div>
    <ul v-if="errors.length" :id="errorId">
      <li v-for="(error, key) in errors" :key>
        <span role="alert">{{ error }}</span>
      </li>
    </ul>
  </div>
</template>
