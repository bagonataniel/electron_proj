const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');
const fetch = require('fetch');

let mainWindow;

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    width: 1366,
    height: 768,
    title: "Personal Expense Tracker",
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // Use the preload script
      contextIsolation: true,
      nodeIntegration: true
    },
  });

  Menu.setApplicationMenu(null);
  mainWindow.webContents.openDevTools();
  mainWindow.loadFile('index.html'); // Load the renderer (HTML file)
});

ipcMain.on('TITLE_BAR_ACTION', (event, args) => {
  handleTitleBarActions(mainWindow, args)
});


function handleTitleBarActions(windowObj, args) {
  if (args === 'MAXIMIZE_WINDOW') {
      if (mainWindow.isMaximized() === true) {
        mainWindow.unmaximize();
      }
      else {
        mainWindow.maximize()
      }
  }
  else if (args === 'MINIMIZE_WINDOW')
    mainWindow.minimize()
  else if (args === 'CLOSE_APP')
    mainWindow.close()
}


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
