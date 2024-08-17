import 'vue-i18n'
import type common from '@/assets/locales/common.json'
import type en from '@/assets/locales/en.json'

export type MessageSchema = typeof en
export type CommonMessageSchema = typeof common

declare module 'vue-i18n' {
  export interface DefineLocaleMessage
    extends MessageSchema,
      CommonMessageSchema {}
}

type NestedKeys<T> = T extends object
  ? { [K in keyof T]: K | `${K}.${NestedKeys<T[K]>}` }[keyof T]
  : never

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $t<Key extends NestedKeys<MessageSchema & CommonMessageSchema>>(
      key: Key,
    ): TranslateResult
    $tm<
      Key extends NestedKeys<MessageSchema & CommonMessageSchema>,
      Messages extends object,
      ResourceKeys extends PickupKeys<Messages> = PickupKeys<Messages>,
    >(
      key: Key | ResourceKeys,
    ): LocaleMessageValue<VueMessageType>
  }
}
