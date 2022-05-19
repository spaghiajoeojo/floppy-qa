const { app, BrowserWindow, protocol, session } = require('electron');
const path = require('path');

protocol.registerSchemesAsPrivileged([
  {
    scheme: 'static', privileges: {
      standard: true,
      supportFetchAPI: true,
      bypassCSP: true,
      secure: true
    }
  }
]);

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {

  session.defaultSession.protocol.registerFileProtocol('static', (request, callback) => {
    const fileUrl = request.url.replace('static://', '');
    const filePath = path.join(app.getAppPath(), '.webpack/renderer', fileUrl);
    callback(filePath);
  });

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 400,
    height: 640,
    minWidth: 375,
    minHeight: 375,
    autoHideMenuBar: true,
    icon: './src/assets/floppy_icon.png',
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  mainWindow.webContents.on('dom-ready', () => {
    // Open the DevTools.
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  });

};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
