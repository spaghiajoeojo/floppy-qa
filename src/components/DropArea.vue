<script setup>
import TextualFile from "@/classes/TextualFile";
import { ref, watch } from "vue";

const fileReader = new FileReader();

// DOM references
const inputSelector = ref(null);

// reactive
const file = ref(null);

const emit = defineEmits(["update:modelValue"]);

watch(file, () => {
  emit(
    "update:modelValue",
    new TextualFile({ name: file.value.name, content: fileReader.result })
  );
});

const selectFile = () => {
  inputSelector.value.click();
};

const onDrop = (files) => {
  console.log("File(s) dropped");

  if (files.length !== 1) return;
  const [single] = Array.from(files);
  file.value = single;
};
</script>

<template>
  <div class="drop-area">
    <dialog
      open
      @drop.prevent="onDrop($event.dataTransfer.files)"
      @dragenter.prevent
      @dragover.prevent
    >
      <p>Please drop a .txt file here</p>
      <br />
      <p>- or -</p>
      <br />
      <button @click="selectFile">Select a file</button>
      <input
        v-show="false"
        @change="onDrop($event.target.files)"
        type="file"
        ref="inputSelector"
      />
    </dialog>
  </div>
</template>

<style scoped>
.drop-area {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}
dialog {
  box-sizing: border-box;
  margin: 1rem;
  width: calc(100% - 2rem);
  height: calc(100% - 2rem);
  border: 6px dashed white;
  border-radius: 1rem;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  padding: 2rem;
}

dialog::after,
dialog::before {
  content: "";
  flex-grow: 1;
}

dialog > p {
  margin: auto;
}
</style>