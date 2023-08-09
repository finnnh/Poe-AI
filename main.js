const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const ipc = ipcMain

function createWindow () {
  
  const win = new BrowserWindow({
    width: 1200,
    height: 680,
    minHeight: 580,
    minWidth: 680,

    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  

  ipc.on('speechRecognitionResult', (event, result) => {
    console.log("Test");
    console.log('Speech Recognition Result:', result);
    // Do something with the recognition result
  });

  ipc.on('startListening', () => {
    startRecognition();
  })


  win.loadFile('pages/index.html')

  ipc.on('showExtensions', () => {
    win.loadFile('pages/extensions.html')
  })

  ipc.on('showSettings', () => {
    win.loadFile('pages/settings.html')
  })

  ipc.on('showHome', () => {
    win.loadFile('pages/index.html')
  })


}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

let recognition;

function startRecognition() {
    console.log("Y");
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
}