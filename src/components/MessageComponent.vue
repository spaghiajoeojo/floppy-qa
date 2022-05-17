<script>
import Message from '@/models/Message';
export default {
  name: "MessageComponent",
  props: {
      message: {
          require: true,
          type: Message,
      }
  }
};
</script>

<template>
  <div class="message" :data-from="message.from">
    {{ message.text }}
  </div>
</template>

<style scoped>
.message {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  margin-bottom: 1rem;
  background-color: white;
  border-radius: 0.5rem;
}

.message::after {
  content: '';
  position: relative;
  top: 1.6rem;
  width: 0;
  height: 0;
  border: 0.75rem solid transparent;
  border-bottom: none;
  border-top-color: #fff;
}

.message[data-from=me] {
  align-self: flex-end;
  background-color: var(--my-messages-background)
}

.message:not([data-from=me]) {
  align-self: flex-start;
}

.message[data-from=me]::after {
  left: calc(100% - 1.5rem);
  border-top-color: var(--my-messages-background);
}
</style>