const tf = require('@tensorflow/tfjs-node');
const speechtf = require('@tensorflow-models/speech-commands');

let model, words;

async function initSpeech() {

    model = speechtf.create("SOFT_FFT");
    console.log("Model Loaded")
    await model.ensureModelLoaded()
    console.log(model.wordLabels())
    
    words = model.wordLabels()

}

const recognizeActions = async () => {
    model.listen(result => {
        console.log(result.scores)
    }, {includeSPectrogram:true, probabilityThreshold:0.8});
};

function getModel() {
    return model;
}

function getWords() {
    return words;
}

module.exports = {
    initSpeech,
    recognizeActions,
    getModel,
    getWords,
};
