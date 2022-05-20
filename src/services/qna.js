import "@tensorflow/tfjs-backend-webgl";
import * as qna from "tensorflow-qna-local-model";

const modelUrl = "static://model/model.json";
const vocabUrl = "static://model/processed_vocab.json";

let model;

const init = async () => {
    model = await qna.load({ modelUrl, vocabUrl });
};


const findAnswers = (question, context) => {
    if (!model) {
        throw new Error('Model not initialized');
    }
    return model.findAnswers(question, context);
};

init();

export { findAnswers };