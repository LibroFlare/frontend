import { describe, expect, test } from 'bun:test'
import { nextTick } from 'vue'
import { useZodForm } from '../app/composables/useZodForm'
import { signInSchema, signUpSchema } from '../app/utils/accountValidation'

describe('account validation', () => {
  test('requires a valid email, password and registration username', () => {
    expect(signInSchema.safeParse({ email: '', password: '' }).success).toBe(
      false,
    )
    expect(
      signInSchema.safeParse({ email: 'invalid', password: '1234' }).success,
    ).toBe(false)
    expect(
      signInSchema.safeParse({ email: 'reader@example.com', password: '123' })
        .success,
    ).toBe(false)
    expect(
      signUpSchema.safeParse({
        email: 'reader@example.com',
        password: '1234',
        username: '',
      }).success,
    ).toBe(false)
    expect(
      signUpSchema.safeParse({
        email: 'reader@example.com',
        password: '1234',
        username: 'Reader',
      }).success,
    ).toBe(true)
  })

  test('blocks invalid submission and clears field errors after correction', async () => {
    const form = useZodForm(signInSchema, { email: '', password: '' })
    let calls = 0
    const submit = form.handleSubmit(async (data) => {
      calls++
      expect(data).toEqual({ email: 'reader@example.com', password: '1234' })
    })
    await submit()
    expect(calls).toBe(0)
    expect(form.errors.value.email?.length).toBeGreaterThan(0)
    expect(form.errors.value.password?.length).toBeGreaterThan(0)
    form.values.email = 'reader@example.com'
    form.values.password = '1234'
    await nextTick()
    expect(form.errors.value.email).toEqual([])
    expect(form.errors.value.password).toEqual([])
    await submit()
    expect(calls).toBe(1)
    expect(form.isSubmitting.value).toBe(false)
  })

  test('prevents duplicate submissions and resets pending state on rejection', async () => {
    const form = useZodForm(signInSchema, {
      email: 'reader@example.com',
      password: '1234',
    })
    let reject!: (reason: Error) => void
    let calls = 0
    const submit = form.handleSubmit(() => {
      calls++
      return new Promise((_, rejectPromise) => {
        reject = rejectPromise
      })
    })
    const pending = submit()
    expect(form.isSubmitting.value).toBe(true)
    await submit()
    expect(calls).toBe(1)
    reject(new Error('Request failed'))
    await expect(pending).rejects.toThrow('Request failed')
    expect(form.isSubmitting.value).toBe(false)
  })
})
