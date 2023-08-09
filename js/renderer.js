const { ipcRenderer } = require("electron");

const ipc = ipcRenderer
  
function showExtensions() {
  ipc.send('showExtensions')
}

function showSettings() {
  ipc.send('showSettings')
}

function showHome() {  
  ipc.send('showHome')
}

function startListening() {
  ipc.send("startListening")
}

document.getElementById('extensionsButton').onclick = showExtensions;
document.getElementById('homeButton').onclick = showHome;
document.getElementById('settingsButton').onclick = showSettings;


//VOICE


const startButton = document.getElementById('startListening');
startButton.addEventListener('click', () => {
  startRecognition();
});






