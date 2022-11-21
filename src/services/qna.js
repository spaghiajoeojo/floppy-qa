import * as tf from '@tensorflow/tfjs';
import * as qna from "tensorflow-qna-local-model";

tf.setBackend('webgl');

const modelUrl = "static://model/model.json";
const vocabUrl = "static://model/processed_vocab.json";

let model;

const init = async () => {
    model = await qna.load({ modelUrl, vocabUrl });
};

init();

const findAnswers = async (question, context) => {
    if (!model) {
        throw new Error('Model not initialized');
    }
    return model.findAnswers(question, context);
};

export { findAnswers };