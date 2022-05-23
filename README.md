# Step 3

## Let's bring in AI
It's time to install Tensorflow.js as a dependency:
```
npm install @tensorflow/tfjs
```
Another package needed is `@tensorflow-models/qna` but since we are making an offline app we have to use a slightly different package that allow us to load the model from file system instead of downloading it from the web.

```
npm install tensorflow-qna-local-model
```

## Download the model
Our model is a pre-trained model hosted on `tfhub.dev` and can be downloaded clicking [here](https://tfhub.dev/tensorflow/tfjs-model/mobilebert/1) or visiting:
```
https://tfhub.dev/tensorflow/tfjs-model/mobilebert/1
```
Once downloaded we have to unzip it and put all the files inside `src/model` folder.
This folder is a special directory in our app that can serve static files with a custom protocol schema (`static://`).

## Loading Floppy's brain
Let's create a new file `services/qna.js` and import tensorflow.js:

```
// this is the backend recommended but you can use also @tensorflow/tfjs-backend-cpu
import "@tensorflow/tfjs-backend-webgl";
import * as qna from "tensorflow-qna-local-model";
```

We're going to initialize it at startup time
```
const modelUrl = "static://model/model.json";
const vocabUrl = "static://model/processed_vocab.json";

let model;

const init = async () => {
    model = await qna.load({ modelUrl, vocabUrl });
};

init();
```

Finally let's write a function to export:
```
const findAnswers = async (question, context) => {
    if (!model) {
        throw new Error('Model not initialized');
    }
    return model.findAnswers(question, context);
};

export { findAnswers };
```

Now we can import our service in `ChatComponent.vue`:
```
import { findAnswers } from "@/services/qna";
```

and later in `sendMessage` function:
```
// methods
const sendMessage = () => {
  if (!messageText.value) return;
  const text = messageText.value;
  messages.value = [...messages.value, new Message({ text, from: "me" })];
  loading.value = true;
  setTimeout(() => {
    findAnswers(text, file.value.content).then((answers) => {
      console.log(answers);
      const [ans] = answers;
      const msg = ans || "I don't know...";
      loading.value = false;
      messages.value = [
        ...messages.value,
        new Message({ text: msg, ...ans, from: "bot" }),
      ];
    });
  }, 0);

  messageText.value = null;
};
```