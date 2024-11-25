const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
const fetch = require('fetch');

let mainWindow;

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    title: "Personal Expense Tracker",
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // Use the preload script
      contextIsolation: true,
    },
  });

  Menu.setApplicationMenu(null);
  mainWindow.webContents.openDevTools();
  mainWindow.loadFile('index.html'); // Load the renderer (HTML file)
});


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
