<template>
  <section id="epub-reader" class="w-full h-screen flex flex-col">
    <div ref="viewer" class="w-full h-screen flex-grow shdw"></div>
    <div class="p-4 flex items-center gap-4">
      <ButtonLink href="" class="cursor-pointer" @click.prevent="prevPage"
        >Previous</ButtonLink
      >
      <ButtonLink href="" class="cursor-pointer" @click.prevent="nextPage"
        >Next</ButtonLink
      >
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { Book, Rendition } from 'epubjs'
import ePub from 'epubjs'

// archive.org epubs doesnt work
const {
  epubUrl = `https://www.gutenberg.org/ebooks/1661.epub3.images`,
  // epubUrl = `https://archive.org/download/elcrimenyelcasti00dostuoft/elcrimenyelcasti00dostuoft.epub`,
  //  epubUrl = `https://s3.amazonaws.com/moby-dick/moby-dick.epub`
} = defineProps<{ epubUrl?: string }>()

const viewer = ref<HTMLDivElement>()
const rendition = ref<Rendition>()
const book = ref<Book>()

onMounted(async () => {
  const res = await useFetch(`/${epubUrl}`, {
    lazy: true,
    responseType: 'arrayBuffer',
    // temp cors solution
    baseURL: 'https://cors-anywhere.herokuapp.com',
    headers: { 'X-Requested-With': 'https://cors-anywhere.herokuapp.com' },
  })
  await res.execute()

  if (viewer.value && res.data.value) {
    book.value = ePub(res.data.value)
    rendition.value = book.value.renderTo(viewer.value, {
      width: '100%',
      height: '100%',
      spread: 'always',
    })
    rendition.value.display()
  }
})

const nextPage = () => {
  if (!rendition.value) return

  rendition.value.next()
}

const prevPage = () => {
  if (!rendition.value) return

  rendition.value.prev()
}
</script>

<style lang="scss" scoped></style>
