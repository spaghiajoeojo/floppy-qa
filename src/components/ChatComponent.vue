<script>
import Message from "@/classes/Message";
import MessageComponent from "@/components/MessageComponent.vue";
import DropArea from "@/components/DropArea.vue";

import qnaService from '@/services/qna';

export default {
  components: { MessageComponent, DropArea },
  name: "ChatComponent",
  data() {
    return {
      file: null,
      textInput: null,
      messages: [],
      loading: false,
    };
  },
  computed: {
    chatMessages() {
      return this.loading
        ? [
            ...this.messages,
            new Message({ text: "I'm thinking...", from: "bot" }),
          ]
        : this.messages;
    },
  },
  watch: {
    messages() {
      this.$nextTick(() => {
        const element = this.$refs.messages;
        element.scrollTo(0, element.scrollHeight);
      });
    },
    file() {
      this.messages = [
        new Message({
          text: `Ask me something about ${this.file.name}!`,
          from: "bot",
        }),
      ];
    },
  },
  methods: {
    async sendMessage() {
      const text = this.textInput;
      if (text) {
        this.messages = [...this.messages, new Message({ text, from: "me" })];
        this.textInput = null;
        this.loading = true;
        setTimeout(() => {
          qnaService.findAnswers(text, this.file.content).then((answers) => {
            console.log(answers);
            const [ans] = answers;
            const msg = ans || "I don't know...";
            this.loading = false;
            this.messages = [
              ...this.messages,
              new Message({ text: msg, ...ans, from: "bot" }),
            ];
          });
        }, 0);
      }
    },
  },
};
</script>

<template>
  <div class="chat">
    <template v-if="file">
      <div class="chat-messages" ref="messages">
        <message-component
          v-for="(message, index) in chatMessages"
          :key="index"
          :message="message"
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