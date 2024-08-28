<template>
  <div>
    <div class="field large">
      <input
        :id="attrs.id?.toString() || state.path"
        v-model="inputValue"
        v-bind="attrs"
        :name="attrs.name?.toString() || state.path"
        :placeholder="attrs.placeholder?.toString() || ''"
        :required="state.required"
        @blur="emit('blur')"
      />
      <label :for="attrs.id?.toString() || state.path">
        <slot />
      </label>
    </div>
    <ul>
      <li v-for="(error, key) in state.errors" :key>
        <span role="alert">{{ error }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
interface FieldState {
  dirty: boolean
  errors: string[]
  initialValue?: string
  path: string
  pending: boolean
  required: boolean
  touched: boolean
  valid: boolean
  validated: boolean
  value?: string
}

const { state, modelValue } = defineProps<{
  state: FieldState
  modelValue?: string
}>()

const attrs = useAttrs()

const emit = defineEmits(['update:modelValue', 'blur'])

const inputValue = computed({
  get: () => modelValue,
  set: (value?: string) => emit('update:modelValue', value),
})
</script>
