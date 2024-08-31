<template>
  <div class="flex flex-col gap-4">
    <p>
      Status:
      <span
        :class="
          isAllowed === true
            ? 'text-green-600'
            : isAllowed === false
              ? 'text-red-600'
              : 'text-gray-400'
        "
      >
        {{
          isAllowed === true
            ? 'Allowed'
            : isAllowed === false
              ? 'Restricted'
              : 'Unknown'
        }}
      </span>
    </p>
    <p v-if="!isAllowed">
      To enhance your LibroFlare experience, get more media faster, etc., then
      you should require proxy access
      <ul class="mt-2">
        <li>1. Verify Proxy Access</li>
        <li>2. If your Proxy Access is Restricted new box will appear</li>
        <li>3. Click on Require Proxy Access</li>
        <li>4. Verify Proxy Access again</li>
      </ul>
    </p>
    <p v-if="verifyTimestamp > 0">Successfully verified!</p>
    <div class="grid grid-cols-2 items-center gap-4">
      <ButtonLink href="#" class="justify-center" @click.prevent="handleVerify">
        Verify Proxy Access
      </ButtonLink>
      <ButtonLink v-if="showDismiss" href="#" type="shadow" class="justify-center" @click.prevent="dismiss">
        Dismiss
      </ButtonLink>
    </div>
    <iframe v-if="requestIframe" :src="ifrProxyUrl" />
  </div>
</template>

<script lang="ts" setup>
const { showDismiss = false } = defineProps<{showDismiss?: boolean}>()

const ifrProxyUrl = proxyUrl
const { isAllowed, isDismissed, verifyTimestamp } = toRefs(useProxyStore())
const { verifyAccess } = useProxyStore()

const requestIframe = ref<boolean>(false)

const handleVerify = async () => {
  const status = await verifyAccess()
  if (status === false) requestIframe.value = true
  else {
    requestIframe.value = false
    verifyTimestamp.value = Date.now()
  }
}

const dismiss = () => isDismissed.value = true

onMounted(() => setInterval(() => {
  if (Date.now() < verifyTimestamp.value + 600 * 3) return

  verifyTimestamp.value = 0
},1000))
</script>
