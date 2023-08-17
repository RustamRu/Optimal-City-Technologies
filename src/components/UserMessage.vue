<script setup lang="ts">
import { formatDate } from '../utils/utils';

defineProps({
  date: Number,
  text: String,
})
</script>

<template>
  <transition appear>
    <article>
      <header class="d-flex justify-content-between flex-row-reverse">
        <h1 class="small mb-1 text-primary">Я</h1>
        <p class="small mb-1 text-muted">{{ date && formatDate(date) }}</p>
      </header>
      <div class="d-flex flex-row justify-content-end mb-4 pt-1">
        <div>
          <p class="text-start small p-2 me-3 mb-3 text-white rounded-3 bg-primary">{{ text }}</p>
        </div>
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp" alt="avatar 1"
          style="width: 45px; height: 100%;">
      </div>
    </article>
  </transition>
</template>

<style lang="scss" scoped>
</style>