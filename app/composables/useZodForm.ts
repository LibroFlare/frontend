import { reactive, shallowRef, watch } from 'vue'
import type { z } from 'zod'

export function useZodForm<T extends Record<string, string>>(
  schema: z.ZodType<T>,
  initialValues: T,
) {
  const values = reactive({ ...initialValues }) as T
  const errors = shallowRef<Partial<Record<keyof T, string[]>>>({})
  const touched = new Set<keyof T>()
  const isSubmitting = shallowRef(false)

  function validateField(name: keyof T) {
    touched.add(name)
    const result = schema.safeParse(values)
    errors.value = {
      ...errors.value,
      [name]: result.success
        ? []
        : result.error.issues
            .filter((issue) => issue.path[0] === name)
            .map((issue) => issue.message),
    }
  }

  watch(values, () => {
    for (const name of touched) validateField(name)
  })

  function handleSubmit(submit: (data: T) => Promise<unknown>) {
    return async () => {
      if (isSubmitting.value) return
      for (const name of Object.keys(values)) validateField(name)
      const result = schema.safeParse(values)
      if (!result.success) return

      isSubmitting.value = true
      try {
        await submit(result.data)
      } finally {
        isSubmitting.value = false
      }
    }
  }

  return { values, errors, isSubmitting, validateField, handleSubmit }
}
