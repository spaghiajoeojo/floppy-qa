<script setup>
import { ref, watch } from "vue";
import Message from "@/classes/Message";
import MessageComponent from "@/components/MessageComponent.vue";
import DropArea from "@/components/DropArea.vue";

// DOM references
const messageList = ref(null);

// reactive
const file = ref(null);
const textInput = ref(null);
const messages = ref([]);
const loading = ref(false);

const sendMessage = () => {
  const text = textInput.value;
  if (text) {
    messages.value = [...messages.value, new Message({ text, from: "me" })];
    textInput.value = null;
    loading.value = true;
    setTimeout(() => {
      console.log("question");
      loading.value = false;
    }, 1000);
  }
};

watch(file, () => {
  messages.value = [
    new Message({
      text: `Ask me something about ${file.value.name}!`,
      from: "bot",
    }),
  ];
});

watch(messages, () => {
  if (messageList.value) {
    messageList.value.scrollTo(0, messageList.value.scrollHeight);
  }
});
</script>

<template>
  <div class="chat">
    <template v-if="file">
      <div class="chat-messages" ref="messageList">
        <message-component
          v-for="(message, index) in messages"
          :key="index"
          :message="message"
        >
        </message-component>
        <message-component
          v-if="loading"
          :message="new Message({ text: 'I\'m thinking...', from: 'bot' })"
        >
        </message-component>
      </div>
      <form class="chat-bottom" v-on:submit.prevent="sendMessage">
        <input type="text" v-model="textInput" />
        <button @click="sendMessage">Send</button>
      </form>
    </template>
    <drop-area v-else v-model="file"></drop-area>
  </div>
</template>

<style scoped>
.chat {
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.chat-messages {
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.chat-bottom {
  padding: 0.5rem;
  align-self: flex-end;
  display: flex;
  width: 100%;
  box-sizing: border-box;
}

.chat-bottom > input {
  flex-grow: 1;
}

.chat-messages::before {
  min-height: 1rem;
  display: flex;
  flex-grow: 1;
  content: "";
}
</style>