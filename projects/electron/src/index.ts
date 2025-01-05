import { app, autoUpdater, BrowserWindow, dialog, FeedURLOptions, ipcMain, MessageBoxOptions } from "electron";
import path from 'path';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

if (app.isPackaged) {
  const server = 'https://update.electronjs.org'
  const feed = {
    url: `${server}/edplanes/yoke/${process.arch}/${app.getVersion()}`
  }

  autoUpdater.setFeedURL(feed)

  autoUpdater.checkForUpdates()

  autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
   const dialogOpts: MessageBoxOptions = {
      type: 'info',
      buttons: ['Restart', 'Later'],
      title: 'Application Update',
      message: process.platform === 'win32' ? releaseNotes : releaseName,
      detail: 'A new version has been downloaded. Restart the application to apply the updates.'
   }

   dialog.showMessageBox(dialogOpts).then((returnValue) => {
      if (returnValue.response === 0) autoUpdater.quitAndInstall()
    })
  })
}


let mainWindow: BrowserWindow | null;

const createWindow = (): void => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });



  const startURL = app.isPackaged ? `file://${path.join(__dirname, 'yoke', 'index.html')}` : `http://localhost:4200`;

  mainWindow.loadURL(startURL);

};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  createWindow();

});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
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

ipcMain.on('minimize', () => {
  mainWindow?.minimize();
});

ipcMain.on('maximize', () => {
  mainWindow?.maximize();
});

ipcMain.on('close', () => {
  mainWindow?.close();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
