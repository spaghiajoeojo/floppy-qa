<script setup>
import { ref } from "vue";
import Message from "@/classes/Message";
import MessageComponent from "@/components/MessageComponent.vue";
import DropArea from "@/components/DropArea.vue";

// DOM references
const messageList = ref(null);

// reactive
const file = ref(null);

</script>

<template>
  <div class="chat">
    <template v-if="file">
      <div class="chat-messages" ref="messageList">

      </div>
      <form class="chat-bottom">
        <input type="text" />
        <button type="submit">Send</button>
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