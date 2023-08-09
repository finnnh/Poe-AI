const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('webkitSpeechRecognition', window.webkitSpeechRecognition);

window.addEventListener('DOMContentLoaded', () => {
    window.recognition = new webkitSpeechRecognition();

    const replaceText = (selector, text) => {
      const element = document.getElementById(selector)
      if (element) element.innerText = text
    }
  
    for (const type of ['chrome', 'node', 'electron']) {
      replaceText(`${type}-version`, process.versions[type])
    }
  })