// wkSpeech.js
const { ipcRenderer } = require('electron');

let recognition;

const startRecognition = () => {
    console.log('YAY');
  recognition = new webkitSpeechRecognition();
  recognition.lang = 'en-US';
  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.addEventListener('result', event => {
    const transcript = event.results[0][0].transcript;
    ipcRenderer.send('speechRecognitionResult', transcript);
  });

  recognition.addEventListener('error', event => {
    console.error('Recognition Error:', event.error);
  });

  recognition.addEventListener('end', () => {
    console.log('Recognition ended');
  });

  recognition.start();
};

module.exports = {
  startRecognition,
};
