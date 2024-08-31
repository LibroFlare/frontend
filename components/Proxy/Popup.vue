<template>
  <div
    v-if="!isAllwd && !isDismissed"
    class="fixed size-full grid place-items-center bg-black/20 z-[99]"
    @click="isDismissed = true"
  >
    <div class="cont">
      <div
        class="cont-inner p-4 rounded-xl flex flex-col gap-4 bg-primary-950 shdw"
        @click.stop
      >
        <h1>Proxy</h1>
        <ProxyTab show-dismiss />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { isAllowed, isDismissed } = toRefs(useProxyStore())

const isAllwd = debouncedRef(isAllowed, 2000)
</script>
