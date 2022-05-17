<script>
import Message from '@/models/Message';
import MessageComponent from '@/components/MessageComponent.vue';
export default {
  components: { MessageComponent },
  name: "ChatComponent",
  data() {
    return {
      text: null,
      messages: [new Message({ text: "Send me something...", from: "bot" })],
    };
  },
  watch: {
    messages() {
      this.$nextTick(() => {
        const element = this.$refs.messages;
        element.scrollTo(0, element.scrollHeight);
      });
    }
  },
  methods: {
    sendMessage() {
      const text = this.text;
      if (text) {
        this.messages = [...this.messages, new Message({ text, from: "me" })];
        this.text = null;
        setTimeout(() => {
          this.messages = [...this.messages, new Message({ text, from: "bot" })];
        }, Math.random() * 2000);
      }
    },
  },
};
</script>

<template>
  <div class="chat">
    <div class="chat-messages" ref="messages">
      <message-component
        v-for="(message, index) in messages"
        :key="index"
        :message="message"
      >
      </message-component>
    </div>

    <form class="chat-bottom" v-on:submit.prevent="sendMessage">
      <input type="text" v-model="text"/>
      <button @click="sendMessage">Send</button>
    </form>
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
  content: '';
}

</style>