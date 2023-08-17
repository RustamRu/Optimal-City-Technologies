<script setup lang="ts">
import { formatDate } from '../utils/utils';
import { userReactions } from '../db/responses';

defineProps({
  date: Number,
  text: String,
  reactions: [],
  sendRequest: Function,
})
</script>

<template>
  <article>
    <header class="d-flex justify-content-between">
      <h1 class="small mb-1 text-secondary">Помощник</h1>
      <p class="small mb-1 text-muted">{{ formatDate(date) }}</p>
    </header>
    <div class="d-flex flex-row justify-content-start">
      <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava5-bg.webp" alt="avatar 1"
        style="width: 45px; height: 100%;">
      <div>
        <p class="text-start small p-2 ms-3 mb-3 rounded-3">{{ text }}</p>
      </div>
    </div>
    <footer class="d-flex flex-column flex-lg-row gap-1">
      <button v-for="reactionKey in reactions" @click="$emit('sendRequest', reactionKey)"
        class="btn btn-outline-secondary btn-sm lh-1">
        {{ userReactions[reactionKey] }}
      </button>
    </footer>
  </article>
</template>

<style lang="scss" scoped></style>