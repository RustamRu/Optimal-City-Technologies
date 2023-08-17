<script setup lang="ts">
import { onUpdated, reactive, ref, watch } from 'vue'
import ChatbotMessage from './ChatbotMessage.vue'
import UserMessage from './UserMessage.vue'
import { IUserMessage, IChatbotMessage, IUserReactions } from '../types/types'
import { userReactions, chatbotResponsesMap } from '../db/responses';
import { PerfectScrollbar } from "vue3-perfect-scrollbar";

interface IState {
  chat: (IUserMessage | IChatbotMessage)[];
  userInput: string;
  requestsQueue: IUserMessage[];
}

const state: IState = reactive({
  chat: [{
    date: Date.now(),
    author: 'chatbot',
    ...chatbotResponsesMap.initial
  }],
  userInput: '',
  requestsQueue: [],
})

const scrollbar = ref();

watch(state.requestsQueue, (requestsQueue) => {
  requestsQueue.forEach((request) => {
    state.chat.push(request);

    const reactionKey = Object.keys(userReactions).find((key) => userReactions[key] === request.text) || 'unknown';
    state.chat.push({
      date: Date.now(),
      author: 'chatbot',
      ...chatbotResponsesMap[reactionKey],
    });
  });
})

onUpdated(() => {
  scrollbar.value.ps.element.scrollTop = scrollbar.value.ps.element.scrollHeight;
})

function sendRequest(reactionKey?: keyof IUserReactions) {
  state.requestsQueue.push({
    date: Date.now(),
    author: 'user',
    text: reactionKey ? userReactions[reactionKey] : state.userInput,
  });
  state.userInput = '';
}
</script>

<template>
  <input type="checkbox" id="check">
  <label class="messages-btn" for="check">
    <i class="bi bi-chat-dots comment"></i>
    <i class="bi bi-x-lg close"></i>
  </label>

  <div class="container">
    <div class="row d-flex justify-content-center">
      <article class="card">
        <header class="card-header d-flex justify-content-between align-items-center p-3">
          <h1 class="mb-0 small">Помощник</h1>
        </header>
        <perfect-scrollbar ref="scrollbar">
          <div v-for="(message, index) in state.chat" :key="index" class="card-body">
            <ChatbotMessage v-if="message.author === 'chatbot'" :date="message.date" :text="message.text"
              :reactions="message.reactions" @sendRequest="(reactionKey) => sendRequest(reactionKey)" />
            <UserMessage v-else :date="message.date" :text="message.text" />
          </div>
        </perfect-scrollbar>
        <footer class="card-footer text-muted d-flex justify-content-start align-items-center p-3">
          <div class="input-group mb-0">
            <input v-model="state.userInput" @keyup.enter="() => sendRequest()" type="text" class="form-control"
              placeholder="Введите запрос" />
            <button @click="() => sendRequest()" class="btn btn-secondary" type="button" id="button-addon2">
              <i class="bi bi-send"></i>
            </button>
          </div>
        </footer>
      </article>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#check {
  display: none !important;

  &:checked {
    &~.messages-btn {
      i {
        display: block;
        pointer-events: auto;
        transform: rotate(180deg)
      }

      .comment {
        display: none
      }
    }

    &~.container {
      opacity: 1
    }
  }
}

.messages-btn {
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  background-color: blue;
  color: #fff;
  font-size: 22px;
  border: none;
  position: absolute;
  right: 14px;
  bottom: 30px;
  cursor: pointer;

  .close {
    display: none
  }

  i {
    font-size: 22px;
    color: #fff !important;
    transition: all 0.9s ease
  }
}

.container {
  position: absolute;
  right: 20px;
  bottom: 100px;
  width: clamp(300px, 35vw, 500px);
  background-color: antiquewhite;
  border-radius: 5px;
  /* opacity: 0; */
  transition: all 0.4s
}

.ps {
  height: 400px;
}
</style>
