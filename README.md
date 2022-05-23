# Step 2

## Building the chat 
We are now ready to write our chat. Let's modify `ChatComponent.vue`.  
First thing first we have to create a reference for all the messages in the conversation and manage user input to send a message:
```
const messageText = ref(null);
const messages = ref([]);
const loading = ref(false);

// methods
const sendMessage = () => {
  if (!messageText.value) return;
  const text = messageText.value;
  messages.value = [
    ...messages.value,
    new Message({ text, from: "me" }),
  ];
  loading.value = true;
  setTimeout(() => {
    messages.value = [
      ...messages.value,
      new Message({ text: `You said: ${text}` }),
    ];
    loading.value = true;
  }, 1500);
  messageText.value = null;
};
```
Now we can integrate these lines of code in our template:
```
<template>
  <div class="chat">
    <template v-if="file">
      <div class="chat-messages" ref="messageList">
        <message-component
          v-for="(msg, index) in messages"
          :key="index"
          :message="msg"
        >
        </message-component>
      </div>
      <form class="chat-bottom" @submit.prevent="sendMessage">
        <input v-model="messageText" type="text" />
        <button>Send</button>
      </form>
    </template>
    <drop-area v-else v-model="file"></drop-area>
  </div>
</template>
```
## One little thing more
Right now if the conversation is quite long we have to scroll down for each new message sent or received. Let's fix it:
```
watch(messages, () => {
  nextTick(() => {
    messageList.value.scrollTop = messageList.value.scrollHeight;
  });
});
```
At every change of `messages` we scroll down after the render of the conversation.